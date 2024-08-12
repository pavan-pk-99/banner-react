// src/App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Dashboard from './components/Dashboard'; // Updated Dashboard component
import './styles.css';

function App() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    return (
        <Router>
            <div className="App">
                <Header toggleSidebar={toggleSidebar} />
                {isSidebarOpen && (
                    <div className="sidebar">
                        <button onClick={closeSidebar} className="close-btn">Close</button>
                        <h1 className='logo'>Banner<span>Craft</span></h1>
                        <nav>
                            <Dashboard closeSidebar={closeSidebar} /> {/* Updated Dashboard with automatic updates */}
                        </nav>
                    </div>
                )}
                <div className={`content ${isSidebarOpen ? 'shifted' : ''}`}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                    </Routes>
                </div>
                <footer>
                    <p>&copy; 2024 My Website | Contact: pavankumarp2003@gmail.com</p>
                </footer>
            </div>
        </Router>
    );
}

export default App;
