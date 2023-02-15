import CloseIcon from 'mdi-react/CloseIcon';
import type { FC, HTMLProps } from 'react';

export type ModalProps = HTMLProps<HTMLDivElement> & {
    modalTitle?: string;
    onClose?: () => void;
};

export const Modal: FC<ModalProps> = ({
    modalTitle = '',
    onClose,
    children,
    ...props
}) => (
    <div
        style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            minHeight: '80vh',
            zIndex: 99,
            top: 0,
            left: 0,
            padding: 50,
        }}
    >
        <div
            className="animate-slide-up"
            style={{
                width: '100%',
                height: '100%',
                backgroundColor: 'white',
                boxShadow: '4px 10px 20px rgba(0, 0, 0, 0.5)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                borderRadius: 10,
                overflow: 'hidden',
                color: '#2e3f50',
            }}
        >
            <div
                style={{
                    width: '100%',
                    backgroundColor: '#2e3f50',
                    color: '#ffffff',
                    position: 'relative',
                }}
            >
                <h2
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        width: '100%',
                        height: 30,
                        fontSize: 16,
                        fontWeight: 400,
                        textTransform: 'uppercase',
                    }}
                >
                    {modalTitle}
                </h2>

                <div
                    className="clickable"
                    style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        height: 55,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontSize: 12,
                        cursor: 'pointer',
                        padding: '0 20px',
                        fontWeight: 600,
                        letterSpacing: 1,
                        color: 'rgba(255,255,255,0.7)',
                    }}
                    role="button"
                    onClick={onClose}
                    onKeyDown={() => {}}
                >
                    <CloseIcon size={15} style={{ marginRight: 5 }} />
                    CLOSE
                </div>
            </div>

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    width: '100%',
                    height: '100%',
                    overflowY: 'auto',
                    padding: '30px 40px',
                    flexWrap: 'wrap',
                }}
            >
                {children}
            </div>
        </div>
    </div>
);
