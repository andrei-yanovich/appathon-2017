include( 'Javascript/Services/hue.js' );
include( 'Javascript/Services/nuki.js' );
include( 'Javascript/Services/nest.js' );
include( 'Javascript/Services/curtain.js' );

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
                vOffset: 100,
            },
        }).appendTo(this);

        hue.startDim(function () {
            console.log('Hue dim done');
        });
        nuki.unlock(function () {
            console.log('Nuki unlocked');
        });
        nest.setTemp(9, function () {
            console.log('Nest set up')
        });
        curtain.close(function () {
            console.log('Curtain closed');
        });
	},

	// After create view and when returning to the view the update view is called
	updateView: function() {
	}
} );
