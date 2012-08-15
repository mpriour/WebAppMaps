Ext.define('map.view.maps.OpenLayers',{
    requires: ['map.store.Closures'],
    extend: 'Ext.map.OpenLayers',
    alias: 'widget.maps.OpenLayers',
    xtype: 'map_openlayers',
    config: {
        mapCenter: {latitude: 38.50, longitude: -117.02},
        zoomLevel: 8,
        defaultBaseLayer: 'MapBox',
        styles: null 
    },
    constructor: function(options) {
        options = options || {};
        var closures = new OpenLayers.Layer.Vector('Closures');
        options.layers = [closures];
        this.callParent([options]);
    }
});
