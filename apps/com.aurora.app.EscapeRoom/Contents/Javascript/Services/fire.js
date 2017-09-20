var fire = {
    init: function (document) {
        var script = document.createElement('script');
        script.src = 'https://www.gstatic.com/firebasejs/4.3.0/firebase.js';
        script.onload = function () {
            var config = {
                apiKey: "AIzaSyD4hO7S5JEIB1N2MayQpd-b-NlLollFRs4",
                authDomain: "aurora-squad.firebaseapp.com",
                databaseURL: "https://aurora-squad.firebaseio.com",
                projectId: "aurora-squad",
                storageBucket: "aurora-squad.appspot.com",
                messagingSenderId: "92048054073"
            };
            firebase.initializeApp(config);

            var weight = firebase.database().ref('weight');
            weight.on('value', function(weight) {
                console.log('!!!!!!!!!!', weight.val());
                fire.weightHandler && fire.weightHandler();
            });
            var steps = firebase.database().ref('steps');
            steps.on('value', function(steps) {
                console.log('!!!!!!!!!!', steps.val());
                fire.stepsHandler && fire.stepsHandler();
            });
            var stones = firebase.database().ref('stones');
            steps.on('value', function(steps) {
                console.log('!!!!!!!!!!', steps.val());
                fire.stonesHandler && fire.stonesHandler();
            });
        };
        document.body.appendChild(script);
    },
    onWeigth: function (handler) {
        fire.weightHandler = handler;
    },
    onSteps: function (handler) {
        fire.stepsHandler = handler;
    },
    onStones: function (handler) {
        fire.stonesHandler = handler;
    }
};