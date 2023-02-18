import ChevronRightIcon from 'mdi-react/ChevronRightIcon';
import type { HTMLProps } from 'react';

export type BreadcumbItem = {
    label: string;
};

export type BreadcrumbsProps = HTMLProps<HTMLDivElement> & {
    edited?: boolean;
    items: BreadcumbItem[];
};

export const Breadcrumbs = ({ edited = false, items }: BreadcrumbsProps) => (
    <>
        {items.map((item: BreadcumbItem, index: number) => (
            <div
                key={index}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    userSelect: 'none',
                }}
            >
                <span
                    style={{
                        textTransform: index === 0 ? 'uppercase' : 'initial',
                        fontSize: index === 0 ? 11 : 12,
                        letterSpacing: index === 0 ? 1 : 'initial',
                        color: 'rgba(255,255,255,0.75)',
                        userSelect: 'none',
                    }}
                >
                    {item.label}
                </span>

                {index !== items.length - 1 ? (
                    <ChevronRightIcon
                        size={14}
                        style={{ marginRight: 2, marginLeft: 2 }}
                    />
                ) : null}
            </div>
        ))}

        {edited ? (
            <span
                style={{
                    marginLeft: 8,
                    fontSize: 11,
                    opacity: 0.6,
                    letterSpacing: 0.5,
                    userSelect: 'none',
                }}
            >
                (Edited)
            </span>
        ) : null}
    </>
);
