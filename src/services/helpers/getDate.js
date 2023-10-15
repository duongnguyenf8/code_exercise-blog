export default function getDate(dateStr) {
  const fullDate = new Date(dateStr);
  const day = fullDate.getDate();
  const dayByWeek = fullDate.getDay();
  const hours = fullDate.getHours();
  const mins = fullDate.getMinutes();
  const date = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return {
    day,
    date: date[+dayByWeek - 1] || `Sun`,
    hours,
    mins,
  };
}
