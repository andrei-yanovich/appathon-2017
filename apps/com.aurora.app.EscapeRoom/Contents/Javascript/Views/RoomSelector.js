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
                backgroundImage: 'Images/Tile_GoT.png',
                'box-shadow': 'inset 0 0 0 3px #847d75'
            },
            events: {
                onFocus: function () {
                    this.setStyles({
                        'box-shadow': 'inset 0 0 0 5px #edddce'
                    });
                    gotDescription.show();
                },
                onBlur: function () {
                    this.setStyles({
                        'box-shadow': 'inset 0 0 0 3px #847d75'
                    });
                    gotDescription.hide();
                }
            }
        }).appendTo(this);
        var gotDescription = this.elements.gotDescription = new MAF.element.Text({
            data: 'qwe asd zxc qwe asd zxc',
            styles: {
                width: 200,
                height: 200,
                hOffset: 900,
                vOffset: 100,
            },
        }).appendTo(this);
        gotDescription.hide();

        var room0Button = this.elements.room0Button = new MAF.control.Button({
            theme: false,
            styles: {
                width: 736,
                height: 377,
                hOffset: 100,
                vOffset: 600,
                borderRadius: 20,
                backgroundImage: 'Images/Tile_2.png',
                'box-shadow': 'inset 0 0 0 3px #847d75'
            },
            events: {
                onFocus: function () {
                    this.setStyles({
                        'box-shadow': 'inset 0 0 0 5px #edddce'
                    });
                    room0Description.show();
                },
                onBlur: function () {
                    this.setStyles({
                        'box-shadow': 'inset 0 0 0 3px #847d75'
                    });
                    room0Description.hide();
                }
            }
        }).appendTo(this);
        var room0Description = this.elements.room0Description = new MAF.element.Text({
            data: '11111qwe asd zxc qwe asd zxc',
            styles: {
                width: 200,
                height: 200,
                hOffset: 900,
                vOffset: 100,
            },
        }).appendTo(this);
        room0Description.hide();
	},

	// After create view and when returning to the view the update view is called
	updateView: function() {
	}
} );
