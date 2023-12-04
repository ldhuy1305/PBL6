import React, { useContext, useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebara from './components/Sidebar/Sidebar';
import Topbar from './components/Topbar/Topbar';
import Product from './page/Product/Product';
import Listorder from './page/Listorder/Listorder';
import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Category from './page/Category/Category';
import Login from './login';
import Info from './page/Info/Info';
import axios from 'axios';
import Formadd from './page/Product/Formadd';
import Formedit from './page/Product/Formedit';
import Detailorder from './page/Feedback/Detailorder';
import { ToastContainer } from 'react-toastify';
import Logout from './page/Logout/logout';
import 'react-toastify/dist/ReactToastify.css';

import Statistics from './page/Statistics/Statistics';

import './Store.css'

const Store = () => {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const tokenString = localStorage.getItem('user');
  const tokenObject = JSON.parse(tokenString);
  localStorage.setItem('_id', tokenObject._id);



  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebara isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Statistics />} />
              <Route path="/Formadd" element={<Formadd />} />
              <Route path="/Formedit" element={<Formedit />} />
              <Route path="/product" element={<Product />} />
              <Route path='/listorder' element={<Listorder />} />
              <Route path='/info' element={<Info />} />
              <Route path='/category' element={<Category />} />
              <Route path="/detailorder" element={<Detailorder />} />
              <Route path="/logout" element={<Logout />} />
            </Routes>
            <ToastContainer />
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>

  );
};

export default Store;
