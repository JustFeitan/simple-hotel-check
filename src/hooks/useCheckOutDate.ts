import {parseStringToDate} from "../helpers/dateHelpers/parseStringToDate";
import {plusOneDay} from "../helpers/dateHelpers/plusOneDay";
import {useMemo} from "react";
import {formatDateToInputValue} from "../helpers/dateHelpers/formatDateToInputValue";

export const useCheckOutDate = (checkInDateStr: string) => {

    return useMemo(() => {
        const checkInDate = parseStringToDate(checkInDateStr);
        const checkOutDate = plusOneDay(checkInDate);
        return formatDateToInputValue(checkOutDate)
    }, [checkInDateStr])

}
