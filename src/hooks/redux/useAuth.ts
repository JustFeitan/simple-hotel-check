import {useAppSelector} from "./useAppSelector";
import {userSelector} from "../../store/reducers/authSlice";
import {useMemo} from "react";

export const useAuth = () => {
    const user = useAppSelector(userSelector);
    return useMemo(() => {
        return user;
    }, [user])
}
