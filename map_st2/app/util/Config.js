Ext.define('map.util.Config', {
    singleton: true,

    config: {
        geoserverUrl: "/geoserver/ows",
        prefix: "geonode",
        featureType: "nv_mine_closure",
        
        /**
         * @cfg {Array} featureTpl
         * Template to be used in the feature info popup.
         */
        popupTpl: [
            '<div class="popupName">{name:trim}<div/>',
            '<div class="popupAddress">{[Ext.util.Format.trim(values.address||" ")]}</br>',
            '{[Ext.util.Format.trim(values.city||" ")]}, {[Ext.util.Format.trim(values.state||" ")]} {[Ext.util.Format.trim(values.zip||" ")]}',
            '<div class="popupInfoList">',
            '<ul><li><em>County:</em> {[Ext.util.Format.trim(values.county||" ")]}</li>',
            '<li><em>Media:</em> {[Ext.util.Format.trim(values.media||" ")]}</li>',
            '<li><em>Closed:</em> {closed:date}</li>',
            '<tpl if="values.container != null">',
            '<li><em>Container:</em> {container:trim}</li>',
            '</tpl>',
            '</ul></div>'
        ],
                
        /**
         * @cfg {Array} featurePopupOffset
         * The offset in the X and Y direction of the feature popup wrt the feature itself.
         */
        popupOffset: [15, 15],

        /**
         * @cfg {Array} featurePopupSize
         * The width and height of the feature popup.
         */
        popupSize: [300, 200],
        
        /**
         * @cfg {Boolean} useFeaturePopup
         * 'true' to anchor the popup at or near the identified feature.
         * 'false' to align to popup to the map container
         */
        useFeaturePopup: false,
        
        /**
         * @cfg {String} popupAlignment
         * ignored if 'useFeaturePopup' is true.
         * Alignment string to align the info popup to the map container
         */
        popupAlignment: 'tr-tr?'
        
        
    },
    constructor: function(config) {
        this.initConfig(config);
        return this;
    }
});
