import type { FC, HTMLProps } from 'react';

export type NavbarProps = HTMLProps<HTMLDivElement> & {
    title: string;
    version?: string;
};

export const Navbar: FC<NavbarProps> = ({
    children,
    title,
    version,
    ...props
}) => (
    <div
        {...props}
        style={{
            height: 50,
            backgroundColor: '#2e3f50',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100vw',
            zIndex: 20,
            borderBottom: '1px solid #4f6479',
            boxShadow: '4px 0 20px rgba(46, 63, 80,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 15px',
        }}
    >
        <div>
            <span
                style={{ fontWeight: 'bold', fontSize: 18, userSelect: 'none' }}
            >
                {title}
            </span>
            {version ? (
                <span
                    style={{
                        display: 'inline-block',
                        marginLeft: 6,
                        fontSize: 12,
                        userSelect: 'none',
                        opacity: 0.6,
                    }}
                >
                    {version}
                </span>
            ) : null}
        </div>

        {children}
    </div>
);
