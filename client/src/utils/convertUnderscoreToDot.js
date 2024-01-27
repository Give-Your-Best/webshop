export const convertUnderscoreToDot = (obj) => {
  const convertedObj = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const newKey = key.replace('_', '.');
      convertedObj[newKey] = obj[key];
    }
  }

  return convertedObj;
};
