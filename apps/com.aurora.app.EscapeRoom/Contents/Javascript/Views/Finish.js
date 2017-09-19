// Create a new View class and extend it from the MAF.system.SidebarView
var Finish = new MAF.Class( {
    ClassName: 'Finish', // CSS classname that is applied in the HTML
    Extends: MAF.system.FullscreenView,

    //  1920 X 1080
    // Create your view template
    createView: function() {
        var text = this.elements.text = new MAF.element.Text({
            data: 'Finish',
            styles: {
                width: 200,
                height: 200,
                hOffset: 900,
                vOffset: 100,
            },
        }).appendTo(this);
    },

    // After create view and when returning to the view the update view is called
    updateView: function() {

    }
} );
