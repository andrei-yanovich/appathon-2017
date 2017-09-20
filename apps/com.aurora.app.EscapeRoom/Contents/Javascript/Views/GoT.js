include( 'Javascript/Services/hue.js' );
include( 'Javascript/Services/nuki.js' );
include( 'Javascript/Services/nest.js' );
include( 'Javascript/Services/curtain.js' );
include( 'Javascript/Services/dyson.js' );
include( 'Javascript/Services/fire.js' );

var gotDescription;

var GAME_DURATION = 150; // 2.5 minutes

var game = {
    step0: function (view) {
        console.log('Game step 0');

        fire.onWeigth(function () {
            game.step1(view);
        });

        var onAnimationEnded = function (anim) {
            anim.reset();
            // gotDescription.setStyle('transition', 'none');
            gotDescription.setStyles({
                srcHeight: 166,
                srcWidth: 968,
                width: 968,
                height: 166,
                hOffset: 471,
                vOffset: 484
            });
            gotDescription.setSource('Images/Intro_text-part2.png');
            gotDescription.animate({
                duration: 0.5,
                opacity: 1
            });
        };

        onAnimationEnded.subscribeOnce(gotDescription, 'onAnimationEnded', this);
        gotDescription.animate({
            duration: 0.5,
            opacity: 0
        });
    },
    step1: function (view) {
        console.log('Game step 1');
        fire.onSteps(function () {
            game.finish(true, view);
        })
    },
    finish: function (victory, view) {
        console.log('Game step finish');
        view.stopThermo();
        clearTimeout(view.failTimerId);
        nest.stopSetTemp();
        nest.setTemp(23, function () {
            console.log('Nest back to normal');
        });
        nuki.lock(function () {
            console.log('Nuki locked');
        });
        curtain.open(function () {
            console.log('Curtain open');
        });
        dyson.stop(function () {
            console.log('Dyson stop');
        });
        hue.restore(function () {
            console.log('Hues restored');
        });
        MAF.application.loadView(victory ? 'Finish' : 'Fail');
    }
};

// Create a new View class and extend it from the MAF.system.SidebarView
var GoT = new MAF.Class( {
	ClassName: 'GoT', // CSS classname that is applied in the HTML
	Extends: MAF.system.FullscreenView,

    //  1920 X 1080
    stopThermo: function () {
        clearInterval(this.thermoInterval);
    },

    // Create your view template
    createView: function() {
        var self = this;

        gotDescription = this.elements.gotDescription = new MAF.element.Image({
            aspect: 'source',
            src: 'Images/Intro_text.png',
            srcHeight: 418,
            srcWidth: 1362,
            styles: {
                width: 1362,
                height: 418,
                hOffset: 118,
                vOffset: 305
            },
            events: {
                onImageLoaded: this.onImageLoaded
            }
        }).appendTo(this);
        this.elements.thermo = new Thermometer({
            styles: {
                width: 198,
                height: 730,
                hOffset: 1595,
                vOffset: 202
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

        setTimeout(function () {
            game.step0(self);
        }, 12000);

        (function (event) {
            log(event.payload);
        }).subscribeTo(MAF.mediaplayer, 'onStateChange');
        var playlist = new MAF.media.Playlist();
        playlist.addEntryByURL('https://andrei-yanovich.github.io/appathon-2017/GoT_intro_song.mp3');
        playlist.addEntryByURL('https://andrei-yanovich.github.io/appathon-2017/RainsOfCastamere.mp3');
        MAF.mediaplayer.playlist.set(playlist);
        MAF.mediaplayer.playlist.start();

        this.failTimerId = setTimeout(function () {
            game.finish(false, self);
        }, GAME_DURATION * 1000);
	},

    resetThermo: function() {
	    clearInterval(this.thermoInterval);

        var percentage = 100;
        var fullDuration = GAME_DURATION;
        var stepDurationDelimiter = 4;
        var stepDuration = 1000 / stepDurationDelimiter;
        var stepDelta = percentage / fullDuration / stepDurationDelimiter;
        var self = this;
        this.thermoInterval = setInterval(function () {
            percentage -= stepDelta;
            self.elements.thermo.setPercentage(percentage);
        }, stepDuration);
    },

	// After create view and when returning to the view the update view is called
	updateView: function() {
        this.resetThermo();
    },

    hideView: function() {
        nest.stopSetTemp();
        this.stopThermo();
        MAF.mediaplayer.control.stop();
    }
});
