Ext.define('map.controller.MapPanel', {
    extend: 'Ext.app.Controller',
    requires: ['map.view.MapPanel'],
    config: {
        refs: {
            'form': 'FilterForm',
            'popup': 'InfoPopup'
        },
        control: {
            '#btnBackFilter': {
                'tap': 'onBackButtonTap'
            }
        }
    },
    onBackButtonTap: function(btn, evt){
        var form = this.getForm();
        var popup = this.getPopup();
        if(form){
            Ext.Viewport.setActiveItem(form);
        }
        if(popup){
            popup.hide();
        }
    }
});
