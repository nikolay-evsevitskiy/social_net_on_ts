import React from 'react';
import s from './Header.module.css';

function Header () {
    return (
        <header className={s.header}>
            <img src="https://thirdtemple.ca/wp-content/uploads/2020/10/social-media-1405601_1280.png"
                 alt="social network"/>
        </header>
    )
}

export default Header;