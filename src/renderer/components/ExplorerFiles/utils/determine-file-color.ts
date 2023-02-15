import { DirectoryTreeItem } from '../../FrameContext/FrameContext.types';
import { colors } from '../../../utils';

export const determineFileColor = (
    file: DirectoryTreeItem,
    selectedFile: any,
    selectedFileValid: boolean
) => {
    let color = colors.whiteMuted;

    if (selectedFile && selectedFile.path === file.path) {
        if (selectedFileValid) {
            color = colors.white;
        } else {
            color = colors.error;
        }
    }

    return color;
};
