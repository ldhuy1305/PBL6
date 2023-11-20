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
import Feedback from './page/Feedback/Feedback';
import Statistics from './page/Statistics/Statistics';
import './Store.css'

const Store = () => {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [Catname, setCatname] = useState([]);
  const token = localStorage.getItem('autoken');

  const fetchCatname = async () => {
    try {
      const response = await axios.get(
        'https://falth.vercel.app/api/category',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const responseData = response.data;
      console.log(responseData);
      setCatname(responseData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCatname();
  }, []);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebara isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Statistics Catname={Catname} />} />
              <Route path="/store/feedback" element={<Feedback Catname={Catname} />} />
              <Route path="/store/product" element={<Product Catname={Catname} />} />
              <Route path='/store/listorder' element={<Listorder />} />
              <Route path='/store/info' element={<Info />} />
              <Route path='/store/category' element={<Category listCat={Catname} />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default Store;
