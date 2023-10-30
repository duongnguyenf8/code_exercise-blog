/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./MuiDatePicker.scss";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { formatDate, calculateTimeDifference } from "../../helpers/formatDate";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { accessToast, failedToast } from "../../helpers/toastify";

const MuiDatePicker = () => {
  const [value, setValue] = useState(null);
  const [timeDifference, setTimeDifference] = useState(null);

  const handleDateChange = (newValue) => {
    setValue(newValue);

    const timeDiff = calculateTimeDifference(newValue);
    setTimeDifference(timeDiff);

    if (timeDiff === "Vui lòng chọn lại thời gian đăng bài!") {
      failedToast("Vui lòng chọn lại thời gian đăng bài!");
    } else {
      accessToast(
        `Bài viết của bạn sẽ được đăng vào ${formatDate(
          newValue.$d
        )} (${timeDiff}`
      );
    }
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Set time to post"
        value={value}
        onChange={handleDateChange}
        renderInput={(props) => <TextField {...props} />}
      />
    </LocalizationProvider>
  );
};

export default MuiDatePicker;
