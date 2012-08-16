Ext.define('map.controller.MapPanel', {
    extend: 'Ext.app.Controller',
    requires: ['map.view.MapPanel'],
    config: {
        refs: {
            'form': 'FilterForm'
        },
        control: {
            '#btnBackFilter': {
                'tap': 'onBackButtonTap'
            }
        }
    },
    onBackButtonTap: function(btn, evt){
        var form = this.getForm();
        if(form){
            Ext.Viewport.setActiveItem(form);
        }
    }
});
