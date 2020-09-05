const menu = [
    // {
    //     label: 'File',
    //     submenu: [
    //         {
    //             label: 'Greet',
    //             click: () => console.log('Hello from the app!'),
    //             accelerator: 'CmdOrCtrl+G',
    //             //enabled: false
    //         }
    //     ]
    // },
    { role: 'fileMenu' },
    { role: 'viewMenu' },



    //  EDIT MENU CUSTOM: 

    // {
    //     label: 'Edit',
    //     submenu: [
    //         {role: 'undo'},
    //         {role: 'copy'},
    //         {role: 'cut'},
    //         {role: 'paste'},
    //         {role: 'redo'}
    //     ]
    // },

    //   EDIT MENU SHORTCUT WITH JUST ONE ROLE (AWESOME!)

    { role: 'editMenu' },

    {
        label: 'Actions',
        submenu: [
            {
                label: 'Toggle dev tool',
                role: 'toggleDevTools',
                accelerator: 'F11'
            },
            {
                role: 'toggleFullScreen',
                accelerator: 'F12'
            },
            {
                label: 'action3'
            }
        ]
    }
]

module.exports = menu;