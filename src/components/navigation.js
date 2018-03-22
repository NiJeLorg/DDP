import React from 'react';

const Navigation = () => {
    return (
            <div>
                <nav className="navbar">
                    <div className="logo">
                        <img src="../../img/logo.svg" alt=""/>
                    </div>
                    <ul className="menu" role="navigation">
                        <li className="menu-item">Stories</li>
                        <li className="menu-item">Contact</li>
                    </ul>
                </nav>
            </div>
    );
};

export default Navigation;