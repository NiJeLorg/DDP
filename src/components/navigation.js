import React from 'react';
import { Link } from 'react-router-dom';
const Navigation = () => {
    return (
                <nav className="navbar">
                    <Link to="/" className="logo">
                        <img src="../../img/logo.svg" alt=""/>
                    </Link>
                    <ul className="menu" role="navigation">
                        <li className="menu-item">Stories</li>
                        <li className="menu-item">Contact</li>
                    </ul>
                </nav>
    );
};

export default Navigation;