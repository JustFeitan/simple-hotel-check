import { useMemo } from "react";

import { userSelector } from "../../store/reducers/authSlice";
import { useAppSelector } from "./useAppSelector";

export const useAuth = () => {
    const user = useAppSelector(userSelector);
    return useMemo(() => {
        return user;
    }, [user]);
};
