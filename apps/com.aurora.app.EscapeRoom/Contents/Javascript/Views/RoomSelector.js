// Create a new View class and extend it from the MAF.system.SidebarView
var RoomSelector = new MAF.Class( {
	ClassName: 'RoomSelector', // CSS classname that is applied in the HTML
	Extends: MAF.system.FullscreenView,

    //  1920 X 1080
	// Create your view template
	createView: function() {
        var gotButton = this.elements.gotButton = new MAF.control.Button({
            theme: false,
            styles: {
                width: 730,
                height: 371,
                hOffset: 100,
                vOffset: 100,
                borderRadius: 20,
                backgroundImage: 'Images/Tile_GoT.jpg'
            },
            events: {
                onFocus: function () {
                    this.setStyles({
                        border: '5px solid #edddce'
                    });
                },
                onBlur: function () {
                    this.setStyles({
                        border: '3px solid #847d75'
                    });
                },
                onSelect: function () {
                    MAF.application.loadView('GoT');
                }
            }
        }).appendTo(this);
        var gotDescription = this.elements.gotDescription = new MAF.element.Image({
            src: 'Images/Rooms_info.png',
            styles: {
                width: 898,
                height: 616,
                hOffset: 924,
                vOffset: 127
            }
        }).appendTo(this);

        var room0Button = this.elements.room0Button = new MAF.control.Button({
            theme: false,
            styles: {
                width: 736,
                height: 377,
                hOffset: 100,
                vOffset: 600,
                borderRadius: 20,
                backgroundImage: 'Images/Tile_2.jpg'
            },
            events: {
                onFocus: function () {
                    this.setStyles({
                        border: '5px solid #edddce'
                    });
                },
                onBlur: function () {
                    this.setStyles({
                        border: '3px solid #847d75'
                    });
                }
            }
        }).appendTo(this);
	},

	// After create view and when returning to the view the update view is called
	updateView: function() {
	}
} );
