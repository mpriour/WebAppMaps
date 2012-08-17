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
            url: '../../data/year.json',
            method: 'GET',
            isJSON: true,
            callbacks:{
                success: {
                    target: this,
                    action: buildYearItems
                }
            }
        }).send();
    },
    
    loadMediaItems: function(){
        M.Request.init({
            url: '../../data/media.json',
            method: 'GET',
            isJSON: true,
            callbacks:{
                success: {
                    target: this,
                    action: buildMediaItems
                }
            }
        }).send();        
    },
    
    buildYearItems: function(data, msg, req){
        console.log(data);
    },
    
    buildMediaItems: function(data, msg, req){
        console.log(data);
    }
    
});
