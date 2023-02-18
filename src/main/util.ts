/* eslint import/prefer-default-export: off */
import { URL } from 'url';
import path from 'path';
import { HFile } from '../renderer/components/FrameContext/FrameContext.types';

export const resolveHtmlPath = (htmlFileName: string) => {
    if (process.env.NODE_ENV === 'development') {
        const port = process.env.PORT || 1212;
        const url = new URL(`http://localhost:${port}`);
        url.pathname = htmlFileName;
        return url.href;
    }
    return `file://${path.resolve(__dirname, '../renderer/', htmlFileName)}`;
};

export const getFileExtension = (filename: string) => {
    const result = filename.substring(
        filename.lastIndexOf('.') + 1,
        filename.length
    );

    return result === filename ? null : result;
};

export type OpenFile = {
    filePath: HFile['path'];
};

export type SaveFile = {
    filePath: HFile['path'];
    contents: HFile['contents'];
};
