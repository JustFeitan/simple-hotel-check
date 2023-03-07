import { addDays, format } from "date-fns";

export const getCheckOutDate = (checkInDateStr: string, daysOfStay: number) => {
    const checkOutDate = addDays(Date.parse(checkInDateStr), daysOfStay);
    return format(checkOutDate, "yyyy-MM-dd");
};
