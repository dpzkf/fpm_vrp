import { format, formatISO, parseISO } from "date-fns";

export const convertTimeToISOString = (timeString: string) => {
  const baseDate = new Date();
  const baseDateString = formatISO(baseDate, { representation: "date" }); // 'YYYY-MM-DD'

  // Combine the base date with the time string
  const dateTimeString = `${baseDateString}T${timeString}`;

  // Parse the combined string to a Date object
  const date = new Date(dateTimeString);

  // Convert the Date object to an ISO string
  return date.toISOString();
};

export const formatISOStringToTime = (time?: string) => {
  if (!time) return;
  const parsedTime = parseISO(time);
  return format(parsedTime, "HH:mm");
};

export const formatDateToISOString = (date: Date) => {
  return formatISO(date, { representation: "complete" });
};
