function getLigths(cb) {
    new Request({
        url: 'http://the-thing.appathon.tv/philips-hue/api/59MSn7uqdUFj96Gb0r7fevecVH9A5IRSbEonz7va/lights',
        headers: {
           'Content-Type': 'application/json'
        },
        onComplete: function(request) {
            var lights = [];

            Object.keys(JSON.parse(request.response))
                .forEach(function (id) {
                    lights.push(id);
                });

            cb(lights);
        }
     }).send();
}

function setDim(lights, cb) {
    var done = 0;
debugger;
    lights.forEach(function (ligthId) {
        new Request({
            url: 'http://the-thing.appathon.tv/philips-hue/api/59MSn7uqdUFj96Gb0r7fevecVH9A5IRSbEonz7va/lights/' + ligthId +'/state',
            method: 'PUT',
            headers: {
               'Content-Type': 'application/json'
            },
            data: {
                on: true,
                transitiontime: 1000,
                xy: [0.125, 0.155]
            },
            onComplete: function () {
                done++;

                if (done === lights.length) {
                    cb();
                }
            }
         }).send();
    });
}

var hue = {
    startDim: function(cb) {
        getLigths(function (lights) {
            setDim(lights, cb);
        });
    }
};