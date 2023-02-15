import { formatFieldArray } from './format-field-array';
import { hubId } from './hub-id';

export const addFieldInternalId = (inputArr: any) => {
    let arr = formatFieldArray(inputArr);
    arr = Object.values(arr);

    arr.forEach((item: any) => {
        item.internalId = hubId();

        if (item.children && item.type === 'group') {
            item.children.forEach((item2: any) => {
                item2.internalId = hubId();

                if (item2.children && item2.type === 'group') {
                    item2.children.forEach((item3: any) => {
                        item3.internalId = hubId();

                        if (item3.children && item3.type === 'group') {
                            item3.children.forEach((item4: any) => {
                                item4.internalId = hubId();

                                if (item4.children && item4.type === 'group') {
                                    item4.children.forEach((item5: any) => {
                                        item5.internalId = hubId();
                                    });
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
