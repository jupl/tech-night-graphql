/**
 * Filter list of objects with given match criteria. Criteria should be
 * key-value pairs where key should be an attribute in the object list and
 * value is an expected value. Depending on item value and criteria value
 * the following will be done:
 * - item array and criteria array: check each criteria value is in item value
 * - item array: check criteria value is in item value
 * - criteria array: check if item value is in criteria value
 * - else: compare values with ===
 * @template T
 * @param {Array<T>} list List of objects to match
 * @param {Object} criteria Criteria to filter by
 * @return {Array<T>} Filtered list
 */
export const finder = (list, criteria) =>
  list.filter(item => Object.entries(criteria).every(([key, value]) => {
    if(Array.isArray(item[key]) && Array.isArray(value)) {
      return value.every(v => item[key].includes(v))
    }
    else if(Array.isArray(item[key])) {
      return item[key].includes(value)
    }
    else if(Array.isArray(value)) {
      return value.includes(item[key])
    }
    else {
      return item[key] === value
    }
  }))
