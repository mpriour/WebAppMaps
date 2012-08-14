/*
 * Copyright 2012 OpenGeo
 * 
 * Published under the BSD license. 
 * 
 * Based on OpenLayers, GXM & Ext.ux.touch.Leaflet
 * (Ext.ux.touch.Leaflet - Retrieved from VinylFox github repo at:
 * https://github.com/VinylFox/Ext.ux.touch.Leaflet)
 */

/**
 * Wraps an OpenLayers Map in an Ext.Component.
 * Implements the same public API as Ext.map.OpenLayers
 * ## Example
 *
 *     Ext.Viewport.add({
 *         xtype: 'openlayers',
 *         useCurrentLocation: true
 *     });
 *
 */
Ext.define('Ext.map.OpenLayers', {
    extend: 'Ext.Component',
    xtype : 'openlayers',
    requires: ['Ext.util.GeoLocation'],
    alias: 'Ext.OpenLayers',
    
    isMap: true,

    config: {
        /**
         * @event maprender
         * @param {Ext.map.OpenLayers} this
         * @param {OpenLayers.Map} map The rendered map instance
         */

        /**
         * @event centerchange
         * @param {Ext.map.OpenLayers} this
         * @param {OpenLayers.Map} map The rendered map instance
         * @param {OpenLayers.LonLat} center The current LatLng center of the map
         */

        /**
         * @event zoomchange
         * @param {Ext.map.OpenLayers} this
         * @param {OpenLayers.Map} map The rendered Leaflet map instance
         * @param {Number} zoomLevel The current zoom level of the map
         */

        /**
         * @cfg {String} baseCls
         * The base CSS class to apply to the Maps's element
         * @accessor
         */
        baseCls: Ext.baseCSSPrefix + 'olmap',

        /**
         * @cfg {Boolean/Ext.util.GeoLocation} useCurrentLocation
         * Pass in true to center the map based on the geolocation coordinates or pass a
         * {@link Ext.util.GeoLocation GeoLocation} config to have more control over your GeoLocation options
         * @accessor
         */
        useCurrentLocation: false,

        /**
         * @cfg {map} map
         * The wrapped map.
         * @accessor
         */
        map: null,

        /**
         * @cfg {Ext.util.GeoLocation} geo
         * @accessor
         */
        geo: null,

        /**
         * @cfg {Object} mapOptions
         * @accessor
         */
        mapOptions: null,
        
        /**
         * @property {Array/Object/OpenLayers.LonLat}
         * @accessor
         */
        mapCenter: null,
        
        /**
         * @property {Number}
         * @accessor
         */
        zoomLevel: null,
        
        /**
         * @property {String/Boolean}
         * One of:
         * 'OSM', 'MapBox', 'CloudMade', OpenLayers.Layer.XYZ url string, or
         * false to not create a default base layer
         */
        defaultBaseLayer: 'OSM' 
    },

    constructor: function() {
        this.callParent(arguments);
        this.options = {};
        this.element.setVisibilityMode(Ext.Element.OFFSETS);
    },

    initialize: function() {
        this.callParent();
        this.buildDefaultBaseLayer(this.getDefaultBaseLayer());
        if(!this.getGeo()){ 
            this.setGeo(new Ext.util.GeoLocation({
                autoLoad : this.getUseCurrentLocation()
            }));
        }
        this.on({
            painted: 'renderMap',
            scope: this
        });
        this.element.on('touchstart', 'onTouchStart', this);
    },

    onTouchStart: function(e) {
        e.makeUnpreventable();
    },

    applyMapOptions: function(options) {
        return Ext.merge({}, this.options, options);
    },

    updateMapOptions: function(newOptions) {
        var map = this.getMap();

        if (map) {
            map.setOptions(newOptions);
        }
    },

    getMapOptions: function() {
        return Ext.apply({}, this.options);
    },

    updateUseCurrentLocation: function(useCurrentLocation) {
        this.setGeo(useCurrentLocation);
    },
    
    getZoomLevel: function(){
        return this.getMapOptions().zoom;
    },
    
    getMapCenter: function(){
        return this.getMapOptions().center;
    },
    
    applyGeo: function(config) {
        if(typeof(config) == 'boolean'){
            config = {autoLoad: config};
        }
        return Ext.factory(config, Ext.util.GeoLocation, this.getGeo());
    },

    updateGeo: function(newGeo, oldGeo) {
        var events = {
            locationupdate : 'onGeoUpdate',
            locationerror : 'onGeoError',
            scope : this
        };

        if (oldGeo) {
            oldGeo.un(events);
        }

        if (newGeo) {
            newGeo.on(events);
            if(newGeo.autoLoad){
                newGeo.updateLocation();
            }
        }
    },

    doResize: function() {
        var map = this.getMap();
        if (map) {
            map.updateSize();
        }
    },

    // @private
    renderMap: function() {
        var me = this,
            element = me.element,
            mapOptions = me.getMapOptions(),
            layers = [],
            event;
        
        if(!mapOptions.baseLayer && this.options.defaultBaseLayer){
            layers[0] = this.options.defaultBaseLayer;
        } else {
            layers[0] = mapOptions.baseLayer;
        }
        
        var defaultCenter = OpenLayers.LonLat.fromArray([39.290555, -76.609604]);
        if(!mapOptions.projection){
            defaultCenter.transform("EPSG:4326","EPSG:3857");
        } else if (["CRS:84", "urn:ogc:def:crs:EPSG:6.6:4326", "EPSG:4326"].indexOf(mapOptions.projection) == -1){
            defaultCenter.transform("EPSG:4326", mapOptions.projection);
        }

        mapOptions = Ext.merge({
            layers : layers,
            zoom : this.getZoomLevel() || 12,
            maxZoom : 18,
            center : this.getCenter() || defaultCenter,
            projection: 'EPSG:3857'
        }, mapOptions);

        var map = new OpenLayers.Map(element.id, mapOptions);
        map.events.on({
            'moveend': function(evt){
                if(evt.zoomChanged){
                    this.onZoomChange();
                }
                this.onCenterChange();
            },
            scope: this
        });
        
        this.setMap(map);
        
        me.fireEvent('maprender', me, this.map);
    },

    // @private
    onGeoUpdate: function(geo) {
        if (geo) {
            this.setMapCenter([geo.getLongitude(), geo.getLatitude()]);
        }
    },

    // @private
    onGeoError: Ext.emptyFn,

    /**
     * Moves the map center to the designated coordinates hash of the form:
     *
     *     { latitude: 39.290555, longitude: -76.609604 }
     *
     * or a OpenLayers.LonLat object representing to the target location.
     *
     * @param {Object/OpenLayers.LonLat} coordinates Object representing the desired Latitude and
     * longitude upon which to center the map.
     * @param {String/OpenLayers.Projection} proj (Optional) Project code or object MUST be passed
     * if you are not using WGS84 decimal degree coordinates.
     */
    setMapCenter: function(coordinates, proj) {
        var me = this,
            map = me.getMap();

        if (coordinates) {
            if (!me.isPainted()) {
                me.un('painted', 'setMapCenter', this);
                me.on('painted', 'setMapCenter', this, { single: true, args: [coordinates] });
                return;
            }

            if (!(coordinates instanceof OpenLayers.LonLat) && 'longitude' in coordinates) {
                coordinates = new OpenLayers.LonLat(coordinates.longitude, coordinates.latitude);
            }
        }
        
        if (map && coordinates instanceof OpenLayers.LonLat) {
            //test for a passed projection or a map that is not in "Geographic" coordinates
            if(proj || ["CRS:84", "urn:ogc:def:crs:EPSG:6.6:4326", "EPSG:4326"].indexOf(map.getProjection()) == -1){
                coordinates.transform("EPSG:4326", map.getProjectionObject());
            }
            map.setCenter(coordinates, this.getZoomLevel());
        }
        else {
            this.options = Ext.apply(this.getMapOptions(), {
                center: coordinates
            });
            if (!map) {
                me.renderMap();
            }
        }
    },
    
    updateZoomLevel: function(newZoom){
        var me = this,
            map = me.getMap();
            
        if(newZoom || newZoom === 0){
            if(map && map.setCenter){
                map.setCenter(this.getMapCenter(), newZoom);
            } else {
                this.options = Ext.apply(this.getMapOptions(), {
                    zoom: newZoom
                });
                if(!map){
                    me.renderMap();
                }
            }
        }
    },

    // @private
    onZoomChange : function() {
        var mapOptions = this.getMapOptions(),
            map = this.getMap(),
            zoom;

        zoom = (map && map.getZoom) ? map.getZoom() : mapOptions.zoom || 10;

        this.options = Ext.apply(mapOptions, {
            zoom: zoom
        });
        
        this.fireEvent('zoomchange', this, map, zoom);
    },

    // @private
    onCenterChange: function() {
        var mapOptions = this.getMapOptions(),
            map = this.getMap(),
            center;

        center = (map && map.getCenter) ? map.getCenter() : mapOptions.center;

        this.options = Ext.apply(mapOptions, {
            center: center
        });

        this.fireEvent('centerchange', this, map, center);

    },
    
    // @private
    buildDefaultBaseLayer: function(type){
        switch(type){
            case 'OSM':
                this.options.defaultBaseLayer = new OpenLayers.Layer.OSM();
                break;
            case 'MapBox':
                this.options.defaultBaseLayer = new OpenLayers.Layer.XYZ(
                    "MapBox Streets",
                    [
                        "http://a.tiles.mapbox.com/v3/mapbox.mapbox-streets/${z}/${x}/${y}.png",
                        "http://b.tiles.mapbox.com/v3/mapbox.mapbox-streets/${z}/${x}/${y}.png",
                        "http://c.tiles.mapbox.com/v3/mapbox.mapbox-streets/${z}/${x}/${y}.png",
                        "http://d.tiles.mapbox.com/v3/mapbox.mapbox-streets/${z}/${x}/${y}.png"
                    ], {
                        attribution: "Tiles &copy; <a href='http://mapbox.com/'>MapBox</a> | " + 
                            "Data &copy; <a href='http://www.openstreetmap.org/'>OpenStreetMap</a> " +
                            "and contributors, CC-BY-SA",
                        sphericalMercator: true,
                        wrapDateLine: true,
                        transitionEffect: "resize",
                        buffer: 1,
                        numZoomLevels: 17
                    }
                );
                break;
            case 'CloudMade':
                this.options.defaultBaseLayer = new OpenLayers.Layer.XYZ(
                    "CloudMade Streets",
                    [
                        "http://a.tile.cloudmade.com/1949b63ce25444e182f69658b5904f98/997/256/{z}/{x}/{y}.png",
                        "http://b.tile.cloudmade.com/1949b63ce25444e182f69658b5904f98/997/256/{z}/{x}/{y}.png",
                        "http://c.tile.cloudmade.com/1949b63ce25444e182f69658b5904f98/997/256/{z}/{x}/{y}.png"
                    ], {
                        attribution: "Tiles &copy; <a href='http://cloudmade.com/'>CloudMade/a> | " + 
                            "Data &copy; <a href='http://www.openstreetmap.org/'>OpenStreetMap</a> " +
                            "and contributors, CC-BY-SA",
                        sphericalMercator: true,
                        wrapDateLine: true,
                        transitionEffect: "resize",
                        buffer: 1,
                        numZoomLevels: 17
                    }
                );
                break;            
            case false:
                this.options.defaultBaseLayer = null;
                break;
            default:
                this.options.defaultBaseLayer = new OpenLayers.Layer.XYZ(
                    "Base Layer",
                    type, 
                    {
                        sphericalMercator: true,
                        wrapDateLine: true,
                        transitionEffect: "resize",
                        buffer: 1,
                        numZoomLevels: 17
                    }
                );
                break;
        }
    },

    // @private
    destroy: function() {
        Ext.destroy(this.getGeo());
        this.callParent();
    }
});