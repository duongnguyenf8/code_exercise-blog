/**
 * A collection of functions for encoding HTML entities.
 * @param {string} str - The string to be encoded.
 * @returns {string} The encoded string.
 */
export function encoded(str) {
  return str
    .replaceAll("'", " ' ")
    .replaceAll('"', ' " ')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('&', '&amp;');
}
/**
 * A collection of functions for decoding HTML entities.
 * @param {string} str - The string to be decoded.
 * @returns {string} The decoded string.
 */
export function decoded(str) {
  return str
    .replaceAll(" ' ", "'")
    .replaceAll(' " ', '"')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&amp;', '&');
}
