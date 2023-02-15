import AlphaPIcon from 'mdi-react/AlphaPIcon';
import AppleKeyboardCommandIcon from 'mdi-react/AppleKeyboardCommandIcon';
import ChevronUpIcon from 'mdi-react/ChevronUpIcon';
import CloseIcon from 'mdi-react/CloseIcon';
import CodeTagsIcon from 'mdi-react/CodeTagsIcon';
import ContentSaveOutlineIcon from 'mdi-react/ContentSaveOutlineIcon';
import FormatListBulletedSquareIcon from 'mdi-react/FormatListBulletedSquareIcon';
import { useContext, useEffect, useMemo, useState } from 'react';
import { FrameFile } from 'renderer/components/FrameContext/FrameContext.types';
import { FrameContext } from 'renderer/components/FrameContext';
import { confirmAlert } from 'react-confirm-alert';
import { appVersion } from 'renderer/utils';
import { useHotkeys } from 'react-hotkeys-hook';
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
    message,

    directory,
    openDirectory,

    directoryLoading,
    setDirectoryLoading,

    frameFile,
    openFrameFile,
    removeFrameFile,
    updateFrameFile,

    unsavedFrameFile,
    saveFrameFile,
    revertFrameFile,
  } = useContext(FrameContext);

  const [currentView, setCurrentView] = useState<View>('CODE');
  const [editorEdited, setEditorEdited] = useState<boolean>(false);
  const [editorValid, setEditorValid] = useState<boolean>(true);
  const [hideFiles, setHideFiles] = useState<boolean>(false);

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
    const isEdited = unsavedFrameFile?.contents !== frameFile?.contents;

    return isEdited || editorEdited;
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
          label: 'Yes, discard unsaved changes.',
          onClick: () => onConfirmOpenFile(file),
        },
        {
          label: 'No, keep working.',
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
          label: 'Yes, discard unsaved changes',
          onClick: () => onConfirmCloseFile(),
        },
        {
          label: 'No, keep working',
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
    updateFrameFile(file);
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

  const handleHideFiles = () => {
    setHideFiles(!hideFiles);
  };

  useHotkeys(
    'meta+s, ctrl+s',
    () => {
      if (unsavedFrameFile) {
        handleSaveFile(unsavedFrameFile);
      }
    },
    { scopes: ['files'] }
  );

  return (
    <Layout>
      <Navbar title="HubTools" version={appVersion}>
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
          <ControlSection>
            <span
              style={{
                display: 'inline-block',
                paddingLeft: 10,
                color: 'rgba(255,255,255,0.7',
              }}
            >
              {message}
            </span>
          </ControlSection>

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
        <Explorer onHide={handleHideFiles} canHide={false} hide={hideFiles}>
          <ExplorerFiles
            directory={directory}
            directoryLoading={directoryLoading}
            onOpenProject={() => handleOpenDirectory()}
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
        {currentView === 'CODE' && unsavedFrameFile && unsavedFrameFile.name ? (
          <CodeEditor
            file={unsavedFrameFile}
            onFileChange={handleEditorChange}
            onEdited={handleEdited}
            onValid={handleValid}
            onFileSave={
              unsavedFrameFile
                ? () => handleSaveFile(unsavedFrameFile)
                : undefined
            }
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
              width="248px"
              height="252px"
              viewBox="0 0 248 252"
              version="1.1"
            >
              <g
                id="Page-1"
                stroke="none"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd"
              >
                <path
                  d="M161.553602,0.5 C174.987952,0.5 185.878645,11.3906927 185.878645,24.8250429 C185.878645,26.2237547 185.760592,27.5948936 185.533905,28.9290393 C221.772383,45.1734943 247.014151,81.5626525 247.014151,123.847341 C247.014151,181.270272 200.463668,227.820755 143.040738,227.820755 C132.515767,227.820755 122.356053,226.256904 112.781285,223.348892 C107.945394,239.626733 92.8676339,251.5 75.0167238,251.5 C53.2602098,251.5 35.6230703,233.862861 35.6230703,212.106346 C35.6230703,197.849332 43.1967459,185.361245 54.5402529,178.445928 C44.729425,162.578533 39.0673242,143.874164 39.0673242,123.847341 C39.0673242,120.031937 39.272835,116.264532 39.6733909,112.555593 C17.2072971,106.175531 0.75,85.5045235 0.75,60.9897084 C0.75,31.3865827 24.748075,7.38850772 54.3512007,7.38850772 C72.429659,7.38850772 88.417728,16.3385287 98.12627,30.0494331 C110.209036,24.2525315 123.585848,20.7221146 137.705559,20.0084441 C139.939667,8.88187807 149.767788,0.5 161.553602,0.5 Z M148.567822,67.4772633 L117.529328,174.238687 C117.120073,175.691708 117.938582,177.213022 119.393956,177.621677 L133.264638,181.6406 C134.71979,182.072093 136.220685,181.231945 136.65259,179.778702 L167.691084,73.0172784 C168.100338,71.5642579 167.281829,70.0429433 165.826456,69.6342882 L151.955773,65.6153659 C150.500622,65.2067108 148.977076,66.024021 148.567822,67.4772633 Z M104.187371,90.3692142 L71.3672499,121.188499 C70.2057709,122.261512 70.2057709,124.11058 71.3672499,125.183592 L104.187371,156.025617 C105.303254,157.075889 107.034351,157.030187 108.059264,155.911472 L117.966756,145.318903 C119.014355,144.200188 118.946072,142.419563 117.784371,141.392253 L97.1495472,123.197416 L117.784371,105.002578 C118.946072,103.975269 119.037042,102.194643 117.966756,101.075928 L108.059264,90.4833597 C107.034351,89.3876074 105.303254,89.3189418 104.187371,90.3692142 Z M177.591679,90.4741983 L167.684188,101.064271 C166.636588,102.182698 166.704871,103.962866 167.866573,104.989912 L188.501396,123.202813 L167.866573,141.392979 C166.704871,142.420025 166.613901,144.200193 167.684188,145.318621 L177.591679,155.90847 C178.616592,157.026898 180.347689,157.072589 181.463572,156.045543 L214.283694,125.211213 C215.445172,124.138476 215.445172,122.289883 214.283694,121.217146 L181.463572,90.3600821 C180.370376,89.3330364 178.639501,89.3787274 177.591679,90.4741983 Z"
                  id="Combined-Shape"
                  fill="rgba(16, 16, 16, 0.5)"
                />
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
