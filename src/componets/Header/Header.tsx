import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Header.module.css';
type HeaderType = {
    isAuth: boolean
    login: string

}

function Header(props: HeaderType) {
    return (
        <header className={s.header}>
            <img src="https://thirdtemple.ca/wp-content/uploads/2020/10/social-media-1405601_1280.png"
                 alt="social network"/>
            <div className={s.loginBlock}>
                {props.isAuth ? props.login : <NavLink to={'/login'}>Login</NavLink>}
            </div>
        </header>
    )
}

export default Header;