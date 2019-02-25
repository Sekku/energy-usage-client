/**
 * Determines if a value represents a number
 *
 * In a similar way to isFinite, it returns false for "special" numbers `NaN`, `+Infinity` and `-Infinity`.
 * On the contrary, where isFinite(null) === true, isNumeric(null) === false
 *
 * @param {*} value Value to check
 * @returns {boolean} True if `value` is a `Number` and is finite, i.e., not any of null, undefined, NaN or (+/-)Infinity
 */
const isNumeric = val =>
  /* Google's Angular implementation of isNumeric */
  !Number.isNaN(val - parseFloat(val));

/**
 * Tests if a string is valid date (But not numbers or numeric strings)
 * https://stackoverflow.com/questions/10589732/checking-if-a-date-is-valid-in-javascript
 *
 * @param {*} value Value to check.
 * @returns {boolean} True if `value` is a valid date.
 */
const isValidDate = val => {
  if (typeof val !== 'string') {
    return false;
  }
  if (isNumeric(val)) {
    return false;
  }

  const date = new Date(val);
  return date instanceof Date && !Number.isNaN(date.valueOf());
};

/**
 * Checks if an object is an empty object
 * @param {*} obj
 */
const objectIsEmpty = obj => {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }

  // https://stackoverflow.com/a/32108184/317666
  if (Object.entries) {
    return Object.entries(obj).length === 0 && obj.constructor === Object;
  }
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};

/**
 * Awaits for a promise and returns an array with 2 elements
 * The first one is the returned data from the promise. If the promise fails, then it'll be null
 * The second one is the error, if something happened
 * @param {Promise} promise Promise to be awaited
 */
const to = async promise => {
  try {
    const data = await promise;
    return [data, null];
  } catch (err) {
    return [null, err];
  }
};

module.exports = {
  to,
  objectIsEmpty,
  isValidDate,
  isNumeric
};
