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
import chokidar from 'chokidar';
import log from 'electron-log';
import Store from 'electron-store';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';

const store = new Store();

let directoryGlob = null as any;
let directoryWatcher = null as any;
let directoryWatcherIsReady = false;
let mainWindow: BrowserWindow | null = null;
let selectedDirectory = null as any;

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true';

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;

    autoUpdater.on('checking-for-update', () => {
      mainWindow?.webContents.send('receive-msg', {
        autoDismiss: true,
        text: 'Checking for app updates...',
      });
    });

    autoUpdater.on('update-available', () => {
      mainWindow?.webContents.send('receive-msg', {
        autoDismiss: true,
        text: 'New app update found.',
      });
    });

    autoUpdater.on('update-downloaded', () => {
      mainWindow?.webContents.send('receive-msg', {
        autoDismiss: true,
        text: 'New app update will be installed on exit.',
      });
    });

    autoUpdater.checkForUpdatesAndNotify();

    setInterval(() => {
      autoUpdater.checkForUpdatesAndNotify();
    }, 1000 * 60 * 15);
  }
}

const getDirectoryGlob = (src: any) => {
  directoryGlob = null;
  directoryGlob = glob.sync(`${src}/**/*`, {
    ignore: ['**/node_modules/**', '**/dist/**', '**/.git/**'],
  });
  return directoryGlob;
};

const getDirectoryContents = async (event: any, directoryPath: any) => {
  await getDirectoryGlob(directoryPath);

  if (directoryGlob !== null) {
    const directoryContents = [] as any;
    const directoryTree = [] as any;
    const level = { directoryTree };

    await directoryGlob.forEach((pathx: any, index: number) => {
      const relativePath = pathx.replaceAll(`${directoryPath}/`, '');
      if (relativePath === '') {
        return;
      }

      event.sender.send('receive-msg', {
        text: 'Building directory file tree...',
      });

      const isDirectory = fs.lstatSync(pathx).isFile() === false;

      relativePath.split('/').reduce((r: any, name: any, i: any, a: any) => {
        if (!r[name]) {
          r[name] = { directoryTree: [] };

          directoryContents.push({
            path: pathx,
            directory: path.dirname(pathx),
            name: path.basename(pathx),
            expanded: false,
            isDirectory,
            extension: path.basename(pathx).split('.').pop(),
          });

          r.directoryTree.push({
            name,
            path: pathx,
            children: r[name].directoryTree,
          });
        }

        return r[name];
      }, level);
    });

    event.sender.send('receive-msg', {
      text: '',
    });

    event.sender.send('get-open-directory', {
      name: path.basename(directoryPath),
      path: directoryPath,
      contents: directoryContents,
      tree: directoryTree,
    });
  }
};

ipcMain.on('reload-directory', (event: any, args: any) => {
  getDirectoryContents(event, args.directory);
});

ipcMain.on('open-directory', (event: any, args: any) => {
  event.sender.send('receive-msg', {
    text: 'Select a directory from the dialog',
  });

  if (!mainWindow) {
    return;
  }

  dialog
    .showOpenDialog(mainWindow, {
      properties: ['openDirectory'],
      buttonLabel: 'Open HubSpot CMS Theme',
      message: 'Open HubSpot CMS Theme',
    })
    .then((result) => {
      if (directoryWatcher) {
        directoryWatcher.close();
      }

      if (result.canceled || result.filePaths.length === 0) {
        event.sender.send('receive-msg', {
          text: '',
        });

        event.sender.send('get-open-directory', 499);
      } else {
        event.sender.send('receive-msg', {
          text: 'Directory opening...',
        });

        selectedDirectory = result.filePaths[0];

        directoryWatcher = chokidar
          .watch(selectedDirectory, {
            persistent: true,
          })
          .on('ready', () => {
            directoryWatcherIsReady = true;
            getDirectoryContents(event, selectedDirectory);
          })
          .on('change', (cpath: any) => {
            if (directoryWatcherIsReady) {
              event.sender.send('watch-directory', {
                directory: selectedDirectory,
                file: cpath,
                eventType: 'change',
              });
            }
          })
          .on('unlink', (cpath: any) => {
            if (directoryWatcherIsReady) {
              getDirectoryContents(event, selectedDirectory);
            }
          });
      }
    })
    .catch((err) => {
      event.sender.send('get-open-directory', err);
    });
});

ipcMain.on('open-file', (event: any, args: any) => {
  event.sender.send('receive-msg', {
    text: 'Opening File...',
  });

  fs.readFile(args.file, 'utf8', (err, data) => {
    if (err) throw err;
    event.sender.send('receive-msg', {
      text: '',
    });

    return event.sender.send('get-open-file', data);
  });
});

ipcMain.on('save-file', (event: any, args: any) => {
  event.sender.send('receive-msg', {
    text: 'Saving file...',
  });

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

  mainWindow = new BrowserWindow({
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

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.setBounds(store.get('bounds') as Partial<Rectangle>);
      mainWindow.webContents.setZoomFactor(1.0);
      mainWindow.show();
    }
  });

  mainWindow.on('close', () => {
    store.set('bounds', mainWindow?.getBounds());
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
    mainWindow?.webContents.setZoomFactor(1.0);
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
