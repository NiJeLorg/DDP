import React from 'react';

const Navigation = () => {
    return (
                <nav className="navbar">
                    <div className="logo">
                        <img src="../../img/logo.svg" alt=""/>
                    </div>
                    <ul className="menu" role="navigation">
                        <li className="menu-item">Stories</li>
                        <li className="menu-item">Contact</li>
                    </ul>
                </nav>
    );
};

export default Navigation;