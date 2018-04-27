import React from 'react';
import { Link } from 'react-router-dom';
const Navigation = () => {
    return (
                <nav className="c-navbar">
                    <Link to="/" className="logo">
                        <img src="../../img/logo-white.svg" alt=""/>
                    </Link>
                    <ul className="menu" role="navigation">
                        <li className="menu-item">Chapters
                            <ul className='sub-menu'>
                                <li>01 Downtown In Context</li>
                                <li>02 Public Life</li>
                            </ul>
                        </li>
                        <li className="menu-item">Contact</li>
                    </ul>
                    <ul className="menu__mobile">
                        <li>MENU</li>
                    </ul>
                </nav>
    );
};

export default Navigation;