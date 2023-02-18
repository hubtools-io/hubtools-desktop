/* eslint global-require: off, no-console: off, promise/always-return: off */
import {
    app,
    BrowserWindow,
    shell,
    dialog,
    ipcMain,
    Rectangle,
} from 'electron';
import fs from 'fs';
import path from 'path';
import glob from 'fast-glob';
import chokidar, { FSWatcher } from 'chokidar';
import log from 'electron-log';
import Store from 'electron-store';
import { autoUpdater } from 'electron-updater';
import MenuBuilder from './menu';
import { getFileExtension, resolveHtmlPath } from './util';

type DirectoryPath = string;

// GLOBAL VARIABLES
const STORE = new Store();
let MAIN_WINDOW: BrowserWindow | null = null;

let DIRECTORY_ACTIVE = null as string | null;
let DIRECTORY_WATCHER = null as FSWatcher | null;
let DIRECTORY_WATCHER_READY = false;
let DIRECTORY_EXPAND = null as DirectoryPath[] | null;

let FILE_ACTIVE = null as string | null;

// There is an error with React DevTools in electron development mode.
// This is placed here temporarily until fix is available.
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true';

/*
 * MESSAGE MANAGER
 * --------------------------------------------------------------------
 * Message: Send Message
 *   Sends a message to the frontend UI.
 */
const sendMessage = (text: string, autoDismiss: boolean) => {
    if (!MAIN_WINDOW) {
        return;
    }

    MAIN_WINDOW?.webContents.send('message:receive', {
        autoDismiss,
        text,
    });
};

/*
 * APP UPDATER MANAGER
 * --------------------------------------------------------------------
 * AppUpdater: Checking for update
 *   Checks to a new application update
 *
 * AppUpdater: Update available
 *   If a new update has been found, notifies the UI.
 *
 * AppUpdater: Update downloaded
 *   Once an update has been downloaded, notifies the UI.
 */
class AppUpdater {
    constructor() {
        log.transports.file.level = 'info';
        autoUpdater.logger = log;

        autoUpdater.on('checking-for-update', () => {
            sendMessage('Checking for app updates...', true);
        });

        autoUpdater.on('update-available', () => {
            sendMessage('New app update found.', true);
        });

        autoUpdater.on('update-downloaded', () => {
            sendMessage('New app update will be installed on exit.', true);
        });

        autoUpdater.checkForUpdatesAndNotify();

        setInterval(() => {
            autoUpdater.checkForUpdatesAndNotify();
        }, 1000 * 60 * 15);
    }
}

/*
 * FILE MANAGER
 * --------------------------------------------------------------------
 * File: Open File
 *   Opens a file from path sent from UI.
 *
 * File: Response
 *   Sends a response once a file has been opened.
 *
 * File: Save
 *   Saves content at specified path
 *
 * File: Save Response
 *   Sends a response once a file has been saved.
 */

const openFile = (filePath: any) => {
    sendMessage('Opening File...', false);

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            sendMessage('', false);
            return MAIN_WINDOW?.webContents.send('file:response', {
                data: {
                    error: {
                        message: `${err}`,
                        code: 500,
                    },
                },
            });
        }

        sendMessage('', true);

        return MAIN_WINDOW?.webContents.send('file:response', {
            data: {
                file: {
                    name: path.basename(filePath as string),
                    path: filePath,
                    contents: data,
                    extension: getFileExtension(filePath),
                },
            },
        });
    });
};

ipcMain.on('file:open', (_event: any, args: any) => {
    FILE_ACTIVE = args.filePath;

    openFile(args.filePath);
});

ipcMain.on('file:save', (event: any, args: any) => {
    sendMessage('Saving file...', false);

    fs.writeFile(args.filePath, args.contents, (err) => {
        sendMessage('', false);

        if (err) {
            return event.sender.send('file:save-response', {
                data: {
                    error: {
                        message: `${err}`,
                        code: 500,
                    },
                },
            });
        }

        return event.sender.send('file:save-response', {
            data: {
                file: {
                    name: path.basename(args.filePath as string),
                    path: args.filePath,
                    contents: args.contents,
                    extension: getFileExtension(args.filePath),
                },
            },
        });
    });
});

