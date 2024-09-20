import axios from "axios";
import { toast } from "react-toastify";
export function validateGmail(email) {
  const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  return gmailRegex.test(email);
}
export function validateIndianMobileNumber(mobileNumber) {
  const indianMobileRegex = /^[6-9]\d{9}$/;
  return indianMobileRegex.test(mobileNumber);
}
export const fetchUser = async (setUser) => {
  try {
    const response = await axios.get(`${backendUrl}/api/users/all-user`);

    if (response.status === 200) {
      setUser(response.data);
    } else {
      toast.error(response.data.message, {
        position: "top-left",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message, {
      position: "top-left",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }
};
export const updateData = async (user) => {
  try {
    const response = await axios.post(
      `${backendUrl}/api/users/edit-user`,
      user,
    );
    if (response.status === 200) {
      toast.success(response.data.message, {
        position: "top-left",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast.error(response.data.message, {
        position: "top-left",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message, {
      position: "top-left",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }
};
// export const backendUrl = "http://localhost:5000";
export const backendUrl = "https://api.itcportals.com"
export const formatDate = (date) => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = String(d.getFullYear()).slice(-2); // Get last two digits of the year
  return { date: `${day}/${month}`, count: Number(day) + Number(month) };
};
// export function sumDateAndMonth() {
//   const today = new Date();
//   const currentDate = today.getDate(); // Get the current date (day)
//   const currentMonth = today.getMonth() + 1; // Get the current month (0-based, so we add 1)
//   return currentDate + currentMonth;
// }
export function sumDateAndMonth(dateCount, shadualeTime) {
  const coming = shadualeTime.split("/");
  const comingDate = Number(coming[0]);
  const comingMonth = Number(coming[1]);

  const today = new Date();
  const currentDate = today.getDate();
  const currentMonth = today.getMonth() + 1;
  if (comingMonth > currentMonth) {
    return false
  }
  if (comingMonth < currentMonth) {
    return true
  }
  if (comingMonth === currentMonth) {
    if (currentDate === comingDate || currentDate > comingDate) {
      return true
    }
    if (currentDate < comingDate) {
      return false
    }

  }
}




export function compareTimes(matchingTime) {
  // Helper function to convert time to minutes from midnight
  if (!matchingTime) {
    return true
  }
  function timeToMinutes(time) {
    const [hours, minutes] = time.slice(0, -2).split(':').map(Number);
    const isPM = time.includes('pm');
    let totalMinutes = (hours % 12) * 60 + minutes; // Convert to minutes
    if (isPM) totalMinutes += 12 * 60; // Add 12 hours for PM times
    return totalMinutes;
  }

  // Get current time in hours and minutes
  const currentDate = new Date();
  let hours = currentDate.getHours();
  let minutes = currentDate.getMinutes();
  let period = hours >= 12 ? 'pm' : 'am';

  // Convert 24-hour time to 12-hour format
  hours = hours % 12 || 12; // Convert '0' hours to '12' for midnight
  const currentTime = `${hours}:${minutes.toString().padStart(2, '0')}${period}`;

  console.log("Current Time:", currentTime); // For debugging

  const currentMinutes = timeToMinutes(currentTime.toLowerCase());
  const matchingMinutes = timeToMinutes(matchingTime.toLowerCase());

  if (currentMinutes > matchingMinutes) {
    return true;
  } else if (currentMinutes === matchingMinutes) {
    return true;
  } else {
    return false;
  }
}