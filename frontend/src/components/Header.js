// src/components/Header.js

import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ toggleSidebar }) => {
    return (
        <header>
            <h1 className='logo'>Banner<span>Craft</span></h1>
            {/* Button to open sidebar */}
            <nav>
                <button>Home</button>
                <button onClick={toggleSidebar}>Open Dashboard</button>
            </nav>
        </header>
    );
};

export default Header;
