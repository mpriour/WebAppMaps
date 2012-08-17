// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 
//
// Project: map
// Controller: FilterController
// ==========================================================================

map.FilterController = M.Controller.extend({

    /* sample controller property */
    yearItems: null,
    mediaItems: null,

    /*
    * Sample function
    * To handle the first load of a page.
    */
    init: function(isFirstLoad) {
        if(isFirstLoad) {
            /* do something here, when page is loaded the first time. */
           this.loadYearItems();
           this.loadMediaItems();
           map.ClosuresModel.find();
        }
        /* do something, for any other load. */
    },

    /*
     * EVENT HANDLERS
     * Functions are triggered by setting target & action in a view.
     */
    //select field handlers
    onSymbolSelectChange: function(value, item){
        
    },
    onYearSelectChange: function(value, item){
        
    },
    onMediaSelectChange: function(value, item){
        
    },
    //button handlers
    showOpenLayersViewer: function() {
        /* switch to a page defined as 'openLayersMap' in the main.js file */
        this.switchToPage('openLayersMap');
    },
    
    /*
     * Data-bound item loaders & handlers
     */
    loadYearItems: function(){
        M.Request.init({
            url: 'years.json',
            method: 'GET',
            isJSON: true,
            callbacks:{
                success: {
                    target: this,
                    action: this.buildYearItems
                }
            }
        }).send();
    },
    
    loadMediaItems: function(){
        M.Request.init({
            url: 'media.json',
            method: 'GET',
            isJSON: true,
            callbacks:{
                success: {
                    target: this,
                    action: this.buildMediaItems
                }
            }
        }).send();        
    },
    
    buildYearItems: function(data, msg, req){
        this.set('yearItems', this.expandArray(data));
    },
    
    buildMediaItems: function(data, msg, req){
        this.set('mediaItems', this.expandArray(data));
    },
    
    expandArray: function(list){
        var arr = [];
        for(var i=0,len=list.length;i<len;i++){
            arr[i] = {label: list[i], value: list[i]};
        }
        return arr;
    }
});
