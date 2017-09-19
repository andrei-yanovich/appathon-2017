// Include your views, styles and other things you need
// The Contents folder is used as root here
include( 'Javascript/Theme.js' );
include( 'Javascript/Views/RoomSelector.js' );
include( 'Javascript/Views/Intro.js' );
include( 'Javascript/Views/AppWelcome.js' );
include( 'Javascript/Views/GoT.js' );
include( 'Javascript/Views/Finish.js' );
include( 'Javascript/Classes/Thermometer.js' );

// Init application with view config
MAF.application.init( {
	views: [
		{ id: 'AppWelcome', viewClass: AppWelcome },
		{ id: 'RoomSelector', viewClass: RoomSelector },
		{ id: 'Intro', viewClass: Intro },
		{ id: 'GoT', viewClass: GoT },
		{ id: 'Finish', viewClass: Finish },
    { id: 'About', viewClass: MAF.views.AboutBox } // Use the default About view
	],
	defaultViewId: 'GoT', // Declare what view to be loaded when opening the app
	settingsViewId: 'About' // Declare what view is opened when a used loads the settings
} );
