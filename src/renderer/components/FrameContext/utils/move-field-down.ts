import { clone } from 'lodash';
import { formatFieldArray } from './format-field-array';

export const moveFieldDown = (inputArr: any, field: any) => {
    let arr = formatFieldArray(inputArr);
    arr = Object.values(arr);

    let matchFound = false;
    const newCopyArr = clone(arr);
    // const newCopyArr = [...arr] as any;

    arr.forEach((item: any, i: any) => {
        if (!matchFound && JSON.stringify(item) === JSON.stringify(field)) {
            matchFound = true;

            const pos = newCopyArr;
            pos.splice(i + 1, 0, newCopyArr.splice(i, 1)[0]);
            return;
        }

        if (!matchFound && item.children && item.type === 'group') {
            item.children.forEach((item2: any, i2: any) => {
                if (
                    !matchFound &&
                    JSON.stringify(item2) === JSON.stringify(field)
                ) {
                    matchFound = true;
                    const pos1 = newCopyArr[i].children;
                    pos1.splice(i2 + 1, 0, pos1.splice(i2, 1)[0]);
                    return;
                }

                if (!matchFound && item2.children && item2.type === 'group') {
                    item2.children.forEach((item3: any, i3: any) => {
                        if (
                            !matchFound &&
                            JSON.stringify(item3) === JSON.stringify(field)
                        ) {
                            matchFound = true;
                            const pos2 = newCopyArr[i].children[i2].children;
                            pos2.splice(i3 + 1, 0, pos2.splice(i3, 1)[0]);
                            return;
                        }

                        if (
                            !matchFound &&
                            item3.children &&
                            item3.type === 'group'
                        ) {
                            item3.children.forEach((item4: any, i4: any) => {
                                if (
                                    !matchFound &&
                                    JSON.stringify(item4) ===
                                        JSON.stringify(field)
                                ) {
                                    matchFound = true;
                                    const pos3 =
                                        newCopyArr[i].children[i2].children[i3]
                                            .children;
                                    pos3.splice(
                                        i4 + 1,
                                        0,
                                        pos3.splice(i4, 1)[0]
                                    );
                                    return;
                                }

                                if (
                                    !matchFound &&
                                    item4.children &&
                                    item4.type === 'group'
                                ) {
                                    item4.children.forEach(
                                        (item5: any, i5: any) => {
                                            if (
                                                !matchFound &&
                                                JSON.stringify(item5) ===
                                                    JSON.stringify(field)
                                            ) {
                                                matchFound = true;
                                                const pos4 =
                                                    newCopyArr[i].children[i2]
                                                        .children[i3].children[
                                                        i4
                                                    ].children;
                                                pos4.splice(
                                                    i5 + 1,
                                                    0,
                                                    pos4.splice(i5, 1)[0]
                                                );
                                            }
                                        }
                                    );
                                }
                            });
                        }
                    });
                }
            });
        }
    });

    return newCopyArr;
};
