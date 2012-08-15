Ext.define('map.controller.maps.OpenLayers', {
    extend: 'Ext.app.Controller',
    requires: ['map.store.Closures'],

    config: {
        stores: ['Closures'],

        refs: {
            'mapWrap': 'map_openlayers'
        }
    },

    launch: function() {
        var closuresStore = Ext.getStore('Closures');
        closuresStore.on({
            load: 'onClosuresLoad',
            scope: this
        });
        this.format = new OpenLayers.Format.GeoJSON();
    },
    onClosuresLoad: function(store, records) {
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
    }
});
