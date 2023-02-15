import { formatFieldArray } from './format-field-array';

export const replaceField = (inputArr: any, field: any, nextField: any) => {
    let arr = formatFieldArray(inputArr);
    arr = Object.values(arr);

    let matchFound = false;

    arr.forEach((item: any, i: any) => {
        if (!matchFound && JSON.stringify(item) === JSON.stringify(field)) {
            matchFound = true;
            arr[i] = nextField;
            return;
        }

        if (!matchFound && item.children && item.type === 'group') {
            item.children.forEach((item2: any, i2: any) => {
                if (
                    !matchFound &&
                    JSON.stringify(item2) === JSON.stringify(field)
                ) {
                    matchFound = true;
                    arr[i].children[i2] = nextField;
                    return;
                }

                if (!matchFound && item2.children && item2.type === 'group') {
                    item2.children.forEach((item3: any, i3: any) => {
                        if (
                            !matchFound &&
                            JSON.stringify(item3) === JSON.stringify(field)
                        ) {
                            matchFound = true;
                            arr[i].children[i2].children[i3] = nextField;
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
                                    arr[i].children[i2].children[i3].children[
                                        i4
                                    ] = nextField;
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
                                                JSON.stringify(item4) ===
                                                    JSON.stringify(field)
                                            ) {
                                                matchFound = true;
                                                arr[i].children[i2].children[
                                                    i3
                                                ].children[i4].children[i5] =
                                                    nextField;
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

    return arr;
};
