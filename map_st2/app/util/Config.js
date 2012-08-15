Ext.define('map.util.Config', {
    singleton: true,

    config: {
        geoserverUrl: "/geoserver/ows",
        prefix: "geonode",
        featureType: "nv_mine_closure"
    },
    constructor: function(config) {
        this.initConfig(config);
        return this;
    }
});
