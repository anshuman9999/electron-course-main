const {app, BrowserWindow} = require('electron');

// setTimeout(() => {
//     console.log(`Checking if app is ready: ${ app.isReady() }`);
// }, 1000);

let mainWindow, secondaryWindow, thirdWindow;

const createMainWindow = () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
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
        // show: false
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
