import { formatFieldArray } from './format-field-array';

export const listInternalIds = (inputArr: any) => {
    let arr = formatFieldArray(inputArr);
    arr = Object.values(arr);

    const listOfInternalIds = [] as string[];

    arr.forEach((item: any) => {
        listOfInternalIds.push(item.internalId);

        if (item.children && item.type === 'group') {
            item.children.forEach((item2: any) => {
                listOfInternalIds.push(item2.internalId);

                if (item2.children && item2.type === 'group') {
                    item2.children.forEach((item3: any) => {
                        listOfInternalIds.push(item3.internalId);

                        if (item3.children && item3.type === 'group') {
                            item3.children.forEach((item4: any) => {
                                listOfInternalIds.push(item4.internalId);

                                if (item4.children && item4.type === 'group') {
                                    item4.children.forEach((item5: any) => {
                                        listOfInternalIds.push(
                                            item5.internalId
                                        );
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });

    return listOfInternalIds;
};
