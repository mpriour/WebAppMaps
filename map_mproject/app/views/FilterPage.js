map.FilterPage = M.PageView.design({
    /* Use the 'events' property to bind events like 'pageshow' */
    events: {
        pageshow: {
            target: map.FilterController,
            action: 'init'
        }
    },
    
    childViews: 'header content',

    header: M.ToolbarView.design({
        value: 'NV Facility Closures Viewer',
        anchorLocation: M.TOP
    }),

    content: M.FormView.design({
        childViews: 'symbolSelect yearSelect mediaSelect buttonGroup',
        symbolSelect: M.SelectionListView.design({
            childViews: 'item1 item2 item3',
            isGrouped: true,
            selectionMode: M.SINGLE_SELECTION_DIALOG,
            label: 'Symbolize By',
            item1: M.SelectionListItemView.design({
                value: 'decade',
                label: 'Decades',
                isSelected: YES
            }),
            item2: M.SelectionListItemView.design({
                value: 'media',
                label: 'Media'
            }),
            item3: M.SelectionListItemView.design({
                value: 'container',
                label: 'Container'
            }),
            events: {
                'change': {
                    target: map.FilterController,
                    action: 'onSymbolSelectChange'
                }
            }
        }),
        yearSelect: M.SelectionListView.design({
            isGrouped: true,
            selectionMode: M.SINGLE_SELECTION_DIALOG,
            label: 'Filter By Year',
            contentBinding: {
                target: map.FilterController,
                property: 'yearItems'
            },
            events: {
                'change': {
                    target: map.FilterController,
                    action: 'onYearSelectChange'
                }
            }
        }),
        mediaSelect: M.SelectionListView.design({
            isGrouped: true,
            selectionMode: M.SINGLE_SELECTION_DIALOG,
            label: 'Filter By Media',
            contentBinding: {
                target: map.FilterController,
                property: 'mediaItems'
            },
            events: {
                'change': {
                    target: map.FilterController,
                    action: 'onMediaSelectChange'
                }
            }
        }),
        buttonGroup: M.ButtonGroupView.design({
            childViews: 'leafletBtn openlayersBtn',
            isGrouped: true,
            label: 'View Results In',
            leafletBtn: M.ButtonView.design({
                value: 'Leaflet',
                disabled: true,
                events: {
                    'tap': {
                        target: map.FilterController,
                        action: 'showLeafletViewer'
                    }
                }
            }),
            openlayersBtn: M.ButtonView.design({
                value: 'OpenLayers',
                events: {
                    'tap': {
                        target: map.FilterController,
                        action: 'showOpenLayersViewer'
                    }
                }
            })
        })
    })
});
