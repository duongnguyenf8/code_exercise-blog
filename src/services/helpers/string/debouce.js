/**
 * Debounces a function and returns a new debounced function.
 * @param {Function} func - The function to debounce.
 * @param {number} [delay=200] - The delay in milliseconds.
 * @returns {Function} A new debounced function.
 */
export const debounce = (func, delay = 200) => {
  // return function () {
  //   const context = this;
  //   const args = arguments;
  //   clearTimeout(inDebounce);
  //   inDebounce = setTimeout(() => func.apply(context, args), delay);
  // };
  let inDebounce;
  return new Promise(function (resolve) {
    const context = this;
    const args = arguments;
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => func.apply(context, args), delay);
    resolve();
  });
};
