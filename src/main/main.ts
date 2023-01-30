/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import { app, BrowserWindow, shell, dialog, ipcMain, screen } from 'electron';
import { autoUpdater, UpdateDownloadedEvent } from 'electron-updater';
import log from 'electron-log';
import fs from 'fs';
import path from 'path';
import glob from 'glob';
import chokidar from 'chokidar';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';

// ---------------------------------------------
const server = 'https://hubtools-deploy-bu3x2ekdl-hubtools-io.vercel.app';
const feed = `${server}/update/${process.platform}/${app.getVersion()}`;

let openDir = null as any;
let newGlob = null as any;

let isReady = false;

const getDirectories = (src: any) => {
  newGlob = null;
  newGlob = glob.sync(`${src}/**/*`, {});
  return newGlob;
};

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

const getDirectoryContents = async (event: any, reloadDir: any) => {
  await getDirectories(reloadDir);

  if (newGlob !== null) {
    const newFileList = [] as any;

    // -------------------------------
    // Create Tree
    const resTree = [] as any;
    const level = { resTree };

    await newGlob.forEach((pathx: any, index: number) => {
      const newPath = pathx.replaceAll(`${reloadDir}/`, '');
      if (newPath === '') {
        return;
      }

      newPath.split('/').reduce((r: any, name: any, i: any, a: any) => {
        if (!r[name]) {
          r[name] = { resTree: [] };
          r.resTree.push({
            name,
            path: pathx,
            children: r[name].resTree,
          });
        }

        return r[name];
      }, level);
    });
    // -------------------------------

    await newGlob.forEach((file: any, index: number) => {
      const isDirectory = fs.lstatSync(file).isFile() === false;

      newFileList.push({
        path: file,
        directory: path.dirname(file),
        name: path.basename(file),
        isDirectory,
      });
    });

    event.sender.send('get-open-directory', {
      name: path.basename(reloadDir),
      path: reloadDir,
      contents: newFileList,
      tree: resTree,
    });
  }
};

ipcMain.on('reload-directory', (event: any, args: any) => {
  getDirectoryContents(event, args.directory);
});

const interval = 100;
const time = new Date().getTime();

ipcMain.on('open-directory', (event: any, args: any) => {
  dialog
    .showOpenDialog({
      properties: ['openDirectory'],
    })
    .then((result) => {
      if (result.canceled || result.filePaths.length === 0) {
        event.sender.send('get-open-directory', false);
      } else {
        openDir = result.filePaths[0];

        const cwatcher = chokidar
          .watch(openDir, {
            persistent: true,
          })
          .on('ready', () => {
            isReady = true;
            getDirectoryContents(event, openDir);
          })
          .on('change', (cpath: any) => {
            if (isReady) {
              event.sender.send('watch-directory', {
                directory: openDir,
                file: cpath,
                eventType: 'change',
              });
            }
          })
          .on('unlink', (cpath: any) => {
            if (isReady) {
              getDirectoryContents(event, openDir);
            }
          });
      }
    })
    .catch((err) => {
      event.sender.send('get-open-directory', err);
    });
});

ipcMain.on('open-file', (event: any, args: any) => {
  fs.readFile(args.file, 'utf8', (err, data) => {
    if (err) throw err;
    return event.sender.send('get-open-file', data);
  });
});

ipcMain.on('save-file', (event: any, args: any) => {
  fs.writeFile(args.savePath, args.contents, (err) => {
    if (err) console.log(err);
    else {
      return event.sender.send('get-saved-file', 200);
    }
  });
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

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name, index) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  const factor = screen.getPrimaryDisplay().scaleFactor;

  mainWindow = new BrowserWindow({
    show: false,
    width: 760 * factor,
    height: 500 * factor,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      // zoomFactor: 1.0 * factor,
      nodeIntegration: true,
      contextIsolation: true,
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.webContents.setZoomFactor(1.0 / (factor / 2));
      mainWindow.show();

      autoUpdater.setFeedURL(feed);

      setInterval(() => {
        autoUpdater.checkForUpdatesAndNotify();
      }, 1000 * 60 * 15);

      autoUpdater.on('update-downloaded', (info: UpdateDownloadedEvent) => {
        const dialogOpts = {
          type: 'info',
          buttons: ['Restart', 'Not Now. On next Restart'],
          title: 'Update',
          message:
            process.platform === 'win32'
              ? (info.releaseNotes as string)
              : (info.releaseName as string),
          detail:
            'A New Version has been Downloaded. Restart Now to Complete the Update.',
        };

        return dialog.showMessageBox(dialogOpts).then((returnValue) => {
          if (returnValue.response === 0) autoUpdater.quitAndInstall();
        });
      });

      autoUpdater.on('error', (message) => {
        console.error('There was a problem updating the application');
        console.error(message);
      });

      setTimeout(() => {
        console.log('fdas');
        autoUpdater.checkForUpdatesAndNotify();
      }, 1000);
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

// const UPDATE_CHECK_INTERVAL = 10 * 60 * 1000;
// setInterval(() => {
//   autoUpdater.checkForUpdates();
// }, UPDATE_CHECK_INTERVAL);
//
// autoUpdater.on('update-available', async () => {
//   console.log('update is available...');
//   const response = await dialog.showMessageBox(mainWindow!, {
//     type: 'info',
//     title: 'Found Updates',
//     message: 'Found updates, do you want update now?',
//     buttons: ['Sure', 'Later'],
//   });

//   if (response.response === 0) {
//     console.log('Downloading Update');
//     autoUpdater.downloadUpdate();
//     await dialog.showMessageBox(mainWindow!, {
//       type: 'info',
//       title: 'Update Downloading',
//       message:
//         'Update is being downloaded, you will be notified when it is ready to install',
//       buttons: [],
//     });
//   }
// });

// autoUpdater.setFeedURL(url);

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
