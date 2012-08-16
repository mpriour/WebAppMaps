Ext.define('SFenforce.controller.InfoPopup', {
    extend: 'Ext.app.Controller',
    requires: ['map.view.InfoPopup'],
    config: {
        refs: {
            popup: 'InfoPopup'
        },

        control: {
            popup: {
                hide: 'onHide',
                show: 'onShow'
            }
        }
    },
    onHide: function() {
        var popup = this.getPopup();
        if(!popup._silent) {
            var ctrl = popup.getMap().getControlsByClass('OpenLayers.Control.SelectFeature')[0];
            ctrl.unselectAll();
        }
    },
    onShow: function() {
        var popup = this.getPopup();
        var map = popup.getMap().getMap();
        var mapBox = Ext.fly(map.div).getBox(true);
        //assumed viewport takes up whole body element of map panel
        var popupPos = [popup.getLeft(), popup.getTop()];
        popupPos[0] -= mapBox.x;
        popupPos[1] -= mapBox.y;
        var panelSize = [mapBox.width, mapBox.height];
        // [X,Y]
        var popupSize = [popup.getWidth(), popup.getHeight()];
        var newPos = [popupPos[0], popupPos[1]];
        //For now, using native OpenLayers popup padding.  This may not be ideal.
        var padding = map.paddingForPopups;
        // X
        if(popupPos[0] < padding.left) {
            newPos[0] = padding.left;
        } else if(popupPos[0] + popupSize[0] > panelSize[0] - padding.right) {
            newPos[0] = panelSize[0] - padding.right - popupSize[0];
        }
        // Y
        if(popupPos[1] < padding.top) {
            newPos[1] = padding.top;
        } else if(popupPos[1] + popupSize[1] > panelSize[1] - padding.bottom) {
            newPos[1] = panelSize[1] - padding.bottom - popupSize[1];
        }
        var dx = popupPos[0] - newPos[0];
        var dy = popupPos[1] - newPos[1];
        map.pan(dx, dy);
        popup.setLeft(newPos[0] + mapBox.x);
        popup.setTop(newPos[1] + mapBox.y);
    }
});