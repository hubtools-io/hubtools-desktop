import { formatFieldArray } from './format-field-array';

export const moveFieldUpLevel = (inputArr: any, field: any) => {
  let arr = formatFieldArray(inputArr);
  arr = Object.values(arr);

  let matchFound = false;
  const newCopyArr = [...arr] as any;

  arr.forEach((item: any, i: any) => {
    if (!matchFound && JSON.stringify(item) === JSON.stringify(field)) {
      matchFound = true;
      return;
    }

    if (!matchFound && item.children && item.type === 'group') {
      item.children.forEach((item2: any, i2: any) => {
        if (!matchFound && JSON.stringify(item2) === JSON.stringify(field)) {
          matchFound = true;

          newCopyArr[i].children.splice(i2, 1);
          newCopyArr.unshift(field);
          return;
        }

        if (!matchFound && item2.children && item2.type === 'group') {
          item2.children.forEach((item3: any, i3: any) => {
            if (
              !matchFound &&
              JSON.stringify(item3) === JSON.stringify(field)
            ) {
              matchFound = true;

              newCopyArr[i].children[i2].children.splice(i2, 1);
              newCopyArr[i].children.unshift(field);
              return;
            }

            if (!matchFound && item3.children && item3.type === 'group') {
              item3.children.forEach((item4: any, i4: any) => {
                if (
                  !matchFound &&
                  JSON.stringify(item4) === JSON.stringify(field)
                ) {
                  matchFound = true;

                  newCopyArr[i].children[i2].children[i3].children.splice(
                    i2,
                    1
                  );
                  newCopyArr[i].children[i2].children.unshift(field);
                  return;
                }

                if (!matchFound && item4.children && item4.type === 'group') {
                  item4.children.forEach((item5: any, i5: any) => {
                    if (
                      !matchFound &&
                      JSON.stringify(item4) === JSON.stringify(field)
                    ) {
                      matchFound = true;

                      newCopyArr[i].children[i2].children[i3].children[
                        i4
                      ].children.splice(i2, 1);
                      newCopyArr.children[i2].children[i3].children.unshift(
                        field
                      );
                    }
                  });
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
