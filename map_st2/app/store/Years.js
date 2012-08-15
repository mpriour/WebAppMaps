Ext.define('map.store.Years', {
    extend: 'Ext.data.Store',
    config: {
        proxy: {
            type: 'ajax',
            url: '../data/years.json'
        },
        model: 'map.model.Year',
        autoLoad: true
    }
});
