import moment from 'moment/min/moment-with-locales';
moment.locale('vi');
/**
 * Get date from date string
 * @param {string} dateStr - Date string
 * @returns {object} - Object contains date information
 */
export default function getDate(dateStr) {
  const fullDate = new Date(dateStr);
  const format = moment(fullDate);
  const year = format.year();
  const months = format.month();
  const day = format.date();
  const date = format.date();
  const hours = format.hours();
  const mins = format.minutes();
  return {
    moment: format,
    year,
    months,
    day,
    date,
    hours,
    mins,
  };
}
