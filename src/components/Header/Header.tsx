import {FC} from 'react';
import './Header.scss';
import Button from "../UI/Button/Button";
import LogoutIcon from "../UI/Icons/LogoutIcon";
import {useActions} from "../../hooks/redux/useActions";
import {authActions} from "../../store/reducers/authSlice";

const Header: FC = () => {
    const {logout} = useActions(authActions);
    const handleLogout = () => {
        logout();
    }
    return (
        <header className='header'>
            <h1 className='header__title'>Simple Hotel Check</h1>
            <Button
                onClick={handleLogout}
                className='header__logout-btn'
                type='button'
                rightIcon={<LogoutIcon/>}
                width={93}
            >
                Выйти
            </Button>
        </header>
    );
};

export default Header;
