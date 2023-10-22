import { decoded, encoded } from './encoded';
import linkify from 'linkify-html';

/**
 * A function to remove accents from a string.
 * @param {string} str - The string to be processed.
 * @returns {string} The processed string.
 */
export function removeAccents(str) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
}

/**
 * Formats the given content, input or textarea.
 * @param {string} content - The content to format.
 * @param {('input'|'textarea'|'content')} field - The field to format.
 * @returns {string} The formatted content.
 */
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
 * Phonifies the given text.
 * @param {string} text - The text to phoneify.
 * @returns {string} The phonifeied text.
 */
export const phoneify = (text) => {
  const phoneRegex = /((\+?)|(0)?)?\b\d{9,11}\b/g;

  return text.replaceAll(phoneRegex, function (phone) {
    if (phone.slice(0, 1) !== '+' && phone.slice(0, 1) !== '0') {
      phone = `+${phone}`;
    }
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
  const youtubeRegex =
    /((https|http)?:\/\/(www\.)?(youtube\.com|youtu\.be)\/[^\s]+)/g;
  const stripTagARegex =
    /<a\b[^>]*>((https|http)?:\/\/(www\.)?(youtube\.com|youtu\.be)\/[^\s]+)<\/a>/gi;

  if (stripTagARegex.test(text) && youtubeRegex.test(text)) {
    const regex = /<a[^>]*>((youtube\.com|youtu\.be)\/[^\s]+)<\/a>/gi;
    text = text.replace(regex, 'https://$1');
    text = text.replace(stripTagARegex, '$1');
  }
  return text.replaceAll(youtubeRegex, function (url) {
    if (url) {
      let videoId = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/)[2];
      if (videoId) {
        videoId = videoId.split(/[^0-9a-z_-]/i)[0];
        if (videoId.length === 11) {
          return `
            <iframe
              width='560'
              height='315'
              src='https://www.youtube.com/embed/${videoId}/'
              title='YouTube video player'
              frameBorder='0'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
              allowFullScreen
            ></iframe>
          `;
        }
      }
    }
    return linkify(url, {
      attributes: {
        target: '_blank',
        class: 'link',
      },
    });
  });
};

/**
 * Nameifys the given text.
 * @param {string}
 * @returns {string} The Nameifyd text.
 */
const nameify = (text) => {
  const words = ['an', 'dương', 'quân'];
  words.forEach((word) => words.push(removeAccents(word)));
  const variants = words.flatMap((word) => [
    word,
    word.charAt(0).toUpperCase() + word.slice(1),
    word.toUpperCase(),
  ]);
  const regex = new RegExp(`\\b(${variants.join('|')})\\b`, 'gi');
  return text.replace(regex, `<span class="highlight">$1</span>`);
};

/**
 * Computes the final string to be displayed by replacing email addresses with mailto: links, phone numbers with tel: links, and URLs with clickable links.
 * @param {string} text The text to process.
 * @returns {string} The processed text.
 */
export const computedStr = (text) => {
  let result = nameify(text);
  result = phoneify(result);
  result = mailify(result);
  result = linkify(result, {
    attributes: {
      target: '_blank',
      class: 'link',
    },
  });
  result = youtubify(result);
  return result;
};
