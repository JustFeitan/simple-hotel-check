import {format} from "date-fns";
import ru from 'date-fns/locale/ru'

export const formatDateWithFnsFormat =(date: Date | string, formatOfDate: string) => {
    if (typeof date === 'string') {
        return format(new Date(date), formatOfDate, {locale: ru})
    }
    return format(date, formatOfDate, {locale: ru});
}
