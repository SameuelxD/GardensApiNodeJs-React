import React, { useState } from 'react';
import './App.css';

import Header from '../components/Interfaces/Header';
import Sidebar from '../components/Interfaces/Sidebar';
import Home from '../components/Interfaces/Home';

function App({ userData }) { // Recibe userData como prop
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

    const OpenSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle)
    }

    return (
        <div className="grid-container">
            <Header OpenSidebar={OpenSidebar} userData={userData} /> {/* Pasar userData al Header */}
            <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} userData={userData} /> {/* Pasar userData al Sidebar */}
            <Home userData={userData} /> {/* Pasar userData al Home */}
        </div>
    );
}

export default App;
