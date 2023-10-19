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
  const urlRegex = /((https?:\/\/)|(www\.))[^\s]+/g;
  return text.replaceAll(urlRegex, function (url) {
    if (url.slice(0, 4) !== 'http') {
      url = 'http://' + url;
    }
    if (url.slice(-1) === '/') {
      url = url.substring(0, url.length - 1);
    }
    return ` <a href="${url}" class="link" target="_blank">${url.replace('http://', '')}</a> `;
  });
};

/**
 * Phonifies the given text.
 * @param {string} text - The text to phoneify.
 * @returns {string} The phonifeied text.
 */
export const phoneify = (text) => {
  const phoneRegex =
    /((\+|0)\d{1,4}[-.\s]?)?(\(?\d{1,3}?\)?[-.\s]?)?\b\d{1,4}[-.\s]?\d{2,}[-.\s]?\d{2,}\b/g;
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

/**
 * Youtubifies the given text.
 * @param {string} text - The text to youtubify.
 * @returns {string} The youtubified text.
 */
export const youtubify = (text) => {
  const youtubeRegex = /(https?:\/\/(www\.)?(youtube\.com|youtu\.be)\/[^\s]+)/g;
  return text.replaceAll(youtubeRegex, function (url) {
    if (url) {
      let videoId = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/)[2];
      if (videoId) {
        videoId = videoId.split(/[^0-9a-z_-]/i)[0];
        return `
        <iframe
          width='560'
          height='315'
          src='https://www.youtube.com/embed/${videoId}'
          title='YouTube video player'
          frameBorder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          allowFullScreen></iframe>
      `;
      }
      return url;
    }
    return url;
  });
};
/**
 * Computes the final string to be displayed by replacing email addresses with mailto: links, phone numbers with tel: links, and URLs with clickable links.
 * @param {string} text The text to process.
 * @returns {string} The processed text.
 */
export const computedStr = (text) => {
  let result = mailify(text);
  result = phoneify(result);
  result = linkify(result);
  result = youtubify(result);

  return result;
};
