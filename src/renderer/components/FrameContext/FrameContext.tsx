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
import {
    Directory,
    DirectoryResponse,
    HFile,
    HFileResponse,
    Message,
} from './FrameContext.types';
import { formatFieldString } from './utils';

export interface FrameContextState {
    message?: any;

    directory?: Directory;
    openDirectory: () => void;
    closeDirectory: () => void;

    directoryLoading?: boolean;
    setDirectoryLoading?: (loading: boolean) => void;

    frameFile?: HFile;
    openFrameFile: (frameFile: HFile) => void;
    removeFrameFile: () => void;
    updateFrameFile: (frameFile: HFile) => void;

    unsavedFrameFile?: HFile;
    saveFrameFile: (frameFile: HFile) => void;
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
    saveFrameFile: noop,
};

export const FrameContext = createContext(initialState);

export const FrameContextProvider: FC<{ children: ReactNode }> = (props) => {
    const [directory, setDirectory] = useState<Directory>();
    const [directoryLoading, setDirectoryLoading] = useState<boolean>(true);

    const [file, setFile] = useState<HFile>();
    const [unsavedFile, setUnsavedFile] = useState<HFile>();

    const [message, setMessage] = useState<string>('');

    const [dirChanged, setDirChanged] = useState<any>();

    /*
     * MESSAGE MANAGER
     * --------------------------------------------------------------------
     */
    useEffect(() => {
        window.electron.receiveMsg((data: Message) => {
            // If data has been returned, send text to UI
            if (data) {
                setMessage(data.text);
            }

            // If message can be auto dismissed,
            // Dismiss message after 5 seconds.
            if (data.autoDismiss) {
                setTimeout(() => {
                    setMessage('');
                }, 5000);
            }
        });
    }, []);

    /*
     * DIRECTORY MANAGER
     * --------------------------------------------------------------------
     */
    useEffect(() => {
        window.electron.directoryResponse((response: DirectoryResponse) => {
            // If error, notify the UI
            if (!!response.data.error && response.data.error.message) {
                setMessage(response.data.error.message);
                setDirectoryLoading(false);
            }

            // If returned directory is current directory
            // refresh directory contents.
            // Otherwise reset all open files.
            if (response.data) {
                const directoryData = { ...response.data.directory };

                if (directoryData.path === directory?.path) {
                    // TODO: We should first notify user
                    // Ask if they want to save open files.
                    setFile(undefined);
                    setUnsavedFile(undefined);
                    setDirectory({ ...directoryData });
                } else {
                    setDirectory({ ...directoryData });
                }

                setDirectoryLoading(false);
            }
        });
    }, [directory]);

    const openDirectory = useCallback(() => {
        setDirectoryLoading(true);
        window.electron.openDirectoryDialog();
    }, []);

    const closeDirectory = useCallback(() => {
        setFile(undefined);
        setUnsavedFile(undefined);
        setDirectory(undefined);
    }, []);

    /*
     * FILE MANAGER
     * --------------------------------------------------------------------
     */
    useEffect(() => {
        window.electron.fileResponse((response: HFileResponse) => {
            // If error, notify the UI
            if (!!response.data.error && response.data.error.message) {
                setMessage(response.data.error.message);
            }

            // If file is returned, set active file
            if (response.data) {
                const fileData = { ...response.data.file };

                setFile({ ...fileData });
                setUnsavedFile({ ...fileData });
            }
        });
    }, [directory]);

    useEffect(() => {
        window.electron.saveFileResponse((response: HFileResponse) => {
            // If error, notify the UI
            if (!!response.data.error && response.data.error.message) {
                setMessage(response.data.error.message);
            }

            // If file is returned, set active file
            if (response.data) {
                const fileData = { ...response.data.file };

                setFile({ ...fileData });
                setUnsavedFile({ ...fileData });
            }
        });
    }, [directory]);

    const openFrameFile = useCallback((requestedFile: any) => {
        if (requestedFile) {
            // Reset file and unsaved file if opening new.
            setFile(undefined);
            setUnsavedFile(undefined);

            // Send new file path to main process
            window.electron.openFile({ filePath: `${requestedFile.path}` });
        }
    }, []);

    const removeFrameFile = useCallback(() => {
        if (file || unsavedFile) {
            setFile(undefined);
            setUnsavedFile(undefined);
        }
    }, [file, unsavedFile]);

    const updateFrameFile = useCallback((frameFile: HFile) => {
        setUnsavedFile(frameFile);
    }, []);

    const saveFrameFile = useCallback((frameFile: HFile) => {
        let contentsValue = frameFile.contents;

        let arrType = '';
        arrType = Array.isArray(frameFile.contents) ? 'array' : '';
        arrType = arrType !== 'array' ? typeof frameFile.contents : arrType;

        if (arrType === 'object' || arrType === 'array') {
            contentsValue = JSON.stringify(frameFile.contents, null, 4);
        }

        window.electron.saveFile({
            filePath: `${frameFile.path}`,
            contents: contentsValue || '',
        });
    }, []);

    const revertFrameFile = useCallback(() => {
        setUnsavedFile(file);
    }, [file]);

    // useEffect(() => {
    //   window.electron.watchDirectory((dataWatch: any) => {
    //     if (dataWatch && dir) {
    //       if (
    //         file &&
    //         dataWatch.eventType === 'change' &&
    //         dataWatch.file === file?.path
    //       ) {
    //         // TELL USER TO RELOAD ACTIVE FILE FOR RENAME
    //         setDirChanged({
    //           directory: dataWatch.directory,
    //           file: dataWatch.file,
    //         });
    //       }

    //       if (dir && dataWatch.eventType === 'rename') {
    //         // TELL USER TO RELOAD PANEL FOR RENAME

    //         // eslint-disable-next-line no-console
    //         console.log(dataWatch);
    //         window.electron.reloadDirectory({ directory: `${dir?.path}` });
    //       }
    //     }
    //   });
    // }, [dir, file]);

    // useEffect(() => {
    //   // File has been updated externally
    //   // Need to update if it is the active viewing file
    //   if (dir && file && dirChanged) {
    //     const changedFilePath = `${dir.path}/${dirChanged.file}`;

    //     if (dirChanged.file === file?.path) {
    //       openFrameFile({ ...file });
    //       setDirChanged(false);
    //     }
    //   }
    // }, [dirChanged, file, dir, openFrameFile]);

    const ctx: FrameContextState = useMemo(
        () => ({
            message,

            directory,
            openDirectory,
            closeDirectory,

            directoryLoading,
            setDirectoryLoading,

            frameFile: file,
            openFrameFile,
            removeFrameFile,
            updateFrameFile,

            unsavedFrameFile: unsavedFile,
            saveFrameFile,
            revertFrameFile,
        }),
        [
            message,

            directory,
            openDirectory,
            closeDirectory,

            directoryLoading,
            setDirectoryLoading,

            file,
            openFrameFile,
            removeFrameFile,
            updateFrameFile,

            unsavedFile,
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
