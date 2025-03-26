/**
 * pick - Creates an object composed of the picked object properties:
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to pick
 * @returns {object} - returns the new object
 */
export const pick = (obj, ...fields) => {
  const fieldsCollection = new Set(fields);
  const filteredObject = Object.entries(obj).filter(([key]) => fieldsCollection.has(key));
  return {...Object.fromEntries(filteredObject)};
};
