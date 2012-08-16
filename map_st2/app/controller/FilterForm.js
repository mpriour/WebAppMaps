Ext.define('map.controller.FilterForm', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            'form': 'FilterForm',
            'mapPanel': 'MapPanel',
            'mapWrap': 'MapPanel map_openlayers',
            'olButton': '#btnOpenLayersViewer',
            'yearFilter': '#selectYearFilter',
            'mediaFilter': '#selectMediaFilter'
        },
        control: {
            'yearFilter': {'change': 'onYearFilterChange'},
            'mediaFilter': {'change': 'onMediaFilterChange'},
            'olButton': {'tap': 'showOpenLayersMap'}
        }
    },
    
    onSymbolizerChange: function(field, value){
        if(this.getMapWrap()){
            var map = this.getMapWrap();
            map.fireEvent('symbolizerchange', field, value);
        }
    },
    
    onYearFilterChange: function(field, value){
    },
    
    onMediaFilterChange: function(field, value){
    },
    
    showOpenLayersMap: function(btn, evt){
        var mappanel = this.getMapPanel();
        if(!mappanel){
            mappanel = Ext.Viewport.add(Ext.create('MapPanel'));
        }
        Ext.Viewport.setActiveItem(mappanel);
    }
});           
