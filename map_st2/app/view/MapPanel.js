Ext.define("map.view.MapPanel", {
    extend: 'Ext.Panel',
    requires: [
        'Ext.Toolbar',
        'map.view.maps.OpenLayers'
    ],
    alias: 'widget.MapPanel',
    config: {
        layout:{
            type: 'fit'
        },
        items: [{
            docked: 'top',
            xtype: 'toolbar',
            title: 'NV Facilities Closures',
            items:[{
                id: 'btnBackFilter',
                text: 'Back To Filters',
                ui: 'back'}
            ]
        },{
            xtype: 'map_openlayers',
            useCurrentLocation: false
        }]
    }
});