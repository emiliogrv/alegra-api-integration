Ext.require('App.model.Client', function () {
    Ext.define('App.store.Client', {
        extend: 'Ext.data.Store',
        model: 'App.model.Client',
        autoLoad: true,
        proxy: {
            type: 'ajax',
            url: '/api-v1-clients/',
            reader: {
                type: 'json',
            },
        },
    })
})
