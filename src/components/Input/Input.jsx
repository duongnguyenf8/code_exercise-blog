import propTypes from 'prop-types';
import inputStyles from './inputStyles.module.scss';
import { useId } from 'react';
/**
 * Input component
 * @param {string} name - input name
 * @param {string} type - input type
 * @param {string} value - input value
 * @param {string} regex - input pattern
 * @param {string} className - input class
 * @param {function} onBlur - function to be called when input loses focus
 * @param {function} onInput - function to be called when input changes
 * @param {function} onChange - function to be called when input value changes
 * @param {string} placeholder - placeholder text
 */
export default function Input({
  name = '',
  value = '',
  type = 'text',
  className = '',
  placeholder = '',
  regex = '',
  onBlur = () => {},
  onInput = () => {},
  onChange = () => {},
}) {
  const id = useId();
  const { input: inputStyle, label: labelStyle } = inputStyles;
  const classInput = `${inputStyle} ${className}`.trim();
  if (regex) {
    type = 'text';
    value = value.replace(regex, '');
  }
  return (
    <div className='form-control'>
      <label htmlFor={id} className={labelStyle}>
        Enter Your {placeholder}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onBlur={onBlur}
        onInput={onInput}
        onChange={onChange}
        required={regex !== ''}
        className={classInput}
        placeholder={'Please enter the ' + placeholder}
      />
    </div>
  );
}

Input.propTypes = {
  name: propTypes.string,
  type: propTypes.string,
  value: propTypes.string,
  regex: propTypes.string,
  className: propTypes.string,
  placeholder: propTypes.string,
  onBlur: propTypes.func,
  onInput: propTypes.func,
  onChange: propTypes.func,
};
