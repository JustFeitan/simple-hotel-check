import {FC} from 'react';
import {Navigate} from "react-router-dom";
import {useAuth} from "../hooks/redux/useAuth";

interface AuthRequiredProps {
    children: JSX.Element
}

const AuthRequired: FC<AuthRequiredProps> = ({children}) => {
    const user = useAuth();

    if (!user) {
        return <Navigate to='/login'/>
    }

    return children;
};

export default AuthRequired;
