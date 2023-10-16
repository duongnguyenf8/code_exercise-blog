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
  const hours = format.hours();
  const mins = format.minutes();
  const arrayDate = [
    'Chủ nhật',
    'Thứ 2',
    'Thứ 3',
    'Thứ 4',
    'Thứ 5',
    'Thứ 6',
    'Thứ 7',
  ];
  const date = arrayDate[format.day()];
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
