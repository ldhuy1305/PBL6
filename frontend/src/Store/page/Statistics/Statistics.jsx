import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import style from './Statistics.module.css';
import LineChart from "../../components/LineChart";
import ApexChart from "../../components/InteractivePieChart/InteractivePieChart"
import Header2 from "../../components/Header/Header";
import axios from 'axios';
import Loading from '../../components/Loading/Loading'
import { useNavigate } from 'react-router-dom';

const Product = () => {
    const history = useNavigate();
    const redirectToProductPage = () => {
        history('/store/product');
    };
    const redirectToOrderPage = () => {
        history('/store/listorder');
    }
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [dataorder, setDataorder] = useState([]);
    const [datachart, setDatachart] = useState([]);
    const [databestseller, setDatabestseller] = useState([]);
    const [dataLineChart, setDataLineChart] = useState([]);
    const token = localStorage.getItem('token');
    const [isLoading, setIsLoading] = useState(true);
    const [Dataproduct, setDataproduct] = useState("");
    const [datarevenue, setdatarevenue] = useState("count");
    const [GetRevenueByCat, setGetRevenueByCat] = useState([])


    const _id = localStorage.getItem('_id');
    const fetchDataorder = async (value) => {
        try {
            const response = await axios.get(`https://falth-api.vercel.app/api/owner/${_id}/${value}?limit=0`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const responseData = response.data.data[0];
            console.log(response.data.data);
            setDataorder(response.data.data[0]);
        } catch (error) {
            console.log(error);
        }
    };
    const fetchDataLinechart = async (value) => {

        try {
            const response = await axios.get(`https://falth-api.vercel.app/api/owner/${_id}/${value}?limit=7`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data.data);
            setDataLineChart(response.data.data)
        } catch (error) {
            console.log(error);
        }
    };

    const fetchDatabestseller = async () => {
        try {
            const response = await axios.get(`https://falth-api.vercel.app/api/owner/${_id}/best-seller`, {
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
            const response = await axios.get(`https://falth-api.vercel.app/api/owner/${_id}/chart`, {
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
    const fetchAddproduct = async () => {
        try {
            const response = await axios.get(`https://falth-api.vercel.app/api/product/owner/${_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const responseData = response.data.data.length;
            console.log(responseData);
            setDataproduct(responseData);
        } catch (error) {
            console.log(error);
        }
    };
    const fecthGetRevenueByCat = async () => {
        try {
            const response = await axios.get(`https://falth-api.vercel.app/api/owner/${_id}/revenue-by-cat`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const responseData = response.data.data;
            console.log(responseData);
            setGetRevenueByCat(responseData);
        } catch (error) {
            console.log(error);
        }
    };
    const fetchData = async () => {
        try {
            fetchAddproduct();
            fetchDataorder("daily");
            fetchDatachart();
            fetchDatabestseller();
            fetchDataLinechart("daily");
            setIsLoading(false);
            fecthGetRevenueByCat();
        } catch (error) {
            console.log(error);
        }
    };
    const fetchSelectLinechart = (e) => {
        setdatarevenue(e)
    }


    useEffect(() => {
        fetchData();
    }, [token, _id]);
    return (

        <Box m="20px">
            <Header2 title={"Thống kê"} />
            {isLoading ? (
                <div className={style.isloading}><Loading /></div>

            ) : (
                <Box
                    display="grid"
                    gridTemplateColumns="repeat(12, 1fr)"
                    gridAutoRows="5vh"
                    gap="5px"
                >

                    {/* <Box
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

                                                <option value="daily">Ngày</option>
                                                <option value="weekly">Tuần</option>
                                                <option value="monthly">Tháng</option>
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
                                <div className={style.view} onClick={() => redirectToOrderPage()}>
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

                                    </div>
                                    <div className={style.center}>
                                        <span>Số lượng sản phẩm</span>
                                    </div>
                                    <div className={style.botton}>
                                        <span>{Dataproduct} sản phẩm</span>
                                    </div>
                                </div>
                                <div className={style.view} >
                                    <div className={style.tittle} onClick={() => redirectToProductPage()}>
                                        <span>Xem chi tiết</span>
                                    </div>
                                    <div className={style.rightContent}>
                                        <i class="fa-solid fa-right-long"></i>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </Box> */}
                    <Box
                        gridColumn="span 4"
                        gridRow="span 7"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <div className={style.box}>
                            <div className={style.box1}>
                                <div className={style.top}>
                                    <div className={style.tranding}>
                                        <span>Biểu đồ doanh thu theo danh mục</span>
                                    </div>
                                    <div className={style.rightContent1}>
                                        <span>...</span>
                                    </div>
                                </div>
                                <div className={style.InteractivePieChart}>
                                    <ApexChart data={GetRevenueByCat} status={"revenue"} cat={false} />
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
                                            <select className={style.select} id="" onChange={(event) => fetchSelectLinechart(event.target.value)}>
                                                <option value="count"><span>Thông kê đơn hàng</span></option>
                                                <option value="revenue"><span>Thông kê doanh thu</span></option>
                                            </select>
                                        </div>
                                        <div className={style.rightContent1}>
                                            <select name="" id="" onChange={(event) => fetchDataLinechart(event.target.value)}>

                                                <option value="daily">Ngày</option>
                                                <option value="weekly">Tuần</option>
                                                <option value="monthly">Tháng</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className={style.LineChart}>
                                    <LineChart data={dataLineChart} status={datarevenue} />
                                </div>


                            </div>

                        </div>

                    </Box>
                    <Box
                        gridColumn="span 4"
                        gridRow="span 7"
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
                                    <ApexChart data={datachart} status={"count"} cat={true} />
                                </div>
                            </div>
                        </div>

                    </Box>




                    <Box
                        gridColumn="span 8"
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
                                                    <img src={value.images[0]} alt="" />
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

                </Box>)}
        </Box>
    );
};

export default Product;
