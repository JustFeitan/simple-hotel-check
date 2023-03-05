export const formatDateToInputValue = (date: Date) => {
    const copyDate = new Date(date);
    return copyDate.toISOString().slice(0, 10);
}
