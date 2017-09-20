// Create a new View class and extend it from the MAF.system.SidebarView
var Finish = new MAF.Class( {
    ClassName: 'Finish', // CSS classname that is applied in the HTML
    Extends: MAF.system.FullscreenView,

    //  1920 X 1080
    // Create your view template
    createView: function() {
        setTimeout(function() { // don't ask me why, don't ask me why, don't ask me why
            MAF.mediaplayer.playlist.loadEntry(0);
        }, 1000);
    },

    // After create view and when returning to the view the update view is called
    updateView: function() {

    }
} );
