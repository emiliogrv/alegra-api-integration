Ext.define('App.controller.ClientController', {
    extend: 'Ext.app.Controller',

    init: function (application) {
        let pathname = location.pathname;

        if (/\/clients\/details\/id/.test(pathname)) {
            details()
        } else if (/\/clients\/add/.test(pathname)) {
            add()
        } else if (/\/clients\/edit\/id/.test(pathname)) {
            edit()
        } else {
            index()
        }

        function index() {
            Ext.require('App.store.Client', function () {
                Ext.require('App.view.client.Index', function () {
                    let uri = URI(window.location.href)
                    let type = '?type=' + (uri.hasSearch('type') ? uri.search(true).type : null)

                    let store = Ext.create('App.store.Client', {
                        pageSize: 20,
                        proxy: {
                            url: '/api-v1-clients' + type,
                            reader: {
                                rootProperty: 'data',
                                totalProperty: 'metadata.total'
                            },
                        },
                    })

                    Ext.create('App.view.client.Index', {
                        store: store,
                    })
                })
            })
        }

        function details() {
            Ext.require('App.view.client.Detail', function () {
                Ext.create('App.view.client.Detail')
            })
        }

        function add() {
            Ext.require('App.view.client.Edit', function () {
                Ext.create('App.view.client.Edit')
            })
        }

        function edit() {
            Ext.require('App.store.Client', function () {
                Ext.require('App.view.client.Edit', function () {
                    let form = Ext.create('App.view.client.Edit')

                    let id = location.pathname.split('/')[4]
                    Ext.create('App.store.Client', {
                        proxy: {
                            url: '/api-v1-clients/' + id,
                        },
                        autoLoad: {
                            callback: function (records, operation, success) {
                                if (success) {
                                    form.getForm().loadRecord(records.pop())
                                } else {
                                    Ext.Msg.alert('Error', 'Página o recurso no encontrado', function () {
                                        window.history.back()
                                    })
                                }
                            }
                        }
                    })
                })
            })
        }



        Ext.create('Ext.form.Panel', {
            renderTo: Ext.get('aqsi'),
            title: 'Simple Form',
            bodyPadding: 5,
            width: 350,

            // The form will submit an AJAX request to this URL when submitted
            url: '/api-v1-clients',

            // Fields will be arranged vertically, stretched to full width
            layout: 'anchor',
            defaults: {
                anchor: '100%'
            },

            // The fields
            defaultType: 'textfield',
            items: [{
                fieldLabel: 'First Name',
                name: 'first',
                allowBlank: false
            }, {
                fieldLabel: 'Last Name',
                name: 'last',
                allowBlank: false
            }],

            // Reset and Submit buttons
            buttons: [{
                text: 'Reset',
                handler: function () {
                    this.up('form').getForm().reset();
                }
            }, {
                text: 'Submit',
                formBind: true, //only enabled once the form is valid
                disabled: true,
                handler: function () {
                    var form = this.up('form').getForm();
                    if (form.isValid()) {
                        form.submit({
                            success: function (form, action) {
                                Ext.Msg.alert('Success', action.result.msg);
                            },
                            failure: function (form, action) {
                                Ext.Msg.alert('Failed', action.result.msg);
                            }
                        });
                    }
                }
            }],
        });
    }
})
