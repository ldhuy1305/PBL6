import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Logout({ setSelected }) {
    const history = useNavigate();
    const fetchData = async () => {
        try {
            const response = await axios.post('https://falth-api.vercel.app/api/auth/logout');
            localStorage.removeItem('token');
            localStorage.removeItem('_id');
            localStorage.removeItem('user');
            localStorage.removeItem('_idstore');
            localStorage.removeItem('_img');
            history('/');
        } catch (error) {
            console.log('Lỗi Đăng xuất:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
        </>
    );
}

export default Logout;
