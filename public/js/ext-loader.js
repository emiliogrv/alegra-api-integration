Ext.onReady(function () {
    let controllers = []
    let appFolder = location.origin + '/js'
    let pathname = location.pathname;

    if (/\/clients/.test(pathname)) {
        controllers = [
            'ClientController'
        ]
    }

    Ext.application({
        controllers: controllers,
        name: 'App',
        appFolder: appFolder
    })
})
