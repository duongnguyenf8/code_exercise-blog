import propTypes from 'prop-types';
import { useLocation, Link, NavLink } from 'react-router-dom';
import { endpoint } from '../../services/configs';

/**
 * A custom link component that supports highlighting the current page and
 * navigating to different pages.
 * @param {string} to - The link destination. Can be a string for a relative path or an object with a `pathname` and `search` property for an absolute path. Defaults to '/'.
 * @param {'nav' | 'link'} type - The link type. Can be either 'nav' for a navigation link or 'link' for a regular link. Defaults to 'link'.
 * @param {string} title - The link title. Only applicable for regular links.
 * @param {node} children - The link content. Only applicable for regular links.
 * @param {string} className - The link class name. Can be used to apply custom styles or add hover effects.
 */

export default function Links({
  to = endpoint.blogs,
  type = 'link',
  title,
  children,
  className = '',
}) {
  const location = useLocation();
  return (
    <>
      {location.pathname === to ? (
        // If the current page is the link, render an anchor tag with a highlighted class
        <a href='#' className={`${className} highlight link`}>
          {title || children}
        </a>
      ) : (
        // Otherwise, render a NavLink or a regular link depending on the type prop
        <span className='link'>
          {type === 'nav' ? (
            // If the type is nav, render a NavLink
            <NavLink
              to={to}
              className={className}
              target={to.startsWith('http') ? '_blank' : ''}>
              {title || children}
            </NavLink>
          ) : (
            // Otherwise, render a regular link
            <Link
              to={to}
              className={className}
              target={to.startsWith('http') ? '_blank' : ''}>
              {title || children}
            </Link>
          )}
        </span>
      )}
    </>
  );
}
Links.propTypes = {
  to: propTypes.oneOfType([
    propTypes.string,
    propTypes.shape({
      pathname: propTypes.string,
      search: propTypes.string,
    }),
  ]),
  type: propTypes.oneOf(['nav', 'link']),
  title: propTypes.string,
  children: propTypes.node,
  className: propTypes.string,
};
