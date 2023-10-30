import { useEffect, useState } from 'react';
import './MuiDatePicker.scss';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { formatDate, calculateTimeDifference } from '../../helpers/formatDate';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { accessToast, failedToast } from '../../helpers/toastify';

const MuiDatePicker = ({ setUseTime, checkUseTime }) => {
  const [value, setValue] = useState(null);
  const handleDateChange = (newValue) => {
    const checkNull = Object.values(newValue).some(
      (value) => value === null || Number.isNaN(value)
    );
    const timeDiff = calculateTimeDifference(newValue);
    if (timeDiff === 'Vui lòng chọn lại thời gian đăng bài!') {
      failedToast('Vui lòng chọn lại thời gian đăng bài!');
    } else {
      if (!checkNull) {
        accessToast(
          `Bài viết của bạn sẽ được đăng vào ${formatDate(
            newValue.$d
          )} (${timeDiff}`
        );
        setValue(newValue);
        setUseTime(true);
      }
    }
  };
  useEffect(() => {
    if (!checkUseTime) {
      setValue(null);
    }
  }, [checkUseTime]);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label='Set time to post'
        value={value}
        onChange={handleDateChange}
        renderInput={(props) => <TextField {...props} />}
      />
    </LocalizationProvider>
  );
};

export default MuiDatePicker;
