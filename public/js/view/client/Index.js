Ext.define('App.view.client.Index', {
    extend: 'Ext.grid.Panel',
    renderTo: Ext.get('clients-grid'),
    minHeight: 400,
    store: null,
    listeners: {
        sortchange: function (ct, column, direction) {
            console.log(ct, column, direction)
            this.getStore().load({
                params: {
                    order_field: column.dataIndex,
                    order_direction: direction
                },
            })
        }
    },
    columns: [{
        menuDisabled: true,
        dataIndex: 'deletable',
        xtype: "checkcolumn",
        hideable: false,
        sortable: false,
        align: 'center',
        width: 30,
        text: null,
        resizable: false,
    }, {
        menuDisabled: true,
        xtype: 'templatecolumn',
        text: 'Nombre',
        dataIndex: 'name',
        hideable: false,
        tpl: "<a href='/clients/details/id/{id}'>{name}",
        flex: 1
    }, {
        menuDisabled: true,
        text: 'Identificación',
        dataIndex: 'identification',
        flex: 1
    }, {
        menuDisabled: true,
        text: 'Teléfono 1',
        dataIndex: 'phonePrimary',
        flex: 1
    }, {
        menuDisabled: true,
        text: 'Observaciones',
        dataIndex: 'observations',
        flex: 1
    }, {
        text: 'Acciones',
        xtype: 'actioncolumn',
        width: 100,
        hideable: false,
        align: 'center',
        items: [{
            icon: '/img/detail.png',
            tooltip: 'Ver',
            handler: function (grid, rowIndex, colIndex) {
                let rec = grid.getStore().getAt(rowIndex);
                location.assign("/clients/details/id/" + rec.get("id"));
            }
        }, {
            icon: '/img/edit.png',
            tooltip: 'Editar',
            handler: function (grid, rowIndex, colIndex) {
                let rec = grid.getStore().getAt(rowIndex);
                location.assign("/clients/edit/id/" + rec.get("id"));
            }
        }, {
            icon: '/img/delete.png',
            tooltip: 'Eliminar',
            handler: function (grid, rowIndex, colIndex) {
                let rec = grid.getStore().getAt(rowIndex);
                Ext.Msg.show({
                    title: "Eliminar cliente",
                    msg: "¿Estás seguro de que deseas eliminar el cliente? Esta operación no se puede deshacer.",
                    buttons: Ext.Msg.YESNOCANCEL,
                    icon: Ext.Msg.QUESTION,
                    fn: function (e) {
                        if (e == "yes") {
                            Ext.Ajax.request({
                                url: '/api-v1-clients/' + rec.get("id"),
                                method: "DELETE",
                                success: function (res) {
                                    grid.getStore().load()
                                },
                                failure: function (res) {
                                    Ext.MessageBox.alert("Error", Ext.decode(res.responseText).message);
                                }
                            });
                        }
                    }
                });
            }
        }]
    }],
    dockedItems: [{
        xtype: 'pagingtoolbar',
        store: this.store,
        dock: 'bottom',
        displayInfo: true,
        displayMsg: 'Mostrando {0} - {1} de {2}',
        afterPageText: null,
        beforePageText: null,
        firstText: null,
        lastText: null,
        prevText: null,
        nextText: null,
        refreshText: null,
        emptyMsg: 'Sin datos para mostrar',
    }]
})
