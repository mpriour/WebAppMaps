Ext.define('map.model.Year', {
    extend: 'Ext.data.Model',
    config: {
        fields: [{
            name: 'year',
            mapping: function(data) {
                return data;
            }
        }]
    }
});
