import {
    Directory,
    DirectoryTreeItem,
} from 'renderer/components/FrameContext/FrameContext.types';
import { getFileExtension } from './get-file-extension';

export const buildDirectoryTree = (directory: Directory) => {
    const workingTree = [] as DirectoryTreeItem[];
    const level = { workingTree };

    directory?.contents?.forEach((contentObj: any) => {
        const relativePath = contentObj.path.replaceAll(
            `${directory.path}/`,
            ''
        );

        relativePath
            .split('/')
            .reduce((r: any, name: DirectoryTreeItem['name']) => {
                if (!r[name]) {
                    r[name] = { workingTree: [] };
                    r.workingTree.push({
                        name,
                        path: contentObj.path,
                        children: r[name].workingTree,
                        extension: getFileExtension(contentObj.path),
                        isDirectory: contentObj.isDirectory,
                    });
                }

                return r[name];
            }, level);
    });

    return workingTree;
};
