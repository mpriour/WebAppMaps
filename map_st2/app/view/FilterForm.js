Ext.define("map.view.FilterForm", {
    extend: "Ext.Panel",
    requires: ['Ext.field.Select', 'Ext.form.FieldSet', 'Ext.data.reader.Array', 'Ext.Button'],
    alias: 'widget.FilterForm',
    config: {
        items: [{
            xtype: 'fieldset',
            title: 'Symbolize By',
            items: [{
                id: 'selectSymbol',
                xtype: 'selectfield',
                options: [{
                    text: 'Decade',
                    value: 'decade'
                }, {
                    text: 'Media',
                    value: 'media'
                }, {
                    text: 'Container',
                    value: 'container'
                }]
            }]
        }, {
            xtype: 'fieldset',
            title: 'Filter By Year',
            items: [{
                id: 'selectYearFilter',
                xtype: 'selectfield',
                store: 'Years',
                displayField: 'year',
                valueField: 'year'
            }]
        }, {
            xtype: 'fieldset',
            title: 'Filter By Media',
            items: [{
                id: 'selectMediaFilter',
                xtype: 'selectfield',
                store: 'Media',
                displayField: 'media',
                valueField: 'media'
            }]
        }, {
            xtype: 'fieldset',
            title: 'View Result In',
            layout: {
                type: 'hbox'
            },
            defaults: {
                flex: 1
            },
            items: [{
                xtype: 'spacer'
            }, {
                id: 'btnLeafletViewer',
                xtype: 'button',
                text: 'Leaflet',
                disabled: true,
                flex: 3
            }, {
                xtype: 'spacer'
            }, {
                id: 'btnOpenLayersViewer',
                xtype: 'button',
                text: 'OpenLayers',
                flex: 3
            }, {
                xtype: 'spacer'
            }]
        }]
    }
});
