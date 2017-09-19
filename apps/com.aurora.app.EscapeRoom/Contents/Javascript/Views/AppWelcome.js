// Create a new View class and extend it from the MAF.system.SidebarView
var AppWelcome = new MAF.Class( {
    ClassName: 'AppWelcome', // CSS classname that is applied in the HTML
    Extends: MAF.system.FullscreenView,

    //  1920 X 1080
    // Create your view template
    createView: function() {
        var deviceSelection = this.deviceSelection = new MAF.control.Button({
            focus: false,
            styles: {
                width: 431,
                height: 98,
                hOffset: 1380,
                vOffset: 769,
                backgroundImage: 'Images/Escape_button_Empty.png'
            },
            events: {
                onFocus: function () {
                    this.setStyles({
                        backgroundImage: 'Images/Escape_button_Empty_focussed.png'
                    });
                }
            }
        }).appendTo(this);

        var startPlaying = this.startPlaying = new MAF.control.Button({
            focus: false,
            styles: {
                width: 431,
                height: 98,
                hOffset: 1380,
                vOffset: 902,
                backgroundImage: 'Images/Escape_button_Empty.png'
            },
            events: {
                onFocus: function () {
                    this.setStyles({
                        backgroundImage: 'Images/Escape_button_Empty_focussed.png'
                    });
                }
            }
        }).appendTo(this);
    },

    // After create view and when returning to the view the update view is called
    updateView: function() {

    }
} );