ipcMain.on('file:close', (_event: any) => {
    FILE_ACTIVE = null;
});

/*
 * DIRECTORY MANAGER
 * --------------------------------------------------------------------
 * Directory: Open Dialog
 *   Opens a file dialog popup to select a directory
 *
 * Directory: Response
 *   Sends a response once a directory has been opened.
 */
const retreiveDirectory = (requestType: string) => {
    const ignoreSubdirectories = [
        '**/node_modules/**',
        '**/dist/**',
        '**/.git/**',
    ];

    const matches = glob.sync([`${DIRECTORY_ACTIVE}/**/*`], {
        ignore: [...ignoreSubdirectories],
        absolute: true,
        onlyFiles: false,
        markDirectories: false,
        dot: false,
    });

    const matchingContents = [] as any;
    matches.forEach((match) => {
        matchingContents.push({
            isDirectory: fs.lstatSync(match).isFile() === false,
            path: match,
        });
    });

    sendMessage('', false);

    MAIN_WINDOW?.webContents.send('directory:response', {
        data: {
            requestType,
            directory: {
                name: path.basename(DIRECTORY_ACTIVE as string),
                path: DIRECTORY_ACTIVE,
                contents: matchingContents,
            },
        },
    });
};

const watchDirectory = (initialLoad?: boolean) => {
    sendMessage('Directory opening...', false);

    if (!DIRECTORY_ACTIVE) {
        return;
    }

    DIRECTORY_WATCHER = chokidar
        .watch(DIRECTORY_ACTIVE, {
            persistent: true,
        })
        .on('ready', () => {
            DIRECTORY_WATCHER_READY = true;
            retreiveDirectory('ready');

            if (initialLoad) {
                // If we have stored expanded directory tree
                // We should load expanded state back on launch.
                DIRECTORY_EXPAND = STORE.get('directory_expand') as any;

                setTimeout(() => {
                    if (DIRECTORY_EXPAND) {
                        MAIN_WINDOW?.webContents.send(
                            'directory:expand-response',
                            {
                                data: {
                                    expandArray: DIRECTORY_EXPAND,
                                },
                            }
                        );
                    }
                }, 500);

                // If we have stored File from last session,
                // We should load file back to state on launch.
                FILE_ACTIVE = STORE.get('file') as any;

                setTimeout(() => {
                    if (FILE_ACTIVE) {
                        openFile(FILE_ACTIVE);
                    }
                }, 1000);
            }
        })
        .on('change', (cpath: any) => {
            if (DIRECTORY_WATCHER_READY) {
                retreiveDirectory('change');
            }
        })
        .on('unlink', (cpath: any) => {
            if (DIRECTORY_WATCHER_READY) {
                retreiveDirectory('unlink');
            }
        });
};

ipcMain.on('directory:open-dialog', (event: any) => {
    if (!MAIN_WINDOW) {
        return;
    }

    const dialogTitle = 'Open HubSpot Project';
    sendMessage('Select a directory from the dialog.', false);

    dialog
        .showOpenDialog(MAIN_WINDOW, {
            properties: ['openDirectory'],
            buttonLabel: dialogTitle,
            message: dialogTitle,
        })
        .then((result) => {
            if (DIRECTORY_WATCHER) {
                DIRECTORY_WATCHER.close();
            }

            if (result.canceled || result.filePaths.length === 0) {
                sendMessage('', false);
            } else {
                DIRECTORY_ACTIVE = result.filePaths[0];

                if (!DIRECTORY_ACTIVE) {
                    return;
                }

                watchDirectory();
            }
        })
        .catch((err) => {
            sendMessage('ERROR: Directory could not be retrieved.', true);
            event.sender.send('directory:response', {
                data: {
                    error: {
                        message: `${err}`,
                        code: 500,
                    },
                },
            });
        });
});

