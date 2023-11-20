import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import style from './Statistics.module.css';
import LineChart from "../../components/LineChart";
import ApexChart from "../../components/InteractivePieChart/InteractivePieChart"
import Header2 from "../../components/Header/Header";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Product = () => {
    const history = useNavigate();
    const redirectToProductPage = () => {
        history('/product');
    };
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [dataorder, setDataorder] = useState([]);
    const [datachart, setDatachart] = useState([]);
    const [databestseller, setDatabestseller] = useState([]);
    const token = localStorage.getItem('autoken');
    const _id = localStorage.getItem('_id');
    const fetchDataorder = async (value) => {
        try {
            const response = await axios.get(`https://falth.vercel.app/api/owner/6555d23dbbba9a0008a81230/${value}?limit=0`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const responseData = response.data[value][0];
            setDataorder(responseData);
        } catch (error) {
            console.log(error);
        }
    };
    const fetchDatabestseller = async () => {
        try {
            const response = await axios.get(`https://falth.vercel.app/api/owner/6555d23dbbba9a0008a81230/best-seller`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const responseData = response.data.data;
            console.log(responseData);
            setDatabestseller(responseData);
        } catch (error) {
            console.log(error);
        }
    };
    const fetchDatachart = async () => {
        try {
            const response = await axios.get(`https://falth.vercel.app/api/owner/6555d23dbbba9a0008a81230/chart`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const responseData = response.data.data;
            console.log(responseData);
            setDatachart(responseData);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchDatachart();
    }, []);
    useEffect(() => {
        fetchDatabestseller();
    }, []);
    return (

        <Box m="20px">
            <Header2 title={"Thống kê"} />
            <Box
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="5vh"
                gap="5px"
            >
                {/* ORDER */}
                <Box
                    gridColumn="span 2"
                    display="flex"
                    gridRow="span 4"
                    alignItems="center"
                    justifyContent="center"
                >
                    <div className={style.box}>
                        <div className={style.box1}>
                            <div className={style.container}>
                                <div className={style.top}>
                                    <div className={style.icon}>
                                        <i class="fa-solid fa-cart-shopping"></i>
                                    </div>
                                    <div className={style.rightContent1}>
                                        <select name="" id="" onChange={(event) => fetchDataorder(event.target.value)}>

                                            <option value="daily">Daily</option>
                                            <option value="weekly">Weekly</option>
                                            <option value="monthly">Monthly</option>
                                        </select>
                                    </div>

                                </div>
                                <div className={style.center}>
                                    <span>Đơn hàng</span>
                                </div>
                                <div className={style.botton}>
                                    <span>{dataorder.count} đơn</span>
                                </div>
                            </div>
                            <div className={style.view} onClick={() => redirectToProductPage()}>
                                <div className={style.tittle}>
                                    <span>Xem chi tiết</span>
                                </div>
                                <div className={style.rightContent}>
                                    <i class="fa-solid fa-right-long"></i>
                                </div>
                            </div>
                        </div>

                    </div>
                </Box>
                {/* //////////////////////////////////////////////////////////////////// */}
                <Box
                    gridColumn="span 2"
                    gridRow="span 4"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <div className={style.box}>
                        <div className={style.box1}>
                            <div className={style.container}>
                                <div className={style.top}>
                                    <div className={style.icon}>
                                        <i class="fa-solid fa-cart-shopping"></i>
                                    </div>
                                    <div className={style.rightContent1}>
                                        <select name="" id="" onChange={(event) => fetchDataorder(event.target.value)}>

                                            <option value="daily">Daily</option>
                                            <option value="weekly">Weekly</option>
                                            <option value="monthly">Monthly</option>
                                        </select>
                                    </div>

                                </div>
                                <div className={style.center}>
                                    <span>Order</span>
                                </div>
                                <div className={style.botton}>
                                    <span>1.500K</span>
                                </div>
                            </div>
                            <div className={style.view} >
                                <div className={style.tittle}>
                                    <span>View repost</span>
                                </div>
                                <div className={style.rightContent}>
                                    <i class="fa-solid fa-right-long"></i>
                                </div>
                            </div>
                        </div>

                    </div>
                </Box>
                <Box
                    gridColumn="span 8"
                    // backgroundColor={colors.primary[400]}
                    gridRow="span 8"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <div className={style.box}>
                        <div className={style.box1}>
                            <div className={style.container}>
                                <div className={style.top}>
                                    <div className={style.tranding}>
                                        <span>Thông kê</span>
                                    </div>
                                    <div className={style.rightContent1}>
                                        <select name="" id="" onChange={(event) => fetchDataorder(event.target.value)}>

                                            <option value="daily">Daily</option>
                                            <option value="weekly">Weekly</option>
                                            <option value="monthly">Monthly</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className={style.LineChart}>
                                <LineChart />
                            </div>


                        </div>

                    </div>

                </Box>
                <Box
                    gridColumn="span 4"
                    gridRow="span 10"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <div className={style.box}>
                        <div className={style.box1}>
                            <div className={style.top}>
                                <div className={style.tranding}>
                                    <span>Biểu đồ số lượng đơn hàng</span>
                                </div>
                                <div className={style.rightContent1}>
                                    <span>...</span>
                                </div>
                            </div>
                            <div className={style.InteractivePieChart}>
                                <ApexChart data={datachart} />
                            </div>
                        </div>
                    </div>

                </Box>




                <Box
                    gridColumn="span 8"
                    // backgroundColor={colors.primary[400]}
                    gridRow="span 6 "
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <div className={style.box}>
                        <div className={style.box1}>
                            <div className={style.container}>
                                <div className={style.top}>
                                    <div className={style.tranding}>
                                        <span>Sản phẩm bán chạy nhất</span>
                                    </div>
                                </div>
                                <div>
                                    {databestseller.slice(0, 3).map((value, index) => (
                                        <div className={style.producttop} key={index}>
                                            <div className={style.img}>
                                                <img src={value.images} alt="" />
                                            </div>

                                            <div className={style.name}>
                                                <span>{value.product}</span>
                                            </div>
                                            <div className={style.price}>
                                                <span>{value.price} đ</span>
                                            </div>
                                            <div className={style.sold}>
                                                <span>{value.count} sản phẩm</span>
                                            </div>
                                        </div>
                                    ))}

                                </div>
                            </div>
                        </div>

                    </div>
                </Box>

            </Box>
        </Box>
    );
};

export default Product;
