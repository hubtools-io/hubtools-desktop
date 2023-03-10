import { formatFieldArray } from './format-field-array';
import { hubId } from './hub-id';

export const copyField = (inputArr: any, field: any) => {
    let arr = formatFieldArray(inputArr);
    arr = Object.values(arr);

    let matchFound = false;
    const newCopyArr = [...arr] as any;

    arr.forEach((item: any, i: any) => {
        const internalId = hubId();

        if (!matchFound && JSON.stringify(item) === JSON.stringify(field)) {
            matchFound = true;
            newCopyArr.splice(i + 1, 0, {
                ...item,
                name: `${item.name}_${internalId}`,
                internalId,
            });
            return;
        }

        if (!matchFound && item.children && item.type === 'group') {
            item.children.forEach((item2: any, i2: any) => {
                if (
                    !matchFound &&
                    JSON.stringify(item2) === JSON.stringify(field)
                ) {
                    const internalId2 = hubId();

                    matchFound = true;
                    newCopyArr[i].children.splice(i2 + 1, 0, {
                        ...item2,
                        name: `${item2.name}_${internalId}`,
                        internalId: internalId2,
                    });
                    return;
                }

                if (!matchFound && item2.children && item2.type === 'group') {
                    item2.children.forEach((item3: any, i3: any) => {
                        const internalId3 = hubId();

                        if (
                            !matchFound &&
                            JSON.stringify(item3) === JSON.stringify(field)
                        ) {
                            matchFound = true;
                            newCopyArr[i].children[i2].children.splice(
                                i3 + 1,
                                0,
                                {
                                    ...item3,
                                    name: `${item3.name}_${internalId}`,
                                    internalId: internalId3,
                                }
                            );
                            return;
                        }

                        if (
                            !matchFound &&
                            item3.children &&
                            item3.type === 'group'
                        ) {
                            item3.children.forEach((item4: any, i4: any) => {
                                const internalId4 = hubId();

                                if (
                                    !matchFound &&
                                    JSON.stringify(item4) ===
                                        JSON.stringify(field)
                                ) {
                                    matchFound = true;
                                    newCopyArr[i].children[i2].children[
                                        i3
                                    ].children.splice(i4 + 1, 0, {
                                        ...item4,
                                        name: `${item4.name}_${internalId}`,
                                        internalId: internalId4,
                                    });
                                    return;
                                }

                                if (
                                    !matchFound &&
                                    item4.children &&
                                    item4.type === 'group'
                                ) {
                                    item4.children.forEach(
                                        (item5: any, i5: any) => {
                                            const internalId5 = hubId();

                                            if (
                                                !matchFound &&
                                                JSON.stringify(item4) ===
                                                    JSON.stringify(field)
                                            ) {
                                                matchFound = true;
                                                newCopyArr[i].children[
                                                    i2
                                                ].children[i3].children[
                                                    i4
                                                ].children.splice(i5 + 1, 0, {
                                                    ...item5,
                                                    name: `${item5.name}_${internalId}`,
                                                    internalId: internalId5,
                                                });
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
