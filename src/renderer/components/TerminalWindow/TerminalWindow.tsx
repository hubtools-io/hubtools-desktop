import { FC, HTMLProps, useEffect, useState } from 'react';
import { ReactTerminal } from 'react-terminal';
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
    const commands = {};
    const [command, setCommand] = useState<any>();

    useEffect(() => {
        setCommand(terminal);
    }, [terminal]);

    // TODO: Buffer Terminal
    // When work is complete: defaultHandler={handleAllCommands}
    // const handleAllCommands = (com: any, commandArguments: any) => {
    //     onSendTerminal?.(`${com} ${commandArguments}`);
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
