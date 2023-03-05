export const plusOneYear = (date: Date) => {
    const copyDate = new Date(date);
    copyDate.setDate(date.getFullYear() + 1)
    return copyDate
}
