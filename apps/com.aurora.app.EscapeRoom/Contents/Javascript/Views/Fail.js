// Create a new View class and extend it from the MAF.system.SidebarView
var Fail = new MAF.Class( {
    ClassName: 'Fail', // CSS classname that is applied in the HTML
    Extends: MAF.system.FullscreenView,

    //  1920 X 1080
    // Create your view template
    createView: function() {
        MAF.mediaplayer.playlist.loadEntry(1);
    },

    // After create view and when returning to the view the update view is called
    updateView: function() {

    }
} );
