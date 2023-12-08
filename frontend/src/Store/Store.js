import React, { useContext, useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebara from './components/Sidebar/Sidebar';
import Topbar from './components/Topbar/Topbar';
import Product from './page/Product/Product';
import Listorder from './page/Listorder/Listorder';
import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Category from './page/Category/Category';
import Info from './page/Info/Info';
import Formadd from './page/Product/Formadd';
import Formedit from './page/Product/Formedit';
import Detailorder from './page/Feedback/Detailorder';
import { ToastContainer } from 'react-toastify';
import Logout from './page/Logout/logout';
import 'react-toastify/dist/ReactToastify.css';
import Statistics from './page/Statistics/Statistics';
import './Store.css'
import Feedback from './page/Feedback/Feedback';
import { ref, onValue, child } from 'firebase/database';
import { database } from './filebase';
import { Notifications } from './components/react-push-notification';
import addNotification from './components/react-push-notification';
import { isEqual } from 'lodash';
import { useParams } from 'react-router-dom';
import axios from 'axios';


const Store = () => {
  const [latestUserData, setLatestUserData] = useState();
  const [noti, Setnoti] = useState();
  const [idsrote, Setidstore] = useState("1");
  const token = localStorage.getItem('token');
  const tokenString = localStorage.getItem('user');
  const tokenObject = JSON.parse(tokenString);
  localStorage.setItem('_id', tokenObject._id);
  const api = `https://falth-api.vercel.app/api/store/owner/${tokenObject._id}`;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(api, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const responseData = response.data.data;
        Setidstore(responseData._id);
        localStorage.setItem('_idstore', responseData._id);

        console.log(responseData._id);
      } catch (error) {
        console.error('Lỗi khi gọi API:', error);
      }
    };

    fetchData();
  }, [token]);
  const buttonClick = (notif) => {
    if (!notif.isSeen) {
      addNotification({
        title: notif.title,
        subtitle: 'thông báo từ falth',
        message: notif.message,
        theme: 'darkblue',
        native: true
      });
    }
  };

  useEffect(() => {
    if (idsrote !== "") {
      const dbRef = ref(database);
      const usersRef = child(dbRef, idsrote);
      const unsubscribe = onValue(usersRef, (snapshot) => {
        if (snapshot.exists()) {
          const allData = snapshot.val();
          Setnoti(Object.keys(allData)
            .map((key) => ({
              id: key,
              ...allData[key],
            }))
            .sort((a, b) => b.timestamp - a.timestamp)
          );

          const giaTriKhacNhau = Object.keys(allData)
            .filter((key) => !latestUserData || !isEqual(allData[key], latestUserData[key]));

          if (giaTriKhacNhau.length > 0) {
            setLatestUserData(allData);
            if (latestUserData) {
              buttonClick(allData[giaTriKhacNhau]);
            }
          }
        } else {
          setLatestUserData();
        }
      });

      return () => {
        unsubscribe();
      };
    }
  }, [latestUserData, idsrote]);


  const { id } = useParams();

  useEffect(() => {
    console.log(`Loading lại trang với ID: ${id}`);
  }, [id]);



  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebara isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} latestUserData={noti} />
            <Routes>
              <Route path="/" element={<Statistics />} />
              <Route path="/Formadd" element={<Formadd />} />
              <Route path="/Formedit/:id" element={<Formedit />} />
              <Route path="/product" element={<Product />} />
              <Route path='/listorder' element={<Listorder />} />
              <Route path='/info' element={<Info />} />
              <Route path='/category' element={<Category />} />
              <Route path="/detailorder/:id" element={<Detailorder />} />
              <Route path="/feedback" element={<Feedback />} />
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
