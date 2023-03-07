import { addDays } from "date-fns";

export const formatDateToInputValue = (date: Date) => {
    const copyDate = new Date(date);
    const today = addDays(copyDate, 1);
    return today.toISOString().slice(0, 10);
};
