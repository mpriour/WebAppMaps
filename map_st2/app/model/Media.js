Ext.define('map.model.Media', {
    extend: 'Ext.data.Model',
    config: {
        fields: [{
            name: 'media',
            mapping:function(data){return data;}
        }]
    }
});
