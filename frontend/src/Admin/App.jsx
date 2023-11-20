
import Playground from './components/Sidebar/Sidebar'
import {
    createBrowserRouter,
    RouterProvider,
    Outlet
} from "react-router-dom";
import './App.css'
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Topbar from './components/Topbar/Topbar';
import ManageStore from './Page/ManageStore/manageStore';
import Acceptstore from './Page/Acceptstore/Acceptstore';
import Comments from './components/Comment/Comment';
import ManageShipper from './Page/ManageShipper/ManageShipper';
import ViewAllShipper from './Page/ManageShipper/ViewAllShipper';
import { LanguageProvider } from './services/languageContext';
import ManageUser from "./Page/ManageUser/ManageUser"


const App = () => {
    const [theme, colorMode] = useMode();
    const [Catname, setCatname] = useState([]);
    const token = localStorage.getItem('autoken');
    const [Admin, setAdmin] = useState([]);
    const [isSidebar, setIsSidebar] = useState(true);
    const Login = async () => {
        try {
            const response = await axios.post('https://falth.vercel.app/api/auth/login/', {
                email: 'admin@gmail.com',
                password: 'leduchuy123',
            });
            const token = response.data.token;
            const _id = response.data.data.user._id;
            localStorage.setItem('autoken', token);
            localStorage.setItem('_id', _id);
            console.log('Đăng nhập thành công');
            setAdmin(response.data.data.user);
        } catch (error) {
            console.log('Lỗi đăng nhập:', error);
        }
    };
    const fetchCatname = async () => {
        try {
            const response = await axios.get(`https://falth.vercel.app/api/category`
                , {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
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
    useEffect(() => {
        Login();
    }, []);



    const Layout = () => {
        return (
            <LanguageProvider>
                <ColorModeContext.Provider value={colorMode}>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        <div className="app" style={{ display: 'flex', height: 'auto', minHeight: '100vh' }}>
                            <Playground isSidebar={isSidebar} Admin={Admin} />
                            <main className="content" style={{ width: '100%', borderLeft: '1px solid white', }}>
                                <Topbar />
                                <Outlet />
                            </main>
                        </div>
                    </ThemeProvider>
                </ColorModeContext.Provider>
            </LanguageProvider>
        )
    }

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            children: [
                {
                    path: '/Acceptstore',
                    element: <Acceptstore />
                },
                {
                    path: '/ViewAllShipper',
                    element: <ViewAllShipper />
                },
                {
                    path: '/comments',
                    element: <Comments />
                },
                {
                    path: '/',
                    element: <ManageStore />
                },
                {
                    path: '/ManageShipper',
                    element: <ManageShipper />
                },
                {
                    path: '/ManageShipper',
                    element: <ManageShipper />
                },
                {
                    path: '/ManageUser',
                    element: <ManageUser />
                },
            ]
        },
    ]);
    return (
        <div>
            <RouterProvider router={router} />
        </div>
    )
}

export default App

