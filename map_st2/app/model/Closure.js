Ext.define('map.model.Closure', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            {name: 'id', type: 'string'},
            {name: 'site', mapping: 'properties.site', type: 'string'},
            {name: 'region', mapping: 'properties.region', type: 'string'},
            {name: 'county', mapping: 'properties.county', type: 'string'},
            {name: 'name', mapping: 'properties.name', type: 'string'},
            {name: 'address', mapping: 'properties.address', type: 'string'},
            {name: 'zip', mapping: 'properties.zip', type: 'string'},
            {name: 'city', mapping: 'properties.city', type: 'string'},
            {name: 'state', mapping: 'properties.state', defaultValue: 'NV'},
            {name: 'source', mapping: 'properties.source', type: 'string'},
            {name: 'media', mapping: 'properties.media', type: 'string'},
            {name: 'container', mapping: 'properties.container', type: 'string'},
            {name: 'closed', mapping: 'properties.closedate', type: 'date'},
            {name: 'reported', mapping: 'properties.datereported', type: 'date'},
            {name: 'geometry_name', type: 'string'},
            {name: 'geometry', defaultValue: null}
        ]
    }
});
