import { FC, HTMLProps, useContext, useEffect, useState } from 'react';
import { ReactTerminal, TerminalContext } from 'react-terminal';
import { uiDimensions } from '../../utils';

export type TerminalWindowProps = HTMLProps<HTMLDivElement> & {
    terminal?: any;
    onSendTerminal?: (data: any) => void;
};

export const TerminalWindow: FC<TerminalWindowProps> = ({
    onSendTerminal,
    terminal,
    ...props
}) => {
    const { setBufferedContent, setTemporaryContent } =
        useContext(TerminalContext);
    const [theme, setTheme] = useState('light');
    const [controlBar, setControlBar] = useState(true);
    const [controlButtons, setControlButtons] = useState(true);
    const [prompt, setPrompt] = useState('>>>');

    const commands = {};
    const [command, setCommand] = useState<any>();

    useEffect(() => {
        setCommand(terminal);
    }, [terminal]);

    // TODO: Buffer Terminal
    // When work is complete: defaultHandler={handleAllCommands}
    // const handleAllCommands = async (com: any, commandArguments: any) => {
    //     const response = null as any;
    //     await new Promise((resolve) => {
    //         onSendTerminal?.(`${com} ${commandArguments}`);

    //         window.electron.terminalReceive((reply: any) => {
    //             setBufferedContent((previous) => (
    //                 <>
    //                     {previous}
    //                     {reply.split('\t').map((e: any) => (
    //                         <p
    //                             style={{
    //                                 fontSize: 13,
    //                                 margin: 0,
    //                                 display: 'block',
    //                                 width: '100%',
    //                             }}
    //                         >
    //                             {e}
    //                         </p>
    //                     ))}
    //                     <br />
    //                 </>
    //             ));
    //             resolve(undefined);
    //         });
    //     });
    // };

    return (
        <div
            {...props}
            className="terminal"
            style={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                width: '100%',
                minHeight: uiDimensions.titleBar,
                padding: 10,
                boxSizing: 'border-box',
                backgroundColor: '#2e3f50',
                height: uiDimensions.terminal,
                flexGrow: 0,
                flexShrink: 0,
            }}
        >
            <ReactTerminal
                commands={commands}
                errorMessage="Terminal coming soon!"
                themes={{
                    'my-custom-theme': {
                        themeBGColor: '#2e3f50',
                        themeColor: '#FFFEFC',
                        themePromptColor: '#ff7a59',
                    },
                }}
                theme="my-custom-theme"
                showControlBar={false}
                showControlButtons={false}
            />
        </div>
    );
};
