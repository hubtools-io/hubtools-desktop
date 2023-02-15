import { clone, result } from 'lodash';
import { formatFieldArray } from './format-field-array';

export const moveTo = async (
    inputArr: any,
    field: any,
    source: any,
    destination: any
) => {
    let arr = formatFieldArray(inputArr);
    arr = Object.values(arr);

    let destinationFound = false;
    let matchFound = false;
    let matchItem = null as any;

    const newCopyArr = [...arr] as any;

    try {
        await arr.forEach((item: any, i: any) => {
            if (!matchFound && field === item.internalId) {
                matchFound = true;

                const pos0 = newCopyArr;
                matchItem = clone(pos0[source.index]);
                pos0.splice(source.index, 1);
                return;
            }

            if (!matchFound && item.children && item.type === 'group') {
                item.children.forEach((item2: any, i2: any) => {
                    if (!matchFound && field === item2.internalId) {
                        matchFound = true;
                        const pos1 = newCopyArr[i].children;
                        matchItem = clone(pos1[source.index]);
                        pos1.splice(source.index, 1);
                        return;
                    }

                    if (
                        !matchFound &&
                        item2.children &&
                        item2.type === 'group'
                    ) {
                        item2.children.forEach((item3: any, i3: any) => {
                            if (!matchFound && field === item3.internalId) {
                                matchFound = true;
                                const pos2 =
                                    newCopyArr[i].children[i2].children;
                                matchItem = clone(pos2[source.index]);
                                pos2.splice(source.index, 1);
                                return;
                            }

                            if (
                                !matchFound &&
                                item3.children &&
                                item3.type === 'group'
                            ) {
                                item3.children.forEach(
                                    (item4: any, i4: any) => {
                                        if (
                                            !matchFound &&
                                            field === item4.internalId
                                        ) {
                                            matchFound = true;
                                            const pos3 =
                                                newCopyArr[i].children[i2]
                                                    .children[i3].children;
                                            matchItem = clone(
                                                pos3[source.index]
                                            );
                                            pos3.splice(source.index, 1);
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
                                                        field ===
                                                            item5.internalId
                                                    ) {
                                                        matchFound = true;
                                                        const pos4 =
                                                            newCopyArr[i]
                                                                .children[i2]
                                                                .children[i3]
                                                                .children[i4]
                                                                .children;
                                                        matchItem = clone(
                                                            pos4[source.index]
                                                        );
                                                        return pos4.splice(
                                                            source.index,
                                                            1
                                                        );
                                                    }
                                                }
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

        await arr.forEach((item: any, i: any) => {
            if (!destinationFound && destination.droppableId === 'droppable') {
                destinationFound = true;

                const pos = newCopyArr;
                pos.splice(destination.index, 0, matchItem);
                return;
            }

            if (
                !destinationFound &&
                destination.droppableId === item.internalId &&
                item.type === 'group'
            ) {
                destinationFound = true;

                const pos = newCopyArr[i].children;
                pos.splice(destination.index, 0, matchItem);
                return;
            }

            if (!destinationFound && item.children && item.type === 'group') {
                item.children.forEach((item2: any, i2: any) => {
                    if (
                        !destinationFound &&
                        destination.droppableId === item2.internalId &&
                        item2.type === 'group'
                    ) {
                        destinationFound = true;
                        const pos1 = newCopyArr[i].children[i2].children;
                        pos1.splice(destination.index, 0, matchItem);
                        return;
                    }

                    if (
                        !destinationFound &&
                        item2.children &&
                        item2.type === 'group'
                    ) {
                        item2.children.forEach((item3: any, i3: any) => {
                            if (
                                !destinationFound &&
                                destination.droppableId === item3.internalId &&
                                item3.type === 'group'
                            ) {
                                destinationFound = true;
                                const pos2 =
                                    newCopyArr[i].children[i2].children[i3]
                                        .children;
                                pos2.splice(destination.index, 0, matchItem);
                                return;
                            }

                            if (
                                !destinationFound &&
                                item3.children &&
                                item3.type === 'group'
                            ) {
                                item3.children.forEach(
                                    (item4: any, i4: any) => {
                                        if (
                                            !destinationFound &&
                                            destination.droppableId ===
                                                item4.internalId &&
                                            item4.type === 'group'
                                        ) {
                                            destinationFound = true;
                                            const pos3 =
                                                newCopyArr[i].children[i2]
                                                    .children[i3].children[i4]
                                                    .children;
                                            pos3.splice(
                                                destination.index,
                                                0,
                                                matchItem
                                            );
                                            return;
                                        }

                                        if (
                                            !destinationFound &&
                                            item4.children &&
                                            item4.type === 'group'
                                        ) {
                                            item4.children.forEach(
                                                (item5: any, i5: any) => {
                                                    if (
                                                        !destinationFound &&
                                                        destination.droppableId ===
                                                            item5.internalId &&
                                                        item5.type === 'group'
                                                    ) {
                                                        destinationFound = true;
                                                        const pos4 =
                                                            newCopyArr[i]
                                                                .children[i2]
                                                                .children[i3]
                                                                .children[i4]
                                                                .children[i5]
                                                                .children;
                                                        return pos4.splice(
                                                            destination.index,
                                                            0,
                                                            matchItem
                                                        );
                                                    }

                                                    if (
                                                        !destinationFound &&
                                                        item5.children &&
                                                        item5.type === 'group'
                                                    ) {
                                                        item5.children.forEach(
                                                            (
                                                                item6: any,
                                                                i6: any
                                                            ) => {
                                                                if (
                                                                    !destinationFound &&
                                                                    destination.droppableId ===
                                                                        item6.internalId &&
                                                                    item6.type ===
                                                                        'group'
                                                                ) {
                                                                    destinationFound =
                                                                        true;
                                                                    const pos5 =
                                                                        newCopyArr[
                                                                            i
                                                                        ]
                                                                            .children[
                                                                            i2
                                                                        ]
                                                                            .children[
                                                                            i3
                                                                        ]
                                                                            .children[
                                                                            i4
                                                                        ]
                                                                            .children[
                                                                            i5
                                                                        ]
                                                                            .children[
                                                                            i6
                                                                        ]
                                                                            .children;
                                                                    return pos5.splice(
                                                                        destination.index,
                                                                        0,
                                                                        matchItem
                                                                    );
                                                                }
                                                            }
                                                        );
                                                    }
                                                }
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

        await newCopyArr;

        return newCopyArr;
    } catch (e) {
        console.log(e);
    }
};