ipcMain.on('directory:close', (_event: any) => {
    DIRECTORY_ACTIVE = null;
});

ipcMain.on('directory:expand', (event: any, expandArray: DirectoryPath[]) => {
    DIRECTORY_EXPAND = [...expandArray];
});

/*
 * TERMAL MANAGER
 * --------------------------------------------------------------------
 * Termianl: Send
 *   Terminal data from the frontend, sent to main.
 *
 * Termianl: Receive
 *   Terminal response from main, sent to frontend.
 */

const os = require('os');
const pty = require('node-pty');

const terminal = os.platform() === 'win32' ? 'powershell.exe' : 'bash';
const ptyProcess = pty.spawn(terminal, [], {
    name: 'xterm-color',
    cols: 80,
    rows: 30,
    cwd: process.env.HOME,
});

ipcMain.on('terminal:send', (_event: any, data: any) => {
    return ptyProcess.write(`${data}\n`);
});

ptyProcess.onData((data: any) => {
    if (!data.startsWith('bash')) {
        MAIN_WINDOW?.webContents.send('terminal:receive', data);
    }
});

/*
 * APP WINDOW SETUP
 * --------------------------------------------------------------------
 */
if (process.env.NODE_ENV === 'production') {
    const sourceMapSupport = require('source-map-support');
    sourceMapSupport.install();
}

const isDebug =
    process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
    require('electron-debug')();
}

const createWindow = async () => {
    app.commandLine.appendSwitch('high-dpi-support', '1');
    app.commandLine.appendSwitch('force-device-scale-factor', '1');

    const RESOURCES_PATH = app.isPackaged
        ? path.join(process.resourcesPath, 'assets')
        : path.join(__dirname, '../../assets');

    const getAssetPath = (...paths: string[]): string => {
        return path.join(RESOURCES_PATH, ...paths);
    };

    MAIN_WINDOW = new BrowserWindow({
        show: false,
        width: 1200,
        height: 900,
        icon: getAssetPath('icon.png'),
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,
            preload: app.isPackaged
                ? path.join(__dirname, 'preload.js')
                : path.join(__dirname, '../../.erb/dll/preload.js'),
        },
    });

    MAIN_WINDOW.loadURL(resolveHtmlPath('index.html'));

    MAIN_WINDOW.on('ready-to-show', () => {
        if (!MAIN_WINDOW) {
            throw new Error('"MAIN_WINDOW" is not defined');
        }
        if (process.env.START_MINIMIZED) {
            MAIN_WINDOW.minimize();
        } else {
            MAIN_WINDOW.setBounds(STORE.get('bounds') as Partial<Rectangle>);
            MAIN_WINDOW.webContents.setZoomFactor(1.0);
            MAIN_WINDOW.show();
        }
    });

    MAIN_WINDOW.on('close', () => {
        STORE.set('directory_expand', DIRECTORY_EXPAND);
        STORE.set('directory', DIRECTORY_ACTIVE);
        STORE.set('file', FILE_ACTIVE);
        STORE.set('bounds', MAIN_WINDOW?.getBounds());
    });

    MAIN_WINDOW.on('closed', () => {
        MAIN_WINDOW = null;
    });

    const menuBuilder = new MenuBuilder(MAIN_WINDOW);
    menuBuilder.buildMenu();

    MAIN_WINDOW.webContents.setWindowOpenHandler((edata) => {
        shell.openExternal(edata.url);
        return { action: 'deny' };
    });

    MAIN_WINDOW.on('move', () => {
        MAIN_WINDOW?.webContents.setZoomFactor(1.0);
    });

    new AppUpdater();

    // If we have stored Directory from last session,
    // We should load directory back to state on launch.
    DIRECTORY_ACTIVE = STORE.get('directory') as any;

    if (DIRECTORY_ACTIVE) {
        watchDirectory(true);
    }
};

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.whenReady()
    .then(() => {
        createWindow();
        app.on('activate', () => {
            if (MAIN_WINDOW === null) createWindow();
        });
    })
    .catch(console.log);
