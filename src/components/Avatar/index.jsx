import propTypes from 'prop-types';
import Links from '@/components/Links';
import avatarStyles from './avatar.module.scss';

/**
 * Define the Avatar component
 * @param {String} name - The name of the user
 */

export default function Avatar({ name, to = '#' }) {
  const {
    wrap: wrapTagStyle,
    avatar: avatarTagStyle,
    name: nameTagStyle,
  } = avatarStyles;
  /**
   * Check if the name prop is defined and of type string
   */
  if (!name || typeof name !== 'string')
    return (
      <Links to={'#'} className={wrapTagStyle}>
        <span className={avatarTagStyle}>A</span>{' '}
        <span className={nameTagStyle}>Avatar</span>
      </Links>
    );
  /**
   * Clean the name string by removing multiple spaces and trimming the beginning and end
   */
  name = name.replace(/\s{2,}/g, ' ').trim();
  /**
   * Get the first character of the name and convert it to uppercase
   */
  const firstChar = name.charAt(0).toUpperCase();
  /**
   * Get the position of the first space character in the name and add 1 to get the index of the first character after the space
   */
  const avatarPosition = name.lastIndexOf(' ') + 1;
  return (
    <Links to={to} className={wrapTagStyle}>
      <span
        className={avatarTagStyle}
        data-name={name.charAt(avatarPosition)}
        alt={name}
      />{' '}
      <span className={nameTagStyle}>{firstChar + name.slice(1)}</span>
    </Links>
  );
}

Avatar.propTypes = {
  to: propTypes.string,
  name: propTypes.string.isRequired,
};
