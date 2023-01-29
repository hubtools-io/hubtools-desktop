export const isValidJson = (str: any) => {
  if (str.toString() === 'true' || str.toString() === 'false') {
    return false;
  }

  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }

  return true;
};
