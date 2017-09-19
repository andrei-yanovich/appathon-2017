// Create a new View class and extend it from the MAF.system.SidebarView
var RoomSelector = new MAF.Class( {
	ClassName: 'RoomSelector', // CSS classname that is applied in the HTML

	Extends: MAF.system.FullscreenView,

    //  1920 X 1080
	// Create your view template
	createView: function() {
        var elementGrid = this.elements.elementGrid = new MAF.element.Grid( {
            rows: 1,
            columns: 3,
            styles: {
                width: this.width,
                height: this.height / 2,
                vAlign: 'center'
            },
            cellCreator: function() {
                var cell = new MAF.element.GridCell( {
                    styles: this.getCellDimensions(),
                    events:{
                        onSelect: function() {
                            log( 'onSelect function GridCell', this.getCellIndex() );
                        },
                        onFocus: function() {
                            var cellIndex = this.getCellIndex();

                            if ( 1 === cellIndex || 2 === cellIndex ) {
                                this.animate({
                                    backgroundImage: 'Images/focus.png',
                                    backgroundRepeat: 'repeat-x',
                                    duration: 0.3,
                                    scale: 1.2
                                } );
                            } else {
                                this.animate( {
                                    backgroundColor: 'white',
                                    duration: 0.3,
                                    scale: 1.2
                                } );

                                this.title.animate( {
                                    duration: 0.3,
                                    color: 'black'
                                } );
                            }
                        },
                        onBlur: function () {
                            var cellIndex = this.getCellIndex();

                            if ( 1 === cellIndex || 2 === cellIndex ) {
                                this.animate( {
                                    backgroundImage: null,
                                    duration: 0.3,
                                    scale: 1.0
                                } );
                            } else {
                                this.animate( {
                                    backgroundColor: null,
                                    duration: 0.3,
                                    scale: 1.0
                                } );
                                this.title.animate( {
                                    duration: 0.3,
                                    color: 'white'
                                });
                            }
                        }
                    }
                } );

                cell.title = new MAF.element.Text({
                    styles: {
                        width: cell.width,
                        height: cell.height,
                        color: 'white',
                        fontSize: 30,
                        anchorStyle: 'center',
                        wrap: true
                    }
                }).appendTo( cell );

                return cell;
            },
            cellUpdater: function(cell, data) {
                cell.title.setText(data.title);
            }
        }).appendTo(this);
	},

	// After create view and when returning to the view the update view is called
	updateView: function() {
        this.elements.elementGrid.changeDataset([
            { title: 'Grid1' },
            { title: 'Grid2' },
            { title: 'Grid3' }
        ]);
	}
} );
