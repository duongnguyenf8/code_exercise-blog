import propTypes from 'prop-types';
import { useId } from 'react';
import textareaStyles from './textareaStyles.module.scss';
/**
 * A textarea component with a label.
 * @param {object} props - The props of the component.
 * @param {string} [props.name] - The name of the textarea.
 * @param {string} [props.placeholder] - The placeholder of the textarea.
 * @param {string} [props.className] - The class of the textarea.
 * @param {string} [props.value] - The value of the textarea.
 * @param {function} [props.onChange] - The function that is called when the textarea value changes.
 */
export default function Textarea({
  name = '',
  className = '',
  value = '',
  placeholder = name,
  onChange = () => {},
}) {
  const id = useId();
  const { textarea: textareaStyle, label: labelStyle } = textareaStyles;
  return (
    <div className='textarea-group column'>
      <label htmlFor={id} className={labelStyle}>
        Enter Your {placeholder}
      </label>
      <textarea
        id={id}
        name={name}
        className={textareaStyle + ' ' + className}
        value={value}
        onChange={onChange}
        placeholder={placeholder + ' here...'}></textarea>
    </div>
  );
}
Textarea.propTypes = {
  name: propTypes.string,
  placeholder: propTypes.string,
  className: propTypes.string,
  value: propTypes.string,
  onChange: propTypes.func,
};
