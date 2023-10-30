export function formatDate(time) {
  const date = new Date(time);
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const currentHours = new Date().getHours();
  const currentMinutes = new Date().getMinutes();
  return `${day}/${month + 1}/${year} ${currentHours}h:${currentMinutes}phút`;
}

export function calculateTimeDifference(selectedTime) {
  const currentDate = new Date();
  const targetDate = new Date(selectedTime);

  const diffInMilliseconds = targetDate - currentDate;
  const notiSelectAgain = "Vui lòng chọn lại thời gian đăng bài!";
  if (diffInMilliseconds < 0) {
    // If the target time is in the past or equal to current time, return an empty string
    return notiSelectAgain;
  }

  const days = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (diffInMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor(
    (diffInMilliseconds % (1000 * 60 * 60)) / (1000 * 60)
  );
  const seconds = Math.floor((diffInMilliseconds % (1000 * 60)) / 1000);

  let result = "Còn ";

  if (days > 0) {
    result += days + " ngày ";
  }
  if (hours > 0) {
    result += hours + " giờ ";
  }
  if (minutes > 0) {
    result += minutes + " phút ";
  }
  if (seconds > 0) {
    result += seconds + " giây ";
  }

  return result.trim(); // Trim any trailing space
}
