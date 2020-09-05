const { app, BrowserWindow, Menu, Tray } = require('electron');
const windowStateKeeper = require('electron-window-state');
const menu = require('./menu');

// setTimeout(() => {
//     console.log(`Checking if app is ready: ${ app.isReady() }`);
// }, 1000);

let mainWindow, secondaryWindow, thirdWindow;

let tray;

const createTray = () => {
    tray = new Tray('./trayTemplate@2x.png')
    tray.setToolTip('Tray details')
    //tray.setContextMenu(Menu.buildFromTemplate([{ label: 'file' }]))

    tray.on('click', (e) => {

        if(e.shiftKey) {
            app.quit();
        } else {
            mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
        }

        //tray.setContextMenu(Menu.buildFromTemplate([{role: 'quit' }]))

    })

    tray.on('right-click', () => {
        tray.setContextMenu(Menu.buildFromTemplate([ { role: 'quit' } ]))
    })

}

let contextMenu = Menu.buildFromTemplate([
    { label: 'action1' },
    { role: 'editMenu'}
])

const createMainWindow = () => {

    createTray();

    // WINDOW STATE MANAGER:  
    let winState = windowStateKeeper({
        defaultHeight: 600,
        defaultWidth: 800
    })

    mainWindow = new BrowserWindow({
        width: winState.width,
        height: winState.height,
        x: winState.x,
        y: winState.y,
        // SHOWING WINDOW GRACEFULLY: SECOND METHOD (SETTING THE BG COLOR OF THE WINDOW)
        backgroundColor: 'white',
        // show: false
        webPreferences: {
            nodeIntegration: true,
        },
        //frame: false,
        minWidth: 200,
        minHeight: 200
    })

    secondaryWindow = new BrowserWindow({
        width: 500,
        height: 400,
        // SHOWING WINDOW GRACEFULLY: SECOND METHOD (SETTING THE BG COLOR OF THE WINDOW)
        backgroundColor: 'white',
        // show: false
        webPreferences: {
            nodeIntegration: true,
        },
        // SETTING THE PARENT TO MAINWINDOW
        parent: mainWindow,
        modal: true,
        show: false
    })

    thirdWindow = new BrowserWindow({
        width: 500,
        height: 400,
        // SHOWING WINDOW GRACEFULLY: SECOND METHOD (SETTING THE BG COLOR OF THE WINDOW)
        backgroundColor: 'white',
        show: false,
        webPreferences: {
            nodeIntegration: true,
        },
        //frame: false,
        minWidth: 200,
        minHeight: 200,
        // modal: true,
        // parent: mainWindow
    })

    //  LOAD FILE IN THE MAIN WINDOW: 
    mainWindow.loadFile('./index.html');
    secondaryWindow.loadFile('./secondary.html');
    thirdWindow.loadFile('./index.html');


    // mainWindow.loadURL('https://httpbin.org/basic-auth/user/passwd');

    //  SHOWING WINDOW GRACEFULLY:  FIRST METHOD
    // mainWindow.once('ready-to-show', mainWindow.show);

    // EXAMPLE: SHOW A SECONDARY MODAL WINDOW AFTER TWO SECONDS AND CLOSE IT AFTER THREE SECONDS: 

    // setTimeout(() => {
    //     secondaryWindow.show();
    //     setTimeout(() => {
    //         secondaryWindow.close()
    //         secondaryWindow = null
    //     }, 3000)  
    // }, 2000)


    //  WHEN THE MAINWINDOW IS CLOSED: 
    mainWindow.on('closed', () => {
        mainWindow = null;
    })

    thirdWindow.on('closed', () => {
        thirdWindow = null;
    })

    // thirdWindow.on('focus', () => {
    //     console.log('Third window Focused!');
    // })

    // mainWindow.on('focus', () => {
    //     console.log('Main window Focused!');
    // })

    // thirdWindow.on('blur', () => console.log('Third Window Unfocused!'))
    // mainWindow.on('blur', () => console.log('Main Window Unfocused!'))

    //   RETURNS ALL THE BrowserWindow INSTANCES: 

    // console.log(BrowserWindow.getAllWindows());


    //  WINDOW ID'S: 
    // console.log(mainWindow.id);  // 1
    // console.log(secondaryWindow.id);  // 2
    // console.log(thirdWindow.id); // 3

    winState.manage(mainWindow);

    let wc = mainWindow.webContents;
    // console.log(wc);

    // wc.on('did-finish-load', () => {
    //     console.log('Content fully loaded!');
    // })

    // wc.on('dom-ready', () => {
    //     console.log('DOM Ready!');
    // })

    // wc.on('new-window', (event, url) => {
    //     event.preventDefault();
    //     console.log(`Creating a new window for: ${ url }`);
    // })


    //  FOR ANY KEYBOARD INPUT ON THE MAINWINDOW, BEFORE THE INPUT IS ACTUALLY DONE, DO THIS:

    // wc.on('before-input-event', (event, input) => {
    //     console.log(`${input.key}: ${input.type}`);
    // })

    wc.on('context-menu', (event, params) => {
        // console.log(`Context menu opened on: ${params.mediaType} at x: ${params.x}, y: ${params.y} `)
        // console.log(`User selected text: ${params.selectionText}`);
        // console.log(`Can selection be copied: ${params.editFlags.canCopy}`);

        // let selectedText = params.selectionText;
        // wc.executeJavaScript(`${ selectedText }`)
        //     .then(response => console.log(response));

        contextMenu.popup(mainWindow);

    });

    // ###################################################

    //  CHECKING FOR BASIC AUTH: FIRST THE LOGIN EVENT IS FIRED AT THE TIME OF AUTH
    //  AFTER THAT DID NAVIITE GETS EMITTED WHEN THE LOGIN IS SUCCESSFULL WITH CODE 200\
    //  REMOVE LOGIN ANMD EMIT DID NAVIGATE WITHOUT IT, IT WILL GIVE STATUS CODE AS 401 (UNAUTH)
    //  BECAUSE LOGIN WAS NOT FIRED ANS BASIC AUTH DID NOT HAPPEN.
    //  THIS IS AWESOME!

    //  CHECKING FOR BASIC AUTH USING THE LOGIN EVENT: 
    // wc.on('login', (event, request, authInfo, callback) => {
    //     console.log('Loggin in: ');
    //     callback('user', 'passwd');
    // })

    //  WHEN MAIN WINDOW IS LOADING ANY URL, WE CAN EMIT THIS EVENT BEFORE THE MAINWINDOW IS NAVIGATED TO THAT URL: 
    // wc.on('did-navigate', (event, url, statusCode, message) => {
    //     console.log(`Navigated to ${ url }, with response code: ${ statusCode }`);
    //     console.log(message);
    // });

    //  #####################################################################
}


// ELECTRON APP IS READY:  
app.on('ready', () => {
    console.log('App is ready!');

    // console.log(app.getPath('home'));
    // console.log(app.getPath('desktop'));
    // console.log(app.getPath('downloads'));
    // console.log(app.getPath('temp'));
    // console.log(app.getPath('userData'));

    createMainWindow();

    const mainMenu = Menu.buildFromTemplate(menu);
    Menu.setApplicationMenu(mainMenu);
})



//  WHEN THE APP IS FOCUSED, THE USER IS IN THE APP:
// app.on('browser-window-focus', () => {
//     console.log('App is focused!');
// })


// WHEN THE APP IS UNFOCUSED, THE USER CLICKS OUT OF THE APP OR MINIMIZES IT, ETC: 
// app.on('browser-window-blur', () => {
//     console.log('App is unfocused!');
// })


// app.on('before-quit', (event) => {
//     console.log('Preventing the app from quitting: ');
//     event.preventDefault();
// })
