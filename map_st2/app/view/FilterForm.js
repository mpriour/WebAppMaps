Ext.define("map.view.FilterForm", {
    extend: "Ext.Panel",
    requires: ['Ext.field.Select', 'Ext.form.FieldSet', 'Ext.data.reader.Array', 'Ext.Button'],
    config: {
        items: [{
            xtype: 'fieldset',
            title: 'Symbolize By',
            items: [{
                xtype: 'selectfield',
                options: [{
                    text: 'Year',
                    value: 'years'
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
                xtype: 'selectfield',
                store: 'Years',
                displayField: 'year',
                valueField: 'year'
            }]
        }, {
            xtype: 'fieldset',
            title: 'Filter By Media',
            items: [{
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
                xtype: 'button',
                text: 'Leaflet',
                flex: 3
            }, {
                xtype: 'spacer'
            }, {
                xtype: 'button',
                text: 'OpenLayers',
                flex: 3
            }, {
                xtype: 'spacer'
            }]
        }]
    }
});
