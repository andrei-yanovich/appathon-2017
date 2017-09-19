function getNest(cb) {
    new Request({
        url: 'http://the-thing.appathon.tv/nest/devices',
        headers: {
           'Content-Type': 'application/json'
        },
        onComplete: function(request) {
            debugger;
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

var nest = {
    setTemp: function (temp, cb) {
        getNest(function (nestId) {
            setNestParam(nestId, 'target_temperature_c', temp, cb);
        });
    }
};