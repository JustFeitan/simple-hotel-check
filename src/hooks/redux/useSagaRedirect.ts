import {useNavigate} from "react-router-dom";
import {useCallback, useEffect} from "react";
import {useAppSelector} from "./useAppSelector";

export const useSagaRedirect = () => {
    const navigate = useNavigate();
    const {redirectTo} = useAppSelector(state => state.navigateReducer);
    useCallback(() => {
        console.log('redirect to',redirectTo)
        if (redirectTo) {
            console.log('sagaredirect work')
            navigate(redirectTo)
        }
    }, [redirectTo])
}
