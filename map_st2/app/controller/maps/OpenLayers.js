Ext.define('map.controller.maps.OpenLayers', {
    extend: 'Ext.app.Controller',
    requires: ['map.store.Closures'],

    config: {
        refs: {
            'mapWrap': 'map_openlayers',
            'symbolizer': '#selectSymbol'
        },
        control: {
            'mapWrap': {
                'featureselect': 'onFeatureSelect',
                'symbolizerchange': 'onSymbolizerChange'
            },
            'symbolizer': {'change': 'onSymbolizerChange'}
        }
    },

    launch: function() {
        var closureStore = Ext.getStore('closures');
        if(closureStore){
            closureStore.on({
                'refresh': this.onClosuresRefresh,
                scope: this
            });
        }
        this.format = new OpenLayers.Format.GeoJSON();
    },
    onClosuresRefresh: function(store, records) {
        var map = this.getMapWrap().getMap();
        var lyr = map.getLayersByName('Closures')[0];
        if(records.length) {
            lyr.destroyFeatures();
            var features = [];
            store.each(function(rec) {
                features.push(this.format.read(rec.raw, 'Feature'));
            }, this);
            console.log(features.length);
            lyr.addFeatures(features);
        }
    },
    onSymbolizerChange: function(field, value){
        var mapWrap = this.getMapWrap(); 
        if(mapWrap){
            var map = mapWrap.getMap();
            var lyr = map.getLayersByName('Closures')[0];
            lyr.styleMap = mapWrap.getStyles()[value];
            lyr.redraw(true);
        }
    }
});
