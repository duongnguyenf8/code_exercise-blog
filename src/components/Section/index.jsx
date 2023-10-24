import propTypes from 'prop-types';
import sectionStyles from './sectionStyles.module.scss';

/**
 * @param {string} className - The class name for the section tag.
 * @param {React.ReactNode} children - The children of the section.
 */

export default function Section({ className = '', children }) {
  const { section: sectionTagStyle } = sectionStyles;
  return (
    <section className={`${sectionTagStyle} ${className}`}>{children}</section>
  );
}
Section.propTypes = {
  className: propTypes.string,
  children: propTypes.node,
};
