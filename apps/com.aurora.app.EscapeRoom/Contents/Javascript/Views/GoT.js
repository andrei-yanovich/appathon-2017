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

        this.resetThermo()
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
	}
} );
