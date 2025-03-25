/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
  const comparison = (a, b) => a.localeCompare(b, ['ru', 'en'], { caseFirst: "upper" });
  // localeCompare для диакритических знаков использует параметр { sensitivity: variant } по умолчанию
  
  return [...arr].sort((a, b) =>
    param === 'asc'
      ? comparison(a, b)
      : comparison(b, a)
  );
}
