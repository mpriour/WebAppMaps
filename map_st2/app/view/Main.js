Ext.define("map.view.Main", {
    extend: 'Ext.Panel',
    requires: [
        'Ext.TitleBar',
        'Ext.map.OpenLayers'
    ],
    config: {
        layout:{
            type: 'fit'
        },
        items: [{
            docked: 'top',
            xtype: 'titlebar',
            title: 'Welcome to Sencha Touch 2'
        },{
            xtype: 'openlayers'
        }]
    }
});
