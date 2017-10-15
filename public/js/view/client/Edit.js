let uri = URI(window.location.href)
let type = (uri.hasSearch('type') ? uri.search(true).type : 1)

Ext.define('App.view.client.Edit', {
    extend: 'Ext.form.Panel',
    renderTo: Ext.get('client-form'),
    bodyPadding: 30,
    style: 'margin-bottom:10px',
    height: 320,
    defaults: {
        anchor: '45%',
        xtype: 'textfield',
        labelAlign: 'right',
        msgTarget: 'side',
        allowBlank: true,
        style: 'float: left; margin-left: 50px',
        labelWidth: 140,
    },
    listeners: {
        afterrender: function () {
            let form = this

            Ext.create('Ext.tip.ToolTip', {
                target: Ext.get('tooltip-price-list'),
                html: 'Selecciona la lista de precios que deseas asociar a este cliente',
                dismissDelay: 0,
                showDelay: 0,
            })
            Ext.create('Ext.tip.ToolTip', {
                target: Ext.get('tooltip-seller'),
                html: 'Selecciona el vendedor que deseas asociar a este cliente',
                dismissDelay: 0,
                showDelay: 0,
            })
            Ext.create('Ext.tip.ToolTip', {
                target: Ext.get('tooltip-statement-attached'),
                html: 'Tu cliente recibirá en cada factura su estado de cuenta',
                dismissDelay: 0,
                showDelay: 0,
            })
            this.body.insertHtml("beforeEnd", '<div id="required-field-text"><p>Los campos marcados con <span class="error">*</span> son obligatorios</p></div>')
        }
    },

    items: [{
        fieldLabel: 'Nombre <span class="error">*</span>',
        name: 'name',
        allowBlank: false,
    }, {
        xtype: 'combo',
        name: 'priceList',
        emptyText: 'Seleccionar',
        fieldLabel: '<span>Lista de precios<img id="tooltip-price-list" class="help-form" src="/img/help.png"></span>',
        store: [
            { id: -1, name: 'Ninguno' },
            { id: 1, name: 'General' },
        ],
        valueField: 'id',
        displayField: 'name',
        editable: false,
    }, {
        fieldLabel: 'Identificación',
        name: 'identification',
    }, {
        xtype: 'combo',
        name: 'seller',
        emptyText: 'Seleccionar',
        fieldLabel: 'Vendedor',
        fieldLabel: '<span>Vendedor<img id="tooltip-seller" class="help-form" src="/img/help.png"></span>',
        store: [
            { id: -1, name: 'Ninguno' },
        ],
        valueField: 'id',
        displayField: 'name',
        editable: false,
    }, {
        fieldLabel: 'Dirección',
        emptyText: 'Dirección',
        name: 'address',
        anchor: '31%',
    }, {
        emptyText: 'Ciudad',
        name: 'city',
        anchor: '14%',
        style: 'margin-left: 10px; float: left',
    }, {
        xtype: 'combo',
        name: 'term',
        emptyText: 'Seleccionar',
        fieldLabel: 'Términos de pago',
        tooltip: 'Selecciona el vendedor que deseas asociar a este cliente',
        store: [
            { id: -1, name: 'Vencimiento manual' },
            { id: 1, name: 'De contado' },
            { id: 2, name: '8 días' },
            { id: 3, name: '15 días' },
            { id: 4, name: '30 días' },
            { id: 5, name: '60 días' },
        ],
        valueField: 'id',
        displayField: 'name',
        editable: false,
    }, {
        fieldLabel: 'Correo electrónico',
        name: 'email',
        regex: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
    }, {
        xtype: 'checkbox',
        name: 'isClient',
        inputValue: 'yes',
        fieldLabel: 'Cliente',
        value: (type == 'client'),
    }, {
        fieldLabel: 'Teléfono 1',
        name: 'phonePrimary',
    }, {
        xtype: 'checkbox',
        name: 'isProvider',
        inputValue: 'yes',
        fieldLabel: 'Proveedor',
        value: (type == 'provider'),
    }, {
        fieldLabel: 'Telefóno 2',
        name: 'phoneSecondary',
    }, {
        xtype: 'textarea',
        fieldLabel: 'Observaciones',
        name: 'observations',
    }, {
        fieldLabel: 'Fax',
        name: 'fax',
        style: 'margin-left: 50px; margin-top: -36px; float: left',
    }, {
        fieldLabel: 'Celular',
        name: 'mobile',
        style: 'margin-left: 50px; margin-top: -8px; float: left',
    }, {
        xtype: 'checkboxfield',
        name: 'statementAttached',
        inputValue: 'yes',
        fieldLabel: '<span>Incluir estado de cuenta<img id="tooltip-statement-attached" class="help-form" src="/img/help.png"></span>',
        style: 'margin-left: 50px; margin-top: -8px; float: left',
    }],

    buttons: [{
        text: 'Cancelar',
        style: 'background-image: none; border: 1px white solid; text-decoration-line: underline; color: #1a5e53',
        handler: function () {
            window.history.back()
        }
    }, {
        text: 'Guardar y crear otro',
        hidden: (location.pathname.split('/')[4] !== undefined),
        formBind: true,
        disabled: true,
        handler: function () {
            let form = this.up('form').getForm()

            if (form.isValid()) {
                Ext.Ajax.request({
                    url: '/api-v1-clients/',
                    method: 'POST',
                    params: form.getValues(),
                    success: function (res) {
                        Ext.MessageBox.alert("Éxito", 'Operación realizada con éxito', function () {
                            window.location.reload()
                        });
                    },
                    failure: function (res) {
                        Ext.MessageBox.alert("Error", Ext.decode(res.responseText).message);
                    }
                })
            }
        }
    }, {
        text: 'Guardar',
        formBind: true,
        disabled: true,
        handler: function () {
            let form = this.up('form').getForm()
            let id = location.pathname.split('/')[4]
            let params = form.getValues()
            let url = '/api-v1-clients/'

            if (id) {
                url += id
                params._method = 'PUT'
            }

            if (form.isValid()) {
                Ext.Ajax.request({
                    url: url,
                    method: 'POST',
                    params: params,
                    success: function (res) {
                        window.location.href = '/clients/details/id/' + Ext.decode(res.responseText).id
                    },
                    failure: function (res) {
                        Ext.MessageBox.alert("Error", Ext.decode(res.responseText).message);
                    }
                })
            }
        }
    }]
})
