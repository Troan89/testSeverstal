import logo from "../../assets/logo.jpg";
import s from './header.module.css'
import {NavLink} from "react-router-dom";

export const Header = () => {
    return (
        <header className={s.header}>
            <img src={logo} alt=""/>
            <div className={s.nav}>
                <NavLink to={'/orders'} > Заказы </NavLink>
                <NavLink to={'/products'} > Товары </NavLink>
            </div>
        </header>
    );
};
