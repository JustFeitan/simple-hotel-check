export const plusOneDay = (date: Date) => {
    const copyDate = new Date(date);
    copyDate.setDate(date.getDate() + 1);
    return copyDate;
};
