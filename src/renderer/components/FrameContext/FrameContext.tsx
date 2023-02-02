import noop from 'lodash/fp/noop';
import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { FrameFile, NewFrameFile, Directory } from './FrameContext.types';
import { formatFieldString } from './utils';

export interface FrameContextState {
  message?: any;

  directory?: Directory;
  openDirectory: () => void;
  closeDirectory: () => void;

  directoryLoading?: boolean;
  setDirectoryLoading?: (loading: boolean) => void;

  frameFile?: FrameFile;
  openFrameFile: (frameFile: NewFrameFile) => void;
  removeFrameFile: () => void;
  updateFrameFile: (frameFile: FrameFile) => void;

  unsavedFrameFile?: FrameFile;
  updateUnsavedFrameFile: (frameFile: NewFrameFile) => void;
  saveFrameFile: (frameFile: NewFrameFile) => void;
  revertFrameFile: () => void;
}

const initialState: FrameContextState = {
  directory: undefined,
  openDirectory: noop,
  closeDirectory: noop,

  directoryLoading: true,
  setDirectoryLoading: noop,

  frameFile: undefined,
  openFrameFile: noop,
  removeFrameFile: noop,
  updateFrameFile: noop,
  revertFrameFile: noop,

  unsavedFrameFile: undefined,
  updateUnsavedFrameFile: noop,
  saveFrameFile: noop,
};

export const FrameContext = createContext(initialState);

export const FrameContextProvider: FC<{ children: ReactNode }> = (props) => {
  const [dir, setDir] = useState<Directory>();
  const [dirLoading, setDirLoading] = useState<boolean>(true);
  const [file, setFile] = useState<FrameFile>();
  const [dirChanged, setDirChanged] = useState<any>();
  const [unsavedFile, setUnsavedFile] = useState<NewFrameFile | FrameFile>();
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    window.electron.receiveMsg((data: any) => {
      if (data) {
        setMessage(data.text);
      }

      if (data.autoDismiss) {
        setTimeout(() => {
          setMessage('');
        }, 5000);
      }
    });
  }, [dir]);

  useEffect(() => {
    window.electron.getOpenDirectory((data: any) => {
      if (data === 499) {
        setDirLoading(false);
      }

      if (
        data &&
        data.name !== undefined &&
        data.name !== 'undefined' &&
        data.path !== dir?.path
      ) {
        if (data.path !== dir?.path) {
          setFile(undefined);
          setUnsavedFile(undefined);
          setDir(data);
        } else {
          setDir({ ...data });
        }
      }
    });
  }, [dir]);

  useEffect(() => {
    window.electron.watchDirectory((dataWatch: any) => {
      if (dataWatch && dir) {
        if (
          file &&
          dataWatch.eventType === 'change' &&
          dataWatch.file === file?.path
        ) {
          // TELL USER TO RELOAD ACTIVE FILE FOR RENAME
          setDirChanged({
            directory: dataWatch.directory,
            file: dataWatch.file,
          });
        }

        if (dir && dataWatch.eventType === 'rename') {
          // TELL USER TO RELOAD PANEL FOR RENAME

          // eslint-disable-next-line no-console
          console.log(dataWatch);
          window.electron.reloadDirectory({ directory: `${dir?.path}` });
        }
      }
    });
  }, [dir, file]);

  const openDirectory = useCallback(() => {
    setDirLoading(true);
    window.electron.openDirectory({ foo: 'bar' });
  }, []);

  const closeDirectory = useCallback(() => {
    // eslint-disable-next-line no-console
    console.log('close directory');
  }, []);

  const openFrameFile = useCallback((frameFile: NewFrameFile | FrameFile) => {
    setFile(undefined);
    setUnsavedFile(undefined);

    setTimeout(() => {
      window.electron.openFile({ file: `${frameFile.path}` });

      window.electron.getOpenFile((data: any) => {
        const newFile = {
          ...frameFile,
          id: `${frameFile.path}`,
          contents: data || [],
        };

        setFile(newFile);
        setUnsavedFile(newFile);
      });
    }, 10);
  }, []);

  useEffect(() => {
    // File has been updated externally
    // Need to update if it is the active viewing file
    if (dir && file && dirChanged) {
      const changedFilePath = `${dir.path}/${dirChanged.file}`;

      if (dirChanged.file === file?.path) {
        openFrameFile({ ...file });
        setDirChanged(false);
      }
    }
  }, [dirChanged, file, dir, openFrameFile]);

  const removeFrameFile = useCallback(() => {
    setFile(undefined);
    setUnsavedFile(undefined);
  }, [setFile, setUnsavedFile]);

  const updateFrameFile = useCallback((frameFile: NewFrameFile | FrameFile) => {
    setUnsavedFile(frameFile);
  }, []);

  const updateUnsavedFrameFile = useCallback(
    (frameFile: NewFrameFile | FrameFile) => {
      setUnsavedFile(frameFile);
    },
    [setUnsavedFile]
  );

  const saveFrameFile = useCallback((frameFile: NewFrameFile | FrameFile) => {
    const formattedContents = formatFieldString(frameFile.contents);

    window.electron.saveFile({
      savePath: `${frameFile.path}`,
      contents: frameFile.contents ? formattedContents : '',
    });

    window.electron.getSavedFile((data: any) => {
      if (data === 200) {
        setFile(frameFile);
        setUnsavedFile(frameFile);
      }
    });
  }, []);

  const revertFrameFile = useCallback(() => {
    setUnsavedFile(file);
  }, [file]);

  const ctx: FrameContextState = useMemo(
    () => ({
      message,

      directory: dir,
      openDirectory,
      closeDirectory,

      directoryLoading: dirLoading,
      setDirectoryLoading: setDirLoading,

      frameFile: file,
      openFrameFile,
      removeFrameFile,
      updateFrameFile,

      unsavedFrameFile: unsavedFile,
      updateUnsavedFrameFile,
      saveFrameFile,
      revertFrameFile,
    }),
    [
      message,

      dir,
      openDirectory,
      closeDirectory,

      dirLoading,
      setDirLoading,

      file,
      openFrameFile,
      removeFrameFile,
      updateFrameFile,

      unsavedFile,
      updateUnsavedFrameFile,
      saveFrameFile,
      revertFrameFile,
    ]
  );

  return <FrameContext.Provider value={ctx} {...props} />;
};

export const useFrame = () => {
  const context = useContext(FrameContext);

  if (!context) {
    throw new Error('useFrame requires a FrameProvider');
  }

  return context;
};

export default FrameContextProvider;
