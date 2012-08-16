Ext.define('map.controller.maps.OpenLayers', {
    extend: 'Ext.app.Controller',
    requires: ['map.store.Closures', 'map.view.InfoPopup'],

    config: {
        refs: {
            'mapWrap': 'map_openlayers',
            'symbolizer': '#selectSymbol',
            'popup': 'MapPanel InfoPopup',
            'mapPanel': 'MapPanel'
        },
        control: {
            'mapWrap': {
                'featureselected': 'onFeatureSelect',
                'featureunselected': 'onFeatureUnselect',
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
        lyr.destroyFeatures();
        var features = [];
        store.each(function(rec) {
            features.push(this.format.read(rec.raw, 'Feature'));
        }, this);
        console.log(features.length);
        lyr.addFeatures(features);
    },
    onSymbolizerChange: function(field, value){
        var mapWrap = this.getMapWrap(); 
        if(mapWrap){
            var map = mapWrap.getMap();
            var lyr = map.getLayersByName('Closures')[0];
            lyr.styleMap = mapWrap.getStyles()[value];
            lyr.redraw(true);
        }
    },
    onFeatureSelect: function(feature){
        var mapWrap = this.getMapWrap(); 
        if(mapWrap){
            var store = Ext.getStore('closures');
            var popup = mapWrap.getPopup();
            //find the feature record in the store
            var rec = store && store.findRecord('id', feature.fid);
            if(rec){
                if(!popup){
                    popup = Ext.create('map.view.InfoPopup', {data:rec.data, map:mapWrap});
                    this.getMapPanel().add(popup);
                    mapWrap.setPopup(popup);
                } else {
                    popup.setData(rec.data);
                }
                if(!map.util.Config.getUseFeaturePopup()){
                    popup.showBy(mapWrap, map.util.Config.getPopupAlignment());
                } else {
                    popup.show();
                }
            }
        }
    },
    onFeatureUnselect: function(feature){
        var mapWrap = this.getMapWrap();
        var popup = this.getPopup() || mapWrap.getPopup(); 
        if(popup){
            popup.hide();
        }
    }
});
