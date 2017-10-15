Ext.define('App.model.Client', {
    extend: 'Ext.data.Model',
    fields: [
        'id',
        'name',
        'identification',
        'email',
        'phonePrimary',
        'phoneSecondary',
        'fax',
        'mobile',
        'observations',
        { name: 'city', mapping: 'address.city' },
        { name: 'address', mapping: 'address.address' },
        'type',
        'seller',
        'term',
        'priceList',
        'internalContacts',
        {
            name: 'isClient', type: 'boolean', depends: ['type'], convert: function (value, record) {
                return (record.data.type.indexOf('client') > -1)
            }
        },
        {
            name: 'isProvider', type: 'boolean', depends: ['type'], convert: function (value, record) {
                return (record.data.type.indexOf('provider') > -1)
            }
        },
        { name: 'deletable', type: 'boolean', defaultValue: false },
    ],
})
