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
import { autoUpdater } from 'electron-updater';
import fs from 'fs';
import path from 'path';
import glob from 'glob';
import chokidar from 'chokidar';
import log from 'electron-log';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true';

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();

    setInterval(() => {
      autoUpdater.checkForUpdatesAndNotify();
    }, 1000 * 60 * 15);
  }
}

let openDir = null as any;
let newGlob = null as any;
let cwatcher = null as any;
let isReady = false;
let mainWindow: BrowserWindow | null = null;

const getDirectories = (src: any) => {
  newGlob = null;
  newGlob = glob.sync(`${src}/**/*`, {
    ignore: ['**/node_modules/**', '**/dist/**', '**/.git/**'],
  });
  return newGlob;
};

const getDirectoryContents = async (event: any, reloadDir: any) => {
  await getDirectories(reloadDir);

  if (newGlob !== null) {
    const newFileList = [] as any;
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
            isDirectory: fs.lstatSync(pathx).isDirectory(),
          });
        }

        return r[name];
      }, level);
    });

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

ipcMain.on('open-directory', (event: any, args: any) => {
  dialog
    .showOpenDialog({
      properties: ['openDirectory'],
    })
    .then((result) => {
      if (cwatcher) {
        cwatcher.close();
      }

      if (result.canceled || result.filePaths.length === 0) {
        event.sender.send('get-open-directory', false);
      } else {
        openDir = result.filePaths[0];

        cwatcher = chokidar
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

const createWindow = async () => {
  app.commandLine.appendSwitch('high-dpi-support', '1');
  app.commandLine.appendSwitch('force-device-scale-factor', '1');

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  let factor = screen.getPrimaryDisplay().scaleFactor;

  mainWindow = new BrowserWindow({
    show: false,
    width: 760 * factor,
    height: 500 * factor,
    icon: getAssetPath('icon.png'),
    webPreferences: {
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
      mainWindow?.webContents.setZoomFactor(1.0 / (factor / 2));
      mainWindow.show();
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

  mainWindow.on('move', () => {
    const winBounds = mainWindow?.getBounds();
    const activeScreen = screen.getDisplayNearestPoint({
      x: winBounds ? winBounds.x : 0,
      y: winBounds ? winBounds.y : 0,
    });

    factor = activeScreen.scaleFactor;
    mainWindow?.setSize(760 * factor, 500 * factor, true);
    mainWindow?.webContents.setZoomFactor(1.0 / (factor / 2));
  });

  new AppUpdater();
};

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
