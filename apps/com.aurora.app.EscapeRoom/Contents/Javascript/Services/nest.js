function getNest(cb) {
    new Request({
        url: 'http://the-thing.appathon.tv/nest/devices',
        headers: {
           'Content-Type': 'application/json'
        },
        onComplete: function(request) {
            var nestId = Object.keys(JSON.parse(request.response).thermostats)[0];

            cb(nestId);
        }
     }).send();
}

function setNestParam(nestId, key, value, cb) {
    var body = {};

    body[key] = value;

    new Request({
        url: 'http://the-thing.appathon.tv/nest/devices/thermostats/' + nestId,
        method: 'PUT',
        headers: {
           'Content-Type': 'application/json'
        },
        data: body,
        onComplete: function () {
            cb();
        }
     }).send();
}

var setTempTimerId = null;

var nest = {
    setTemp: function (temp, cb) {
        getNest(function (nestId) {
            setNestParam(nestId, 'target_temperature_c', temp, cb);
        });
    },
    startSetTemp: function () {
        clearTimeout(setTempTimerId);

        var temp = 25;
        var stepsCounter = 15;


        getNest(function (nestId) {
            function setTempStep() {
                setTempTimerId = setTimeout(function () {
                    console.log('Nest set to', temp);
                    setNestParam(nestId, 'target_temperature_c', temp, function() {
                        stepsCounter--;
                        temp--;
                        if (stepsCounter > 0 && temp > 9) {
                            setTempStep();
                        }
                    });
                }, 15000);
            }

            setTempStep();
        });
    }
};