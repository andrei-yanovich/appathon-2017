function getNuki(cb) {
    new Request({
        url: 'http://the-thing.appathon.tv/nuki/list',
        headers: {
           'Content-Type': 'application/json'
        },
        onComplete: function(request) {
            var locker = JSON.parse(request.response)[0];

            cb(locker.nukiId);
        }
     }).send();
}

function lock(nukiId, cb) {
    new Request({
        url: 'http://the-thing.appathon.tv/nuki/lockAction?nukiId=' + nukiId + '&action=2',
        headers: {
           'Content-Type': 'application/json'
        },
        onComplete: function(request) {
            cb();
        }
     }).send();
}

function unlock(nukiId, cb) {
    new Request({
        url: 'http://the-thing.appathon.tv/nuki/lockAction?nukiId=' + nukiId + '&action=1',
        headers: {
           'Content-Type': 'application/json'
        },
        onComplete: function(request) {
            cb();
        }
     }).send();
}

var nuki = {
    lock: function(cb) {
        getNuki(function (nukiId) {
            lock(nukiId, cb);
        });
    },
    unlock: function(cb) {
        getNuki(function (nukiId) {
            unlock(nukiId, cb);
        });
    }
};