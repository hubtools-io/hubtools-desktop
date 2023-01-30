import AlphaPIcon from 'mdi-react/AlphaPIcon';
import AppleKeyboardCommandIcon from 'mdi-react/AppleKeyboardCommandIcon';
import ChevronUpIcon from 'mdi-react/ChevronUpIcon';
import CloseIcon from 'mdi-react/CloseIcon';
import CodeTagsIcon from 'mdi-react/CodeTagsIcon';
import ContentSaveOutlineIcon from 'mdi-react/ContentSaveOutlineIcon';
import FormatListBulletedSquareIcon from 'mdi-react/FormatListBulletedSquareIcon';
import ImageFilterCenterFocusIcon from 'mdi-react/ImageFilterCenterFocusIcon';
import PlusIcon from 'mdi-react/PlusIcon';
import MinusIcon from 'mdi-react/MinusIcon';
import { useContext, useEffect, useMemo, useState } from 'react';
import { FrameFile } from 'renderer/components/FrameContext/FrameContext.types';
import { FrameContext } from 'renderer/components/FrameContext';
import { confirmAlert } from 'react-confirm-alert';
import { Button } from '../components/Button';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Navbar } from '../components/Navbar';
import { TitleBar } from '../components/TitleBar';
import { ViewButton, ViewButtonIconSize } from '../components/ViewButton';
import { ViewButtonGroup } from '../components/ViewButtonGroup';
import { SmallButton } from '../components/SmallButton';
import { ControlSection } from '../components/ControlSection';
import { ControlBar } from '../components/ControlBar';
import { Explorer } from '../components/Explorer';
import { ExplorerFiles } from '../components/ExplorerFiles';
import { Terminal } from '../components/Terminal';
import { TerminalWindow } from '../components/TerminalWindow';
import { CodeEditor } from '../components/CodeEditor';
import { FieldList } from '../components/FieldList';
import Layout from '../components/Layout';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { hubspotFieldFile } from './utils';

export type View = 'CODE' | 'DOWN' | 'LIST';

const unsavedConfirmMessage = {
  title: 'You have unsaved changes.',
  message: 'Are you sure you want to close this file?',
};

