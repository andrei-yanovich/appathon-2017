function getDyson(cb) {
    new Request({
        url: 'http://the-thing.appathon.tv/dyson-pure-hot-cool/dyson/devices',
        headers: {
           'Content-Type': 'application/json'
        },
        onComplete: function(request) {
            var dysonId = JSON.parse(request.response).entries[0].serial;

            cb(dysonId);
        }
     }).send();
}

function cool(dysonId, cb) {
    new Request({
        url: 'http://the-thing.appathon.tv/dyson-pure-hot-cool/dyson/devices/' + dysonId +'/state',
        method: 'PUT',
        headers: {
           'Content-Type': 'application/json'
        },
        data: {
            oscillation: 'Oscillation.OSCILLATION_ON',
            fan_speed: 'FanSpeed.FAN_SPEED_10',
            heat_target: 'HeatTarget.celsius(10)',
            heat_mode: 'HeatMode.HEAT_OFF'
        },
        onComplete: function () {
            cb();
        }
     }).send();
}

var dyson = {
    coolDown: function (cb) {
        getDyson(function(dysonId) {
            cool(dysonId, cb);
        });
    }
};