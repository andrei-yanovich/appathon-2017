include( 'Javascript/Services/hue.js' );
include( 'Javascript/Services/nuki.js' );
include( 'Javascript/Services/nest.js' );
include( 'Javascript/Services/curtain.js' );
include( 'Javascript/Services/dyson.js' );
include( 'Javascript/Services/nokia.js' );

var game = {
    step0: function () {
        console.log('Game step 0');
        // TODO: show message 0
        nokia.waitForWeight(() => {
            game.step1();
        });
    },
    step1: function () {
        // TODO: show message 1
        console.log('Game step 1');
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
        var gotDescription = this.elements.gotDescription = new MAF.element.Text({
            data: 'GoT escape room game',
            styles: {
                width: 500,
                height: 200,
                hOffset: 900,
                vOffset: 100
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

        game.step0();
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
