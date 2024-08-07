import dayjs from "dayjs";

// takes dateTimes string and returns requested value
export function getFormattedTime(dateTimeString, req) {
  const date = dayjs(dateTimeString);
  if (req === "time24") return date.format("HH:mm"); // 18:56
  if (req === "hh") return date.format("HH"); // 18
  if (req === "min") return date.format("mm"); // 56
  if (req === "dd") return date.format("D"); // 42
  if (req === "mmm") return date.format("MMM"); // Dec
  if (req === "mmmm") return date.format("MMMM"); // December
  if (req === "yyyy") return date.format("YYYY"); // 2024
}

export function getCurrentDateInfo() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ][currentDate.getMonth()];
  const weekNumber = Math.ceil(
    ((currentDate - new Date(currentDate.getFullYear(), 0, 1)) / 86400000 +
      currentDate.getDay() +
      1) /
      7
  );
  const weekDay = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
  });

  return {
    year,
    month,
    weekAndDay: `${weekNumber} - ${weekDay}`,
  };
}

// returns calendar startDate and endDate according to selected timeframe option
export function getTimeRange(option) {
  const now = dayjs();
  let startDate, endDate;

  const getStartOfWeek = (date) => {
    const day = date.day(); // Get the current day of the week (0 = Sunday)
    const diff = (day === 0 ? -6 : 1) - day; // Calculate the difference to Monday
    return date.add(diff, "day").startOf("day");
  };

  const getEndOfWeek = (date) => {
    const day = date.day(); // 0 = Sunday
    const diff = day === 0 ? 0 : 7 - day; // Calculate the difference to Sunday
    return date.add(diff, "day").endOf("day");
  };

  const getISODate = (date) => date.toISOString();

  switch (option) {
    case "this-month":
      startDate = now.startOf("month");
      endDate = now.endOf("month").endOf("day");
      break;
    case "last-month":
      startDate = now.subtract(1, "month").startOf("month");
      endDate = now.subtract(1, "month").endOf("month").endOf("day");
      break;
    case "this-week":
      startDate = getStartOfWeek(now);
      endDate = getEndOfWeek(now).endOf("day"); // End of current week (Sunday) at 23:59
      break;
    case "last-week":
      const lastWeek = now.subtract(1, "week");
      startDate = getStartOfWeek(lastWeek);
      endDate = getEndOfWeek(lastWeek).endOf("day"); // End of last week (Sunday) at 23:59
      break;
    case "today":
      startDate = now.startOf("day");
      endDate = now.endOf("day");
      break;
    case "yesterday":
      startDate = now.subtract(1, "day").startOf("day");
      endDate = now.subtract(1, "day").endOf("day");
      break;
    default:
      startDate = now.startOf("day");
      endDate = now.endOf("day");
  }

  const result = {
    startDate: getISODate(startDate),
    endDate: getISODate(endDate),
  };
  return result;
}

export function isNumber(value) {
  return !isNaN(parseFloat(value)) && isFinite(value);
}

// returns current time as HH:mm:ss
export function getCurrentTime() {
  return dayjs().format("HH:mm:ss");
}

// returns the hh:mm difference of two dateTime strings
export function getTimeDifference(checkIn, checkOut) {
  const startTime = dayjs(checkIn);
  const endTime = dayjs(checkOut);

  const durationMinutes = endTime.diff(startTime, "minute");

  const hours = Math.floor(durationMinutes / 60);
  const minutes = durationMinutes % 60;

  // Format hours and minutes as hhMM
  const formattedHours = String(hours);
  const formattedMinutes = String(minutes);

  return `${formattedHours} h ${formattedMinutes} min`;
}

// takes dateTime string and replaces with new hours and minutes))
export function constructNewDateTime(
  originalDateTime,
  newTimeHours,
  newTimeMinutes
) {
  const date = dayjs(originalDateTime);
  const newDateTime = date
    .hour(parseInt(newTimeHours))
    .minute(parseInt(newTimeMinutes))
    .toISOString();
  return newDateTime;
}

// checks that given hh:mm time is valid
export function validateHHMM(timeString) {
  const [hoursStr, minutesStr] = timeString.split(":");
  const hours = parseInt(hoursStr, 10);
  const minutes = parseInt(minutesStr, 10);
  const isValid = hours >= 0 && hours < 24 && minutes >= 0 && minutes < 60;
  return isValid;
}
