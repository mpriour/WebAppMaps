// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso
//
// Project: map
// Model: ClosuresModel
// ==========================================================================

map.ClosuresModel = M.Model.create({

    /* Define the name of your model. Do not delete this property! */
    __name__: 'ClosuresModel',
    /* DATA MODEL */
    id: M.Model.attr('string', {
        isRequired: true
    }),
    site: M.Model.attr('string'),
    region: M.Model.attr('string'),
    county: M.Model.attr('string'),
    name: M.Model.attr('string'),
    address: M.Model.attr('string'),
    zip: M.Model.attr('string'),
    state_us: M.Model.attr('string'),
    source: M.Model.attr('string'),
    media: M.Model.attr('string'),
    container: M.Model.attr('string'),
    closed: M.Model.attr('date'),
    reported: M.Model.attr('date'),
    geometry_name: M.Model.attr('string'),
    geometry: M.Model.attr('object')
}, 
/* DEFINE PROXY */
M.DataConsumer.extend({
    /* RESPONSE TO RECORD MAPPING */
    responsePath: 'features',
    map: function(obj) {
        var p = obj.properties;
        var props = {
            id: obj.id,
            geometry: obj.geometry,
            geometry_name: obj.geometry_name,
            site: p.site,
            region: p.region,
            county: p.county,
            name: p.name,
            address: p.address,
            zip: p.zip,
            state: p.state,
            source: p.source,
            media: p.media,
            container: p.container,
            closed: p.closedate,
            reported: p.datereported,
            state_us: p.state || 'NV'
        };
        return props;
    },
    dataUrl: '/local/geoserver/ows?',
    urlParams: {
        params: {
            service: 'WFS',
            version: '1.0.0',
            request: 'GetFeature',
            typeName: 'geonode:nv_mine_closure',
            outputFormat: 'json',
            srsName: 'EPSG:3857'
        }
    },
    url: function(params) {
        return this.dataUrl + $.param(params);
    },
    callbacks: {
        success: {
            action:function(data) {
            console.log('Got:' + data.length);
            console.log(data[0]);
        }},
        error: {action:function(msg) {
            console.log("Data Request Error:" + msg);
        }}
    }
}));
