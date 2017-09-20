var THERMO_HEIGHT = 590 - 94;

var Thermometer = new MAF.Class({
    Extends: MAF.element.Container,

    initialize: function() {
        this.parent();

        this.elements = {};

        this.elements.thermoMaskCircle = new MAF.element.Container({
            styles: {
                vOffset: 598,
                hOffset: 40,
                borderRadius: '50%',
                backgroundColor: '#0fa5ff',
                width: 100,
                height: 100
            }
        }).appendTo(this);

        this.elements.thermoBar = new MAF.element.Container({
            styles: {
                vOffset: 105,
                hOffset: 57,
                backgroundColor: '#0fa5ff',
                width: 60,
                height: THERMO_HEIGHT
            }
        }).appendTo(this);

        this.elements.thermoShadow = new MAF.element.Image({
            aspect: 'fit',
            src: 'Images/Themometer_shadow.png',
            styles: {
                width: this.width,
                height: this.height
            }
        }).appendTo(this);

        this.elements.thermoBg = new MAF.element.Image({
            aspect: 'fit',
            src: 'Images/Themometer_bg.png',
            styles: {
                width: this.width,
                height: this.height
            }
        }).appendTo(this);
    },

    // Alter the width of the inner bar to match the percentage
    setPercentage: function( percentage ) {
        var newHeight = ( THERMO_HEIGHT / 100 ) * percentage;
        var delta = this.elements.thermoBar.height - newHeight;
        this.elements.thermoBar.setStyle( 'height', newHeight );
        this.elements.thermoBar.setStyle( 'vOffset', this.elements.thermoBar.vOffset + delta );
    },

    suicide: function(){
        // Cleanup all the elements that we stored upon destroying the instance
        Object.forEach( this.elements, function( key, item ) {
            item.suicide();
            item = null;
        } );

        delete this.elements;

        // Call MAF.element.Container's suicide function
        this.parent();
    }
} );