import propTypes from 'prop-types';
import mainStyles from './mainStyles.module.scss';

/**
 * Define the Main component
 * @param {String} className The class name of mainTag
 * @param {ReactElement} children The children of mainTag
 * @param {store} store The context store state, action
 */

export default function Main({ className = '', children }) {
  const { main: mainTagStyle } = mainStyles;
  return (
    <main className={`${mainTagStyle} ${className} container`}>{children}</main>
  );
}

Main.propTypes = {
  className: propTypes.string,
  children: propTypes.node,
  store: propTypes.object,
};
