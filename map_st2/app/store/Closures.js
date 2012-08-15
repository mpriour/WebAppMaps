Ext.define('map.store.Closures', {
    extend: 'Ext.data.JsonStore',
    
    requires: [
        'map.model.Closure'
    ],
    
    config: {
        autoLoad: true,
        
        storeId: 'closures',
        
        model: 'map.model.Closure',

        sorters: [{
            property: 'closed'
        }],

        proxy: {
            type: 'ajax',
            enablePagingParams: false,
            url: map.util.Config.getGeoserverUrl(),
            extraParams: {
                service:'WFS',
                version: '1.0.0',
                request: 'GetFeature',
                typeName: map.util.Config.getPrefix()+':'+ map.util.Config.getFeatureType(),
                outputFormat: 'json',
                srsName: 'EPSG:3857'
            },
            reader: {
                type: 'json',
                rootProperty: 'features'
            }
        }
    }
});
