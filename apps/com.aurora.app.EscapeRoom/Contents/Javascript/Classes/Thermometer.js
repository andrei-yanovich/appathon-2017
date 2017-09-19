var THERMO_HEIGHT = 785;

var Thermometer = new MAF.Class({
    Extends: MAF.element.Container,

    initialize: function() {
        this.parent();

        this.elements = {};

        this.elements.thermoMaskCircle = new MAF.element.Container({
            styles: {
                vOffset: 840,
                hOffset: 55,
                borderRadius: '50%',
                backgroundColor: '#0fa5ff',
                width: 150,
                height: 150
            }
        }).appendTo(this);

        this.elements.thermoBar = new MAF.element.Container({
            styles: {
                vOffset: 70,
                hOffset: 87,
                backgroundColor: '#0fa5ff',
                width: 100,
                height: THERMO_HEIGHT
            }
        }).appendTo(this);

        this.elements.thermoShadow = new MAF.element.Image({
            aspect: 'source',
            src: 'Images/Themometer_shadow.png'
        }).appendTo(this);

        this.elements.thermoBg = new MAF.element.Image({
            aspect: 'source',
            src: 'Images/Themometer_bg2.png'
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