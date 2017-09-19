// Create a new View class and extend it from the MAF.system.SidebarView
var AppWelcome = new MAF.Class( {
    ClassName: 'AppWelcome', // CSS classname that is applied in the HTML
    Extends: MAF.system.FullscreenView,

    //  1920 X 1080
    // Create your view template
    createView: function() {
        MAF.mediaplayer.init();

        var deviceSelection = this.deviceSelection = new MAF.control.TextButton({
            theme: false,
            label: 'Device Selection',
            textStyles: {
                anchorStyle: 'center',
                fontSize: 40,
                marginTop: -4
            },
            styles: {
                width: 431,
                height: 98,
                hOffset: 1380,
                vOffset: 769,
                borderRadius: 15,
                paddingTop: 2,
                border: '3px solid #847d75',
                backgroundColor: '#4a4a4a'
            },
            events: {
                onBlur: function () {
                    this.setStyles({
                        paddingTop: 2,
                        border: '3px solid #847d75'
                    });
                    this.children[0].setStyles({
                        fontSize: 40
                    });
                },
                onFocus: function () {
                    this.setStyles({
                        paddingTop: 0,
                        border: '5px solid #edddce'
                    });
                    this.children[0].setStyles({
                        fontSize: 44
                    });
                }
            }
        }).appendTo(this);

        var startPlaying = this.startPlaying = new MAF.control.TextButton({
            label: 'Start Playing',
            theme: false,
            textStyles: {
                anchorStyle: 'center',
                fontSize: 40,
                marginTop: -4
            },
            styles: {
                width: 431,
                height: 98,
                hOffset: 1380,
                vOffset: 902,
                borderRadius: 15,
                paddingTop: 2,
                border: '3px solid #847d75',
                backgroundColor: '#4a4a4a'
            },
            events: {
                onBlur: function () {
                    this.setStyles({
                        paddingTop: 2,
                        border: '3px solid #847d75'
                    });
                    this.children[0].setStyles({
                        fontSize: 40
                    });
                },
                onFocus: function () {
                    this.setStyles({
                        paddingTop: 0,
                        border: '5px solid #edddce'
                    });
                    this.children[0].setStyles({
                        fontSize: 44
                    });
                },
                onSelect: function () {
                    MAF.application.loadView('RoomSelector');
                }
            }
        }).appendTo(this);
    },

    // After create view and when returning to the view the update view is called
    updateView: function() {

    }
} );
