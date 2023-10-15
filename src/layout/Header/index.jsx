import propTypes from 'prop-types';
import headerStyles from './headerStyles.module.scss';

/**
 * @param {string} className - The class name for the header tag.
 * @param {React.ReactNode} children - The children of the header.
 */

export default function Header({ className = '', children }) {
  const { header: headerTagStyle } = headerStyles;
  return (
    <header className={`${headerTagStyle} ${className}`}>
      <div className='container'>{children}</div>
    </header>
  );
}
Header.propTypes = {
  className: propTypes.string,
  children: propTypes.node,
};
