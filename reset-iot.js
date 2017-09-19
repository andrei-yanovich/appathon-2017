const http = require('http');
const url = require('url');

function getHue(cb) {
    const parsedUrl = url.parse('http://the-thing.appathon.tv/philips-hue/api/59MSn7uqdUFj96Gb0r7fevecVH9A5IRSbEonz7va/lights');

    http.request(Object.assign({
        headers: {
            'Content-Type': 'application/json',
        }
    }, parsedUrl), (response) => {
        let res = '';

        response.on('data', (chunk) => {
            res += chunk;
        });

        response.on('end', () => {
            var lights = [];

            Object.keys(JSON.parse(res))
                .forEach(function (id) {
                    lights.push(id);
                });

            cb(lights);
        });
    }).end();
}

function setNormalHue(hues, cb) {
    hues.forEach((hue) => {
        const parsedUrl = url.parse('http://the-thing.appathon.tv/philips-hue/api/59MSn7uqdUFj96Gb0r7fevecVH9A5IRSbEonz7va/lights/' + hue +'/state');
        const body = JSON.stringify({
            on: true,
            transitiontime: 1,
            xy: [0.525, 0.555]
        });

        http.request(Object.assign({
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'PUT',
        }, parsedUrl), (response) => {
            let done = 0;

            response.on('data', () => {});

            response.on('end', () => {
                console.log(`Hue ${hue} reset`);
                done++;

                if (done === hues.length) {
                    cb();
                }
            });
        }).end(body);
    });
}

function resetHue(cb) {
    getHue(function (hues) {
        setNormalHue(hues, cb);
    });
}

function getNuki(cb) {
    const parsedUrl = url.parse('http://the-thing.appathon.tv/nuki/list');

    http.request(Object.assign({
        headers: {
            'Content-Type': 'application/json',
        }
    }, parsedUrl), (response) => {
        let res = '';

        response.on('data', (chunk) => {
            res += chunk;
        });

        response.on('end', () => {
            debugger;
            cb(JSON.parse(res)[0].nukiId);
        });
    }).end();
}

function lockNuki(nukiId, cb) {
    const parsedUrl = url.parse('http://the-thing.appathon.tv/nuki/lockAction?nukiId=' + nukiId + '&action=2');

    http.request(Object.assign({
        headers: {
            'Content-Type': 'application/json',
        }
    }, parsedUrl), (response) => {
        response.on('data', () => { });

        response.on('end', () => {
            cb();
        });
    }).end();
}

function resetNuki(cb) {
    getNuki((nukiId) => {
        lockNuki(nukiId, cb);
    });
}

function getNest(cb) {
    const parsedUrl = url.parse('http://the-thing.appathon.tv/nest/devices');

    http.request(Object.assign({
        headers: {
            'Content-Type': 'application/json',
        }
    }, parsedUrl), (response) => {
        let res = '';

        response.on('data', (chunk) => {
            res += chunk;
        });

        response.on('end', () => {
            cb(Object.keys(JSON.parse(res).thermostats)[0]);
        });
    }).end();
}

function setNormaltemp(nestId, cb) {
    const parsedUrl = url.parse('http://the-thing.appathon.tv/nest/devices/thermostats/' + nestId);
    const body = JSON.stringify({
        'target_temperature_c': 23
    });

    http.request(Object.assign({
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'PUT',
    }, parsedUrl), (response) => {
        response.on('data', () => {});

        response.on('end', () => {
             cb();
        });
    }).end(body);
}

function resetNest(cb) {
    getNest((nestId) => {
        setNormaltemp(nestId, cb);
    });
}

function openCurtain(cb) {
    const parsedUrl = url.parse('http://the-thing.appathon.tv/vera-bridge/port_3480/data_request?id=lu_action&action=SetLoadLevelTarget&newLoadlevelTarget=100&serviceId=urn:upnp-org:serviceId:Dimming1&DeviceNum=13');

    http.request(Object.assign({
        headers: {
            'Content-Type': 'application/json',
        }
    }, parsedUrl), (response) => {
        let res = '';

        response.on('data', (chunk) => {
            res += chunk;
        });

        response.on('end', () => {
            cb();
        });
    }).end();
}

function resetCurtain(cb) {
    openCurtain(cb);
}

function getDyson(cb) {
    const parsedUrl = url.parse('http://the-thing.appathon.tv/dyson-pure-hot-cool/dyson/devices');

    http.request(Object.assign({
        headers: {
            'Content-Type': 'application/json',
        }
    }, parsedUrl), (response) => {
        let res = '';

        response.on('data', (chunk) => {
            res += chunk;
        });

        response.on('end', () => {
            cb(JSON.parse(res).entries[0].serial);
        });
    }).end();
}

function calmDownDyson(dysonId, cb) {
    const parsedUrl = url.parse('http://the-thing.appathon.tv/dyson-pure-hot-cool/dyson/devices/' + dysonId +'/state');
    const body = JSON.stringify({
        oscillation: 'Oscillation.OSCILLATION_OFF',
        fan_speed: 'FanSpeed.FAN_SPEED_1',
        heat_target: 'HeatTarget.celsius(20)',
        heat_mode: 'HeatMode.HEAT_OFF'
    });

    http.request(Object.assign({
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'PUT',
    }, parsedUrl), (response) => {
        response.on('data', () => {});

        response.on('end', () => {
             cb();
        });
    }).end(body);
}

function resetDyson(cb) {
    getDyson((dysonId) => {
        calmDownDyson(dysonId, cb);
    });
}

setTimeout(() => {
    console.log('Time out');
}, 10000);

resetHue(() => { console.log('Hue reset done'); });
resetNuki(() => { console.log('Nuki reset done'); });
resetNest(() => { console.log('Nest reset done'); });
resetCurtain(() => { console.log('Curtain reset done'); });
resetDyson(() => { console.log('Dyson reset done'); });