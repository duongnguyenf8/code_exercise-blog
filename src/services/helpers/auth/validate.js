/**
 * Validates the given value based on the given type.
 * @param {('email'|'password')} type - The type of the value.
 * @param {string} value - The value to validate.
 * @returns {string} The error message if the value is invalid, otherwise an empty string.
 */
export const validate = (type, value) => {
  let errorMessage = '';

  if (type === 'email') {
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
    if (!emailRegex.test(value)) {
      errorMessage = 'Email không hợp lệ';
    }
  } else if (type === 'password') {
    if (value.length < 8) {
      errorMessage = 'Mật khẩu phải có ít nhất 8 ký tự';
    } else if (!/[A-Z]/.test(value)) {
      errorMessage = 'Mật khẩu phải chứa ít nhất một chữ cái hoa';
    } else if (!/[a-z]/.test(value)) {
      errorMessage = 'Mật khẩu phải chứa ít nhất một chữ cái thường';
    } else if (!/[0-9]/.test(value)) {
      errorMessage = 'Mật khẩu phải chứa ít nhất một chữ số';
    }
  }

  return errorMessage;
};
