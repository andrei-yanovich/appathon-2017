function getCurrentWeight(cb) {
    new Request({
        url: 'https://api.health.nokia.com/measure?action=getmeas&meastype=1',
        headers: {
           'Content-Type': 'application/json'
        },
        onComplete: function(request) {
            var measuregrps = JSON.parse(request.response).body.measuregrps;

            measuregrps.sort(function (a, b) {
                return a.date - b.date;
            });

            var measures = measuregrps[measuregrps.length - 1].measures;
            measures = measures.filter(function (measure) {
                return measure.type === 1;
            });

            cb(measures[measures.length - 1].value);
        }
     }).send();
}

var nokia = {
    waitForWeight: function (targetWeight, cb) {
        function waitFor() {
            getCurrentWeight(function (currentWeight) {
                if (currentWeight > targetWeight) {
                    cb();
                } else {
                    setTimeout(function () {
                        waitFor();
                    }, 2000);
                }
            });
        }

        // waitFor();
    }
};