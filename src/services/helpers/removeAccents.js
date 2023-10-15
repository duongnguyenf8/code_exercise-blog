/**
 * A function to remove accents from a string.
 * @param {string} str - The string to be processed.
 * @returns {string} The processed string.
 */
export default function removeAccents(str) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
}
