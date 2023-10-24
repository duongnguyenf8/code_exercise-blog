import propTypes from 'prop-types';
import Links from '@/components/Links';
import tagStyles from './tagStyles.module.scss';

/**
 * Define the Tag component
 * @param {object} props - The component props
 * @param {string} [props.to='#'] - The link destination. Can be a string for a relative path or an object with a `pathname` and `search` property for an absolute path. Defaults to '#'.
 * @param {string} [props.text] - The tag text.
 * @param {string} [props.className] - The tag class name. Can be used to apply custom styles.
 */

export default function Tag({
  to = '#',
  text = '',
  title = text,
  className = '',
}) {
  const { tag: tagTagStyle } = tagStyles;

  return (
    <Links to={to} className={`${tagTagStyle} ${className}`}>
      {title.toLowerCase().trim()}
    </Links>
  );
}
Tag.propTypes = {
  to: propTypes.oneOfType([
    propTypes.string,
    propTypes.shape({
      pathname: propTypes.string,
      search: propTypes.string,
    }),
  ]),
  text: propTypes.string,
  title: propTypes.string,
  className: propTypes.string,
};
