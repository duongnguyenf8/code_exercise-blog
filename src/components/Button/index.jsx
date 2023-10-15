import propTypes from 'prop-types';
import buttonStyles from './buttonStyles.module.scss';

/**
 * Define the Button component
 * @param {string} type - The button type.
 * @param {string} [style='primary'] - The button style. Can be either 'primary' or 'second'. Defaults to 'primary'.
 * @param {string} [styles=''] - The button style. Can be used to apply
 * @param {string} className - The button class name. Can be used to apply custom styles.
 * @param {string} title - The button title. Only applicable for regular buttons.
 * @param {node} children - The button content. Only applicable for regular buttons.
 * @param {function} onClick - The button click event handler.
 * @param {boolean} disabled - Whether the button is disabled or not.
 */

export default function Button({
  type = 'button',
  style = 'primary',
  styles = {},
  className = '',
  title,
  children,
  onClick,
  disabled,
}) {
  const {
    button: buttonTagStyle,
    primary: buttonPrimaryStyle,
    secondary: buttonSecondStyle,
  } = buttonStyles;
  /**
   * Define the button styles based on the type prop
   */
  const buttonStyle =
    style === 'primary' ? buttonPrimaryStyle : buttonSecondStyle;
  const computedClass = `${buttonTagStyle} ${buttonStyle} ${className}`.trim();
  return (
    <button
      className={computedClass}
      onClick={onClick}
      disabled={disabled}
      title={title}
      style={styles}
      type={type}>
      {title || children}
    </button>
  );
}

Button.propTypes = {
  style: propTypes.oneOf(['primary', 'secondary']),
  styles: propTypes.object,
  className: propTypes.string,
  type: propTypes.string,
  title: propTypes.string,
  children: propTypes.node,
  onClick: propTypes.func,
  disabled: propTypes.bool,
};
