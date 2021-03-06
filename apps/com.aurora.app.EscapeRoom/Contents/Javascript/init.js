// Include your views, styles and other things you need
// The Contents folder is used as root here
include( 'Javascript/Theme.js' );
include( 'Javascript/Views/RoomSelector.js' );
include( 'Javascript/Views/DeviceSelection.js' );
include( 'Javascript/Views/AppWelcome.js' );
include( 'Javascript/Views/GoT.js' );
include( 'Javascript/Views/Finish.js' );
include( 'Javascript/Views/Fail.js' );
include( 'Javascript/Classes/Thermometer.js' );

// Init application with view config
MAF.application.init( {
	views: [
		{ id: 'AppWelcome', viewClass: AppWelcome },
		{ id: 'RoomSelector', viewClass: RoomSelector },
		{ id: 'DeviceSelection', viewClass: DeviceSelection },
		{ id: 'GoT', viewClass: GoT },
		{ id: 'Finish', viewClass: Finish },
		{ id: 'Fail', viewClass: Fail },
    { id: 'About', viewClass: MAF.views.AboutBox } // Use the default About view
	],
	defaultViewId: 'AppWelcome', // Declare what view to be loaded when opening the app
	settingsViewId: 'About' // Declare what view is opened when a used loads the settings
} );
