Ext.define('map.view.maps.OpenLayers',{
    requires: ['map.store.Closures'],
    extend: 'Ext.map.OpenLayers',
    alias: 'widget.maps.OpenLayers',
    xtype: 'map_openlayers',
    config: {
        mapCenter: {latitude: 38.50, longitude: -117.02},
        zoomLevel: 6,
        defaultBaseLayer: 'MapBox',
        styles: null,
        popup: null 
    },
    constructor: function(options) {
        options = options || {};
        
        //create layer
        var closures = new OpenLayers.Layer.Vector('Closures', {
            renderers: ['SVG','Canvas'],
            eventListeners:{
                'featureselected':function(evt){
                    //relay event to map component
                    this.fireEvent('featureselected',evt.feature);
                },
                'featureunselected':function(evt){
                    //relay event to map component
                    this.fireEvent('featureunselected',evt.feature);
                },
                scope: this
            }
        });
        options.layers = [closures];
        
        //add our select control
        var select = new OpenLayers.Control.SelectFeature(closures, {autoActivate: true});
        options.controls = [select];
        //add our default controls
        options.controls.push(new OpenLayers.Control.TouchNavigation());
        options.controls.push(new OpenLayers.Control.Zoom());
        options.controls.push(new OpenLayers.Control.Attribution());
        
        //styling        
        var styleHash = {
            'default': OpenLayers.Util.applyDefaults({
                fillOpacity: 0.8,
                strokeColor: 'whitesmoke',
                strokeWidth: 0.5
            }, OpenLayers.Feature.Vector.style['default']),
            'select': {
                strokeColor: 'black',
                strokeOpacity: 1,
                strokeWidth: 2,
                fillOpacity: 1.0
            }
        };

        var styles = {
            'decade': new OpenLayers.StyleMap(styleHash, {extendDefault: true}),
            'media': new OpenLayers.StyleMap(styleHash, {extendDefault: true}),
            'container': new OpenLayers.StyleMap(styleHash, {extendDefault: true})
        };
        styles.decade.addUniqueValueRules('default', 'closedate', {
            1980: {fillColor: 'red'},
            1990: {fillColor: 'orange'},
            2000: {fillColor: 'blue'},
            2010: {fillColor: 'purple'}
        }, function(feature){
            return {closedate : Math.floor(new Date(feature.attributes.closedate).getUTCFullYear()/10) * 10};
        });
        var mediaSymbols = {
            'Clean': {fillColor: 'green', title: 'Clean Close'},
            '&': {fillColor: 'purple', title: 'Soil & Water'},
            'Soil$': {fillColor: 'brown', title: 'Soil'},
            'Water$':{fillColor: 'blue', title: 'Water'},
            'None':{fillColor: 'whitesmoke', strokeColor: 'black', strokeWidth: 1, title: 'None'},
            'default':{fillColor: 'orange', title: 'Unknown'}
        };
        var mediaRules = [];
        Ext.iterate(mediaSymbols,function(key, value){
            mediaRules.push(new OpenLayers.Rule({
                symbolizer: value,
                filter: new OpenLayers.Filter.Comparison({
                    type: OpenLayers.Filter.Comparison.LIKE,
                    property: 'media',
                    value: key
                }),
                elseFilter: key=='default'
            }));
        });
        styles.media.styles['default'].addRules(mediaRules);
        styles.container.addUniqueValueRules('default', 'container', {
            'yes': {fillColor: 'green', title: 'Storage Container Issue'},
            'no': {fillColor: 'red', title: 'No Container Issue'}
        }, function(feature){
            return {container: (feature.attributes.container) ? 'yes' : 'no'};
        });
        options.styles = styles;
        //set vector layer style
        closures.styleMap = styles.decade;
        //call superclass
        this.callParent([options]);
    }
});
