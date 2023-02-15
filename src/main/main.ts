/* eslint global-require: off, no-console: off, promise/always-return: off */
import {
    app,
    BrowserWindow,
    shell,
    dialog,
    ipcMain,
    Rectangle,
} from 'electron';
import { autoUpdater } from 'electron-updater';
import fs from 'fs';
import path from 'path';
import glob from 'glob';
import chokidar, { FSWatcher } from 'chokidar';
import log from 'electron-log';
import Store from 'electron-store';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';

const STORE = new Store();

let MAIN_WINDOW: BrowserWindow | null = null;

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true';

const getFileExtension = (filename: string) => {
    const result = filename.substring(
        filename.lastIndexOf('.') + 1,
        filename.length
    );

    return result === filename ? null : result;
};

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
 * DIRECTORY MANAGER
 * --------------------------------------------------------------------
 * Directory: Open Dialog
 *   Opens a file dialog popup to select a directory
 *
 * Directory: Response
 *   Sends a response once a directory has been opened.
 */
let DIRECTORY_ACTIVE = null as string | null;
let DIRECTORY_WATCHER = null as FSWatcher | null;
let DIRECTORY_WATCHER_READY = false;

ipcMain.on('directory:open-dialog', (event: any) => {
    if (!MAIN_WINDOW) {
        return;
    }

    const dialogTitle = 'Open HubSpot CMS Theme';
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
                event.sender.send('directory:response', {
                    data: {
                        error: {
                            message: 'User canceled directory selection.',
                            code: 499,
                        },
                    },
                });
            } else {
                const ignoreSubdirectories = [
                    '**/node_modules/**',
                    '**/dist/**',
                    '**/.git/**',
                ];

                sendMessage('Directory opening...', false);

                DIRECTORY_ACTIVE = result.filePaths[0];

                if (!DIRECTORY_ACTIVE) {
                    return;
                }

                DIRECTORY_WATCHER = chokidar
                    .watch(DIRECTORY_ACTIVE, {
                        persistent: true,
                    })
                    .on('ready', () => {
                        DIRECTORY_WATCHER_READY = true;
                        glob(
                            `${DIRECTORY_ACTIVE}/**/*`,
                            {
                                ignore: [...ignoreSubdirectories],
                            },
                            (error: any, matches: string[]) => {
                                if (error) {
                                    event.sender.send('directory:response', {
                                        data: {
                                            error: {
                                                message: `${error}`,
                                                code: 500,
                                            },
                                        },
                                    });
                                } else {
                                    const matchingContents = [] as any;
                                    matches.forEach((match) => {
                                        matchingContents.push({
                                            isDirectory:
                                                fs.lstatSync(match).isFile() ===
                                                false,
                                            path: match,
                                        });
                                    });

                                    event.sender.send('directory:response', {
                                        data: {
                                            directory: {
                                                name: path.basename(
                                                    DIRECTORY_ACTIVE as string
                                                ),
                                                path: DIRECTORY_ACTIVE,
                                                contents: matchingContents,
                                            },
                                        },
                                    });
                                }
                            }
                        );
                    })
                    .on('change', (cpath: any) => {
                        // TODO: Revisit
                        // If directory is ready and a change has been made.
                        // Trigger watch-directory event
                        // if (DIRECTORY_WATCHER_READY) {
                        //   event.sender.send('watch-directory', {
                        //     directory: DIRECTORY_ACTIVE,
                        //     file: cpath,
                        //     eventType: 'change',
                        //   });
                        // }
                    })
                    .on('unlink', (cpath: any) => {
                        if (DIRECTORY_WATCHER_READY) {
                            glob(
                                `${DIRECTORY_ACTIVE}/**/*`,
                                {
                                    ignore: [...ignoreSubdirectories],
                                },
                                (error: any, matches: string[]) => {
                                    if (error) {
                                        event.sender.send(
                                            'directory:response',
                                            {
                                                data: {
                                                    error: {
                                                        message: `${error}`,
                                                        code: 500,
                                                    },
                                                },
                                            }
                                        );
                                    } else {
                                        const matchingContents = [] as any;
                                        matches.forEach((match) => {
                                            matchingContents.push({
                                                isDirectory:
                                                    fs
                                                        .lstatSync(match)
                                                        .isFile() === false,
                                                path: match,
                                            });
                                        });

                                        event.sender.send(
                                            'directory:response',
                                            {
                                                data: {
                                                    directory: {
                                                        name: path.basename(
                                                            DIRECTORY_ACTIVE as string
                                                        ),
                                                        path: DIRECTORY_ACTIVE,
                                                        contents:
                                                            matchingContents,
                                                    },
                                                },
                                            }
                                        );
                                    }
                                }
                            );
                        }
                    });
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
ipcMain.on('file:open', (event: any, args: any) => {
    sendMessage('Opening File...', false);

    fs.readFile(args.filePath, 'utf8', (err, data) => {
        if (err) {
            sendMessage('', false);
            return event.sender.send('file:response', {
                data: {
                    error: {
                        message: `${err}`,
                        code: 500,
                    },
                },
            });
        }

        sendMessage('', true);
        return event.sender.send('file:response', {
            data: {
                file: {
                    name: path.basename(args.filePath as string),
                    path: args.filePath,
                    contents: data,
                    extension: getFileExtension(args.filePath),
                },
            },
        });
    });
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

// ==============================================================================
// ==============================================================================
// ==============================================================================

ipcMain.on('reload-directory', (event: any, args: any) => {
    // getDirectoryContents(event, args.directory);
});

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
        STORE.set('bounds', MAIN_WINDOW?.getBounds());
    });

    MAIN_WINDOW.on('closed', () => {
        MAIN_WINDOW = null;
    });

    const menuBuilder = new MenuBuilder(MAIN_WINDOW);
    menuBuilder.buildMenu();

    // Open urls in the user's browser
    MAIN_WINDOW.webContents.setWindowOpenHandler((edata) => {
        shell.openExternal(edata.url);
        return { action: 'deny' };
    });

    MAIN_WINDOW.on('move', () => {
        MAIN_WINDOW?.webContents.setZoomFactor(1.0);
    });

    new AppUpdater();
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
