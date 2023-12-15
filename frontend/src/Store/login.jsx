import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Login() {

    const fetchData = async () => {
        try {
            const response = await axios.post('https://falth-api.vercel.app/api/auth/login/', {
                email: 'owner1@gmail.com',
                password: 'leduchuy123',
            });
            const token = response.data.token;
            const _id = response.data.data.user._id;
            localStorage.setItem('autoken', token);
            localStorage.setItem('_id', _id);
            console.log(token);
            console.log(response.data.data.user._id);
            console.log('Đăng nhập thành công');
        } catch (error) {
            console.log('Lỗi đăng nhập:', error);
        }
    };
    const fetchData2 = async () => {
        try {
            const response = await axios.post('https://falth-api.vercel.app/api/product/store/653233e16d8d513510d93744', {
                "catName": "Đồ ăn",
                "description": "Thịt  chó lá mơ",
                "name": "Thịt chó",
                "price": 10000,
            });
            const token = response.data.token;
            const _id = response.data.data.user._id;
            localStorage.setItem('autoken', token);
            localStorage.setItem('_id', _id);
            console.log(token);
            console.log(response.data.data.user._id);
            console.log('Đăng nhập thành công');
        } catch (error) {
            console.log('Lỗi đăng nhập:', error);
        }
    };
    const fetchData1 = async () => {
        try {
            await axios.post('https://falth-api.vercel.app/api/user', {
                "firstName": "Huynh",
                "lastName": "Thuan",
                "email": "thuanhuynh.122607ssss12202@gmail.com",
                "password": "thuan123",
                "passwordConfirm": "thuan123",
                "address": "Đà Nẵng, hahaha",
                "phoneNumber": "0112233444"
            });

            console.log('Đăng nhập thành công');
        } catch (error) {
            console.log('Lỗi đăng nhập:', error);
        }
    };

    return (
        <div>
            <button onClick={() => fetchData()}>huy ngu
            </button>
        </div>
    );
}

export default Login;
