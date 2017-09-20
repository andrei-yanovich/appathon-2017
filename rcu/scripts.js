(function () {
    const config = {
        apiKey: "AIzaSyD4hO7S5JEIB1N2MayQpd-b-NlLollFRs4",
        authDomain: "aurora-squad.firebaseapp.com",
        databaseURL: "https://aurora-squad.firebaseio.com",
        projectId: "aurora-squad",
        storageBucket: "aurora-squad.appspot.com",
        messagingSenderId: "92048054073",
    };
    firebase.initializeApp(config);
    console.log('firebase SDK version', firebase.SDK_VERSION);

    const database = firebase.database();

    document.getElementById('weight').addEventListener('click', () => {
        console.log('set weight');
        database.ref('weight').set(Date.now());
    });
    document.getElementById('steps').addEventListener('click', () => {
        console.log('set steps');
        database.ref('steps').set(Date.now());
    });
    document.getElementById('stones').addEventListener('click', () => {
        console.log('set stones');
        database.ref('stones').set(Date.now());
    });
})();