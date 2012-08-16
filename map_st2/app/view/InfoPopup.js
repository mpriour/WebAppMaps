Ext.define('map.view.InfoPopup', {
    extend: 'Ext.Panel',
    alias: 'widget.InfoPopup',
    requires: [
        'Ext.form.Panel'
    ],
    config: {
        map: null,
        data: null,
        layout: 'fit',
        id: 'popupPanel',
        width: map.util.Config.getPopupSize()[0],
        height: map.util.Config.getPopupSize()[1],
        xy: null,
        centered: true,
        modal: false,
        styleHtmlContent: true,
        tpl: new Ext.XTemplate(map.util.Config.getPopupTpl())
    },
    updateXy: function(newXY, oldXY){
        var xy = (newXY) ? newXY : (oldXY) ? oldXY : null;
        if(xy){
            this.setTop(xy.y + map.util.Config.getPopupOffset()[1]);
            this.setLeft(xy.x + map.util.Config.getPopupOffset()[0]);
        }
    }
});