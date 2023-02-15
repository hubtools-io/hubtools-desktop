import { Path } from '../../FrameContext/FrameContext.types';

export const getFileExtension = (filename: Path) => {
    const result = filename.substring(
        filename.lastIndexOf('.') + 1,
        filename.length
    );

    return result === filename ? null : result;
};
