Ext.define('map.controller.FilterForm', {
    extend: 'Ext.app.Controller',
    require: ['map.store.Closures'],
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
        var store = Ext.getStore('closures');
        if(store){
            if(value == 'All'){
                store.clearFilter();
            } else {
                store.clearFilter(true);
                store.filterBy(function(rec){
                    return rec.get('closed').getUTCFullYear() == +value;
                });
            }
        }
    },
    
    onMediaFilterChange: function(field, value){
        var store = Ext.getStore('closures');
        if(store){
            if(value == 'All'){
                store.clearFilter();
            } else {
                store.clearFilter(true);
                store.filter('media',value);
            }
        }
    },
    
    showOpenLayersMap: function(btn, evt){
        var mappanel = this.getMapPanel();
        if(!mappanel){
            mappanel = Ext.Viewport.add(Ext.create('MapPanel'));
        }
        Ext.Viewport.setActiveItem(mappanel);
    }
});           
