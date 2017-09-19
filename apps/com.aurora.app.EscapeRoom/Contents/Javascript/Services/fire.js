var fire = {
    init: function () {
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
    },
    onWeigth: function (handler) {
        fire.weightHandler = handler;
    },
    onSteps: function (handler) {
        fire.stepsHandler = handler;
    }
};