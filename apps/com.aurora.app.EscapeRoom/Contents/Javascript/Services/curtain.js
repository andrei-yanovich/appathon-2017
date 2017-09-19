var curtain = {
    open: function (cb) {
        new Request({
            url: 'http://the-thing.appathon.tv/vera-bridge/port_3480/data_request?id=lu_action&action=SetLoadLevelTarget&newLoadlevelTarget=100&serviceId=urn:upnp-org:serviceId:Dimming1&DeviceNum=13',
            headers: {
               'Content-Type': 'application/json'
            },
            onComplete: function(request) {
                cb();
            }
         }).send();
    },
    close: function (cb) {
        new Request({
            url: 'http://the-thing.appathon.tv/vera-bridge/port_3480/data_request?id=lu_action&action=SetLoadLevelTarget&newLoadlevelTarget=0&serviceId=urn:upnp-org:serviceId:Dimming1&DeviceNum=13',
            headers: {
               'Content-Type': 'application/json'
            },
            onComplete: function(request) {
                cb();
            }
         }).send();
    }
};