Ext.define('map.JsonP',{
    requires: ['Ext.data.JsonP'],
    override: 'Ext.data.JsonP',
    callbackPrefix: 'callback:',
    callbackKey: 'format_options',
    createScript: function(url, params, options){
       if(this.callbackPrefix && params[this.callbackKey]){
           params[this.callbackKey] = this.callbackPrefix + params[this.callbackKey]; 
       }
       this.callParent(arguments);
    }
});