export const Dashboard = () => {
  const {
    directory,
    openDirectory,
    closeDirectory,

    directoryLoading,
    setDirectoryLoading,

    frameFile,
    openFrameFile,
    removeFrameFile,
    updateFrameFile,

    unsavedFrameFile,
    updateUnsavedFrameFile,
    saveFrameFile,
    revertFrameFile,
  } = useContext(FrameContext);

  const [currentView, setCurrentView] = useState<View>('CODE');
  const [editorEdited, setEditorEdited] = useState<boolean>(false);
  const [editorValid, setEditorValid] = useState<boolean>(true);

  useEffect(() => {
    setDirectoryLoading?.(false);
    // setCurrentView('CODE');
  }, [directory, setDirectoryLoading]);

  useEffect(() => {
    if (!unsavedFrameFile) {
      return;
    }

    if ((unsavedFrameFile as any)?.name !== hubspotFieldFile) {
      setCurrentView('CODE');
    }
  }, [unsavedFrameFile]);

  const edited = useMemo(() => {
    const checkFiles = unsavedFrameFile?.contents !== frameFile?.contents;

    return checkFiles || editorEdited;
  }, [unsavedFrameFile, frameFile, editorEdited]);

  const frameBreadcrumbs = useMemo(() => {
    if (!directory || !directory.path) {
      return;
    }

    const newFrameFilePath = unsavedFrameFile?.path?.replaceAll(
      directory.path,
      `${directory.name}`
    );

    return newFrameFilePath?.split('/');
  }, [directory, unsavedFrameFile]);

  const handleViewChange = (view: View) => {
    return setCurrentView(view);
  };

  const handleOpenDirectory = () => {
    openDirectory();
  };

  const handleCloseDirectory = () => {
    closeDirectory();
  };

  const onConfirmOpenFile = (file: FrameFile) => {
    setEditorEdited(false);
    setEditorValid(true);
    openFrameFile(file);
  };

  const handleOpenFile = (file: FrameFile) => {
    if (!edited) {
      return onConfirmOpenFile(file);
    }

    confirmAlert({
      ...unsavedConfirmMessage,
      buttons: [
        {
          label: 'Yes',
          onClick: () => onConfirmOpenFile(file),
        },
        {
          label: 'No',
          onClick: () => {},
        },
      ],
    });
  };

  const onConfirmCloseFile = () => {
    setEditorEdited(false);
    setEditorValid(true);

    revertFrameFile();
    setCurrentView('CODE');

    removeFrameFile();
  };

  const handleCloseFile = () => {
    if (!edited) {
      return onConfirmCloseFile();
    }

    confirmAlert({
      ...unsavedConfirmMessage,
      buttons: [
        {
          label: 'Yes',
          onClick: () => onConfirmCloseFile(),
        },
        {
          label: 'No',
          onClick: () => {},
        },
      ],
    });
  };

  const handleUpdateFile = (file: FrameFile) => {
    updateFrameFile(file);
  };

  const handleSaveFile = (file: FrameFile) => {
    setEditorEdited(false);
    setEditorValid(true);
    saveFrameFile(file);
  };

  const handleUpdateUnsavedFile = (file: FrameFile) => {
    updateUnsavedFrameFile(file);
  };

  const handleEditorChange = (value: any) => {
    handleUpdateUnsavedFile(value);
  };

  const handleFakeEvent = () => {};

  const handleEdited = (editedState: boolean) => {
    setEditorEdited(editedState);
  };

  const handleValid = (validState: boolean) => {
    setEditorValid(validState);
  };

  return (
    <Layout>
      <Navbar title="HubTools">
        <Button onClick={() => handleOpenDirectory()}>
          Open HubSpot CMS Theme
        </Button>
      </Navbar>

      <Layout.FrameTitle>
        <TitleBar>
          {unsavedFrameFile ? (
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0 20px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Breadcrumbs
                  edited={edited}
                  items={
                    frameBreadcrumbs
                      ? frameBreadcrumbs?.map((crumb: any) => ({
                          label: crumb,
                        }))
                      : []
                  }
                />
              </div>

              <div
                role="button"
                className="clickable"
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
                onClick={handleCloseFile}
                onKeyDown={handleFakeEvent}
              >
                <div
                  style={{
                    width: 22,
                    height: 22,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 4,
                    transition: 'all 0.3s ease',
                  }}
                >
                  <CloseIcon
                    size={16}
                    style={{ transform: 'translateY(0px)' }}
                  />
                </div>

                <span
                  style={{ marginLeft: 2, fontWeight: 600, letterSpacing: 1 }}
                >
                  Close File
                </span>
              </div>
            </div>
          ) : null}
        </TitleBar>
      </Layout.FrameTitle>

      <Layout.ControlBar>
        <ControlBar>
          <ControlSection />

          <ControlSection flexAlign="center" />

          <ControlSection flexAlign="flex-end">
            <SmallButton
              onClick={
                unsavedFrameFile
                  ? () => handleSaveFile(unsavedFrameFile)
                  : undefined
              }
              disabled={!edited || !editorValid}
            >
              Save File
            </SmallButton>
          </ControlSection>
        </ControlBar>
      </Layout.ControlBar>

      <Layout.Explorer>
        <Explorer>
          <ExplorerFiles
            directory={directory}
            directoryLoading={directoryLoading}
            onFileSelect={handleOpenFile}
            selectedFile={unsavedFrameFile}
            selectedFileEdited={edited}
            selectedFileValid={editorValid}
          />
        </Explorer>

        <Terminal>
          <TerminalWindow />
        </Terminal>
      </Layout.Explorer>

      <Layout.ViewBar>
        <ViewButtonGroup>
          <ViewButton
            title="Code Editor"
            active={unsavedFrameFile && currentView === 'CODE'}
            onClick={() => handleViewChange('CODE')}
            roundedTop
            disabled={!unsavedFrameFile}
          >
            <CodeTagsIcon size={ViewButtonIconSize} />
          </ViewButton>

          <ViewButton
            title="Field Editor"
            active={unsavedFrameFile && currentView === 'LIST'}
            onClick={() => handleViewChange('LIST')}
            disabled={
              !editorValid ||
              !unsavedFrameFile ||
              (unsavedFrameFile as any)?.name !== hubspotFieldFile
            }
            roundedBottom
          >
            <FormatListBulletedSquareIcon size={ViewButtonIconSize} />
          </ViewButton>
        </ViewButtonGroup>

        <ViewButtonGroup>
          <ViewButton
            title="Save file"
            onClick={
              unsavedFrameFile
                ? () => handleSaveFile(unsavedFrameFile)
                : undefined
            }
            disabled={!edited || !editorValid}
            roundedBottom
            roundedTop
          >
            <ContentSaveOutlineIcon size={ViewButtonIconSize} />
          </ViewButton>
        </ViewButtonGroup>
      </Layout.ViewBar>

      <Layout.Frame>
        {currentView === 'CODE' &&
        unsavedFrameFile &&
        unsavedFrameFile.name &&
        unsavedFrameFile.contents ? (
          <CodeEditor
            file={unsavedFrameFile}
            extension={unsavedFrameFile.name.split('.').pop()?.toLowerCase()}
            code={
              unsavedFrameFile.name.split('.').pop()?.toLowerCase() === 'json'
                ? unsavedFrameFile.contents
                : null
            }
            onFileChange={handleEditorChange}
            onEdited={handleEdited}
            onValid={handleValid}
          />
        ) : null}

        {currentView === 'LIST' &&
          unsavedFrameFile &&
          unsavedFrameFile.name === hubspotFieldFile && (
            <FieldList
              frameFile={unsavedFrameFile}
              onUpdateFile={handleUpdateFile}
            />
          )}

        {!currentView || !unsavedFrameFile ? (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <svg
              viewBox="0 0 242.04 257"
              style={{
                width: 380,
              }}
            >
              <defs>
                <clipPath id="a">
                  <rect
                    style={{ fill: 'none' }}
                    x="42.87"
                    y="46.9"
                    width="156.42"
                    height="163.35"
                  />
                </clipPath>
              </defs>
              <g style={{ clipPath: 'url(#a)' }}>
                <g style={{ clipPath: 'url(#a)' }}>
                  <path
                    style={{ fill: 'rgba(16, 16, 16, 0.5)', opacity: 1 }}
                    d="M162.79,101.25V82a14.84,14.84,0,0,0,8.56-13.38v-.45a14.87,14.87,0,0,0-14.83-14.83h-.45a14.87,14.87,0,0,0-14.83,14.83v.45A14.84,14.84,0,0,0,149.8,82v19.29a42.06,42.06,0,0,0-20,8.8L76.86,68.86a16.89,16.89,0,1,0-7.91,10.29L121,119.67a42.18,42.18,0,0,0,.65,47.56l-15.84,15.84a13.6,13.6,0,0,0-3.93-.64,13.75,13.75,0,1,0,13.75,13.75,13.56,13.56,0,0,0-.64-3.93l15.67-15.67a42.25,42.25,0,1,0,32.1-75.33m-6.49,63.42A21.68,21.68,0,1,1,178,143a21.68,21.68,0,0,1-21.68,21.68"
                  />
                </g>
              </g>
            </svg>

            <div style={{ marginTop: 10, display: 'none' }}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  marginBottom: 10,
                }}
              >
                <span
                  style={{
                    fontSize: 18,
                    letterSpacing: 0.5,
                    fontWeight: 300,
                    display: 'inline-block',
                    marginRight: 12,
                    userSelect: 'none',
                  }}
                >
                  Go to file
                </span>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(46, 46, 46, 0.8)',
                    minWidth: 26,
                    height: 30,
                    borderRadius: 4,
                    marginLeft: 6,
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: 14,
                    userSelect: 'none',
                  }}
                >
                  <span style={{ transform: 'translateY(1px)' }}>
                    <AppleKeyboardCommandIcon size={14} />
                  </span>
                </div>

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(46, 46, 46, 0.8)',
                    minWidth: 26,
                    height: 30,
                    borderRadius: 4,
                    marginLeft: 6,
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: 14,
                    userSelect: 'none',
                  }}
                >
                  <span
                    style={{ transform: 'translateY(1px)', userSelect: 'none' }}
                  >
                    <AlphaPIcon size={24} />
                  </span>
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  marginBottom: 10,
                }}
              >
                <span
                  style={{
                    fontSize: 18,
                    letterSpacing: 0.5,
                    fontWeight: 300,
                    display: 'inline-block',
                    marginRight: 12,
                    userSelect: 'none',
                  }}
                >
                  Toggle Terminal
                </span>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(46, 46, 46, 0.8)',
                    minWidth: 26,
                    height: 30,
                    borderRadius: 4,
                    marginLeft: 6,
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: 14,
                    userSelect: 'none',
                  }}
                >
                  <span
                    style={{ transform: 'translateY(1px)', userSelect: 'none' }}
                  >
                    <ChevronUpIcon size={22} />
                  </span>
                </div>

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(46, 46, 46, 0.8)',
                    minWidth: 26,
                    height: 30,
                    borderRadius: 4,
                    marginLeft: 6,
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: 14,
                    userSelect: 'none',
                  }}
                >
                  <span
                    style={{ transform: 'translateY(1px)', userSelect: 'none' }}
                  >
                    `
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </Layout.Frame>
    </Layout>
  );
};
