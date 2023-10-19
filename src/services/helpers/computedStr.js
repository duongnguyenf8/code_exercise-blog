/**
 * Formats the given content, input or textarea.
 * @param {string} content - The content to format.
 * @param {('input'|'textarea'|'content')} field - The field to format.
 * @returns {string} The formatted content.
 */

import { decoded, encoded } from './encoded';

const formatContent = (content) => {
  const newContent = encoded(content)
    .replace(/\n{3,}/g, '\n\n')
    .replace(/\n/g, ' <br/> ')
    .trim();
  return decoded(computedStr(newContent));
};
/**
 * Formats the given input.
 * @param {string} input - The input to format.
 * @returns {string} The formatted input.
 */
const formatInput = (input) => input.replace(/  +/g, ' ').trim();

/**
 * Formats the given textarea.
 * @param {string} input - The textarea to format.
 * @returns {string} The formatted text
 */
const formatTextarea = (input) => input.replace(/\n{3,}/g, '\n\n').trim();

/**
 * Formats the given value based on the given field.
 * @param {string} value - The value to format.
 * @param {('input'|'textarea'|'content')} field - The field to format.
 * @returns {string} The formatted value.
 */
export const format = (value, field) => {
  if (field === 'input') return formatInput(value);
  else if (field === 'textarea') return formatTextarea(value);
  else return formatContent(value);
};

/**
 * Linkifies the given text.
 * @param {string} text - The text to linkify.
 * @returns {string} The linkified text.
 */
export const linkify = (text) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replaceAll(urlRegex, function (url) {
    if (url.slice(-1) === '/') {
      url = url.substring(0, url.length - 1);
    }
    url.replace(/[.,;'"]$/, '');
    return ` <a href="${url}" class="link" target="_blank">${url}</a> `;
  });
};

/**
 * Phonifies the given text.
 * @param {string} text - The text to phoneify.
 * @returns {string} The phonifeied text.
 */
export const phoneify = (text) => {
  const phoneRegex =
    /((\+|0)\d{1,4}[-.\s]?)?(\(?\d{1,3}?\)?[-.\s]?)?(\d{1,4}[-.\s]?){2,}\d{8,}/g;
  return text.replaceAll(phoneRegex, function (phone) {
    return ` <a href="tel:${phone}" class="link" target="_blank">${phone}</a> `;
  });
};

/**
 * Mailifies the given text.
 * @param {string} text - The text to mailify.
 * @returns {string} The mailified text.
 */
export const mailify = (text) => {
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
  return text.replaceAll(emailRegex, function (email) {
    return ` <a href="mailto:${email}" class="link" target="_blank">${email}</a> `;
  });
};

export const computedStr = (text) => mailify(phoneify(linkify(text)));
