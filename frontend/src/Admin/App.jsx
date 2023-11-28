
import Sidebara from './components/Sidebar/Sidebar'
import './App.css'
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';
import Topbar from './components/Topbar/Topbar';
import ManageStore from './Page/ManageStore/ManageStore';
import Acceptstore from './Page/Acceptstore/Acceptstore';
import Detailstore from './Page/ManageStore/Detailstore';
import Comments from './components/Comment/Comment';
import ManageShipper from './Page/ManageShipper/ManageShipper';
import ViewAllShipper from './Page/ManageShipper/ViewAllShipper';
import { LanguageProvider } from './services/languageContext';
import ManageUser from "./Page/ManageUser/ManageUser"
import Statistics from "./Page/Statistics/Statistics"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logout from './Page/Logout/logout';
import DetailShipper from './Page/ManageShipper/DetailShipper'


const App = () => {
    const [theme, colorMode] = useMode();
    const [isSidebar, setIsSidebar] = useState(true);
    const tokenString = localStorage.getItem('user');
    const tokenObject = JSON.parse(tokenString);
    localStorage.setItem('_id', tokenObject._id);



    return (
        <LanguageProvider>
            <ColorModeContext.Provider value={colorMode}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <div className="app">
                        <Sidebara isSidebar={isSidebar} />
                        <main className="content">
                            <Topbar setIsSidebar={setIsSidebar} />
                            <Routes>
                                <Route path="/ManageStore" element={<ManageStore />} />
                                <Route path="/Acceptstore" element={<Acceptstore />} />
                                <Route path="/ViewAllShipper" element={<ViewAllShipper />} />
                                <Route path="/ManageShipper" element={<ManageShipper />} />
                                <Route path="/" element={<Statistics />} />
                                <Route path='/ManageUser' element={<ManageUser />} />
                                <Route path='/Detailstore' element={<Detailstore />} />
                                <Route path='/DetailShipper' element={<DetailShipper />} />
                                <Route path="/logout" element={<Logout />} />
                            </Routes>
                        </main>
                        <ToastContainer />
                    </div>
                </ThemeProvider>
            </ColorModeContext.Provider>
        </LanguageProvider>
    )
}

export default App

