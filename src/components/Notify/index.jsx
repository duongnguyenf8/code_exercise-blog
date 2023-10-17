import { createRef, useEffect, useState } from 'react';
import propTypes from 'prop-types';
import notifyIcon from '@/assets/images/notify.svg';
import notifyStyles from './notifyStyles.module.scss';
/**
 * Define the Notify component
 * @param {string} [message] - The notify message.
 * @param {'success' | 'failed'} [type='success'] - The notify type. Can be either 'success' or 'failed'. Defaults to 'success'.
 * @param {number} [timeout=3] - The notify duration in seconds. Defaults to 3 seconds.
 * @param {string} [position='top-left'] - The notify position. Defaults to 'top-left'.
 * @param {string} [className] - The notify class name. Can be used to apply custom styles.
 */

export default function Notify({
  message = '',
  type = 'success',
  timeout = 3,
  position = 'top-left',
  className = '',
}) {
  const [pause, setPause] = useState(false);
  const notifyRef = createRef();
  const timeLineRef = createRef();
  const {
    notify: notifyTagStyle,
    success: notifySuccessStyle,
    failed: notifyFailedStyle,
    message: messageTagStyle,
    timeline: timelineStyle,
    line: lineStyle,
    'notify-icon': notifyIconStyle,
    'top-left': positionTopLeftStyle,
    'top-right': positionTopRightStyle,
    'bottom-left': positionBottomLeftStyle,
    'bottom-right': positionBottomRightStyle,
  } = notifyStyles;
  const classNamePosition = () => {
    switch (position) {
      case 'top-left':
        return positionTopLeftStyle;
      case 'top-right':
        return positionTopRightStyle;
      case 'bottom-left':
        return positionBottomLeftStyle;
      case 'bottom-right':
        return positionBottomRightStyle;
      default:
        return positionTopLeftStyle;
    }
  };
  const classNameNotify = `${notifyTagStyle} ${classNamePosition()}
   ${
     type === 'success' ? notifySuccessStyle : notifyFailedStyle
   } ${className}`.trim();
  useEffect(() => {
    const parent = notifyRef.current.parentNode;
    const child = notifyRef.current;
    !pause && (parent.removeChild?.(child), parent?.appendChild?.(child));
  }, [timeout, pause, notifyRef]);
  if (message) {
    return (
      <div
        className={classNameNotify}
        style={{
          animationDuration: `${timeout}s`,
        }}
        onMouseOver={() => {
          notifyRef.current.style.animationPlayState = 'paused';
          timeLineRef.current.style.animationPlayState = 'paused';
          setPause(true);
        }}
        onMouseOut={() => {
          notifyRef.current.style.animationPlayState = 'running';
          timeLineRef.current.style.animationPlayState = 'running';
          setPause(false);
        }}
        ref={notifyRef}>
        <span className={messageTagStyle}>
          {message}
          {message.slice(-1) !== '!' ? '!' : ''}
        </span>
        <img src={notifyIcon} alt={message} className={notifyIconStyle} />
        <div
          className={`${timelineStyle} ${
            type === 'success' ? notifySuccessStyle : notifyFailedStyle
          }`}>
          <div
            className={`${lineStyle}`}
            style={{
              // 1.2 because the timing function of classNameNotify is custom cubic
              animationDuration: `${timeout / 1.2}s`,
            }}
            ref={timeLineRef}
          />
        </div>
      </div>
    );
  }
}
Notify.propTypes = {
  message: propTypes.string,
  type: propTypes.oneOf(['success', 'failed']),
  timeout: propTypes.number,
  position: propTypes.oneOf([
    'top-left',
    'top-right',
    'bottom-left',
    'bottom-right',
  ]),
  className: propTypes.string,
};
