include( 'Javascript/Services/hue.js' );
include( 'Javascript/Services/nuki.js' );
include( 'Javascript/Services/nest.js' );
include( 'Javascript/Services/curtain.js' );
include( 'Javascript/Services/dyson.js' );
include( 'Javascript/Services/fire.js' );

var gotDescription;
fire.init();

var game = {
    step0: function () {
        console.log('Game step 0');
        gotDescription.setSource('Images/Intro_text-part2.png');
        gotDescription.setStyles({
            width: 978,
            height: 184,
            hOffset: 471,
            vOffset: 484
        });

        fire.onWeigth(function () {
            game.step1();
        });

        gotDescription.animate({
            duration: 0.5,
            opacity: 0
        });
        gotDescription.animate({
            duration: 0.5,
            opacity: 1
        });
    },
    step1: function () {
        console.log('Game step 1');
        fire.onSteps(function () {
            game.finish();
        })
    },
    finish: function () {
        console.log('Game step finish');
        nuki.lock(function () {
            console.log('Nuki locked');
        });
        MAF.application.loadView('Finish');
    }
};

// Create a new View class and extend it from the MAF.system.SidebarView
var GoT = new MAF.Class( {
	ClassName: 'GoT', // CSS classname that is applied in the HTML
	Extends: MAF.system.FullscreenView,


    //  1920 X 1080
	// Create your view template
	createView: function() {
        gotDescription = this.elements.gotDescription = new MAF.element.Image({
            aspect: 'source',
            src: 'Images/Intro_text.png',
            styles: {
                width: 1363,
                height: 451,
                hOffset: 232,
                vOffset: 305
            }
        }).appendTo(this);
        this.elements.thermo = new Thermometer({
            styles: {
                width: 280,
                height: 1032,
                hOffset: 1500,
                vOffset: 48
            }
        }).appendTo(this);

        this.resetThermo();

        hue.startDim(function () {
            console.log('Hue dim done');
        });
        nuki.unlock(function () {
            console.log('Nuki unlocked');
        });
        nest.startSetTemp();
        curtain.close(function () {
            console.log('Curtain closed');
        });
        dyson.coolDown(function () {
            console.log('Dyson cool down');
        });

        setTimeout(game.step0, 10000);

        (function (event) {
            log(event.payload);
        }).subscribeTo(MAF.mediaplayer, 'onStateChange');
        var playlist = new MAF.media.Playlist();
        playlist.addEntryByURL('https://dl.dropboxusercontent.com/content_link/LGHUtq8ldtDsAYQIaRE1aczUKdptSpwlO5KKx6WF6PCsovg5eGIWkb950ERrB8RJ/file?dl=0&duc_id=dropbox_duc_id');
        // playlist.addEntryByURL('apps/com.aurora.app.EscapeRoom/Contents/Audio/Game_of_Thrones.mp3');
        MAF.mediaplayer.playlist.set(playlist);
        MAF.mediaplayer.playlist.start();
	},

    resetThermo: function() {
	    clearInterval(this.thermoInterval);

        var percentage = 100;
        var self = this;
        this.thermoInterval = setInterval(function () {
            self.elements.thermo.setPercentage(percentage--);
        }, 500);
    },

	// After create view and when returning to the view the update view is called
	updateView: function() {
        this.resetThermo();
    },

    hideView: function() {
        nest.stopSetTemp();
    }
} );
