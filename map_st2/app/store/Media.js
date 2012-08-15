Ext.define('map.store.Media', {
    extend: 'Ext.data.Store',
    config: {
        proxy: {
            type: 'ajax',
            url: '../data/media.json'
        },
        model: 'map.model.Media',
        autoLoad: true
    }
});
