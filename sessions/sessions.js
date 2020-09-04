const { app, BrowserWindow, session, webContents, dialog } = require('electron');

let mainWindow, secWindow;

const createWindow = () => {
    let secSession = session.fromPartition('partition1');

    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        x: 100,
        y: 100,
        webPreferences: {
            nodeIntegration: true
        }
    })

    secWindow = new BrowserWindow({
        width: 600,
        height: 400,
        x: 200,
        y: 200,
        show: false,
        webPreferences: {
            nodeIntegration: true,
            session: secSession
        }
    })


    let sessionMain = mainWindow.webContents.session;
    let sessionSec = secWindow.webContents.session;

    //  THIS RETURNS TRUE BECAUSE ELECTRON HAS A SESSION IN THE MAIN PROCESS WHICH IS 
    //  PASSED ON TO EVERY BROWSER WINDOW.

    //console.log(sessionMain === sessionSec);

    //  THE SESSION WHICH IS SHARED BETWEEN WINDOWS IS THE DEFAULT SESSION:

    let defaultSession = session.defaultSession;

    // console.log(sessionMain === defaultSession);

    mainWindow.loadFile('./index.html');
    secWindow.loadFile('./index.html');

    const getCookies = async (session) => {
        const cookies = await session.cookies.get({});
        console.log(cookies);
    }

    const setCookies = async ({session, url, name, value}) => {
        const cookies = await session.cookies.set({
            url: url,
            value: value,
            name: name,
            //expirationDate: expirationDate
        })
    }

    // setCookies({
    //     session: defaultSession,
    //     url: 'https://mydomainname.com',
    //     name: 'Cookie1',
    //     value: 'Value1',
    //     //expirationDate: Date.now() + 100000
    // })

    //getCookies(defaultSession);


    mainWindow.on('closed', () => {
        mainWindow = null;
    })

    secWindow.on('closed', () => {
        secWindow = null;
    })


    //  SESSIONS ACCESS: 
    //let sessionCopy = mainWindow.webContents.session;

    //console.log(session);

    //  CLEARING COOKIES:

    // defaultSession.cookies.remove('https:///mydomainname.com', 'Cookie1')
    //                          .then(console.log('Cookie removed'))


    // mainWindow.webContents.on('did-finish-load', event => {
    //     getCookies(defaultSession);
    // })


    //  FOR DOWNLOADING EVENTS: 

    defaultSession.on('will-download', (event, downloadItem, webContents) => {
        console.log('Starting download...');
        let fileName = downloadItem.getFilename();
        let fileSize = downloadItem.getTotalBytes();

        //  SETTING THE SAVE PATH FOR THE FILE:
        downloadItem.setSavePath(`${ app.getPath('desktop') }\\doc.pdf`);
       
        //  GETTING THE SAVE PATH:
        //console.log(downloadItem.getSavePath());

        //  FOR PROGRESS BAR: WHEN THE DOWNLOAD ITEM IS UPDATED (SIZE CHANGE), DO THIS:
        downloadItem.on('updated', (event, state) => {
            let downloadedBytes = downloadItem.getReceivedBytes();

            if(state === 'progressing' && downloadedBytes) {
                let percentage = parseInt( (downloadedBytes / fileSize) * 100 );
                //console.log(percentage);
                webContents.executeJavaScript(
                    `document.getElementById('progress').value = ${ percentage }`
                ).then();
            }
        });
    })

    // mainWindow.webContents.on('did-finish-load', () => {
    //     dialog.showOpenDialog(mainWindow, {
    //         buttonLabel: 'Select a file',
    //         defaultPath: app.getPath('home'),
    //         filters: [
    //             { name: 'Images', extensions: [ 'jpg', 'jpeg', 'png', 'gif' ] },
    //             { name: 'document', extensions: [ 'pdf', 'doc', 'docx' ] },
    //             { name: 'All Files', extensions: ['*'] }
    //         ],
    //         properties: ['openFile', 'multiSelections']
    //     }).then(response => {
    //         console.log(response);
    //     })
    // })

    const optionButtons = [ 'YES', 'NO' ]

    mainWindow.on('close', (e) => {
        const result = dialog.showMessageBoxSync(mainWindow, {
            type: 'question',
            buttons: optionButtons,
            defaultId: 0,
            title: 'Quit?',
            message: 'Sure to quit?',
            cancelId: 1,
        });
        if(result === 1) {
            e.preventDefault();
        }
    })

}


app.on('ready', () => {
    createWindow();
})