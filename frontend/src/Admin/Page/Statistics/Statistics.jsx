import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import style from './Statistics.module.css';
import LineChart from "../../components/LineChart";
import LineChartUser from "../../components/LineChartUser";
import ApexChart from "../../components/InteractivePieChart/InteractivePieChart"
import Header2 from "../../components/Header/Header";
import axios from 'axios';
import Loading from '../../components/Loading/Loading'
import { useNavigate } from 'react-router-dom';

const Statistics = () => {
    const history = useNavigate();
    const redirectToManageStorePage = () => {
        history('/admin');
    };
    const redirectToManageUserPage = () => {
        history('/admin/ManageUser');
    };
    const redirectToManageShipperPage = () => {
        history('/admin/ManageUser');
    };
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [dataorder, setDataorder] = useState([]);
    const [datachart, setDatachart] = useState([]);
    const [databestseller, setDatabestseller] = useState([]);
    const [dataLineChart, setDataLineChart] = useState([]);
    const token = localStorage.getItem('token');
    const [isLoading, setIsLoading] = useState(true);
    const [status, SetStatus] = useState(true);

    const _id = localStorage.getItem('_id');
    const fetchDataorder = async (value) => {

        try {
            const response = await axios.get(`https://falth-api.vercel.app/api/admin/user/${value}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const responseData = response.data.data;
            console.log(responseData);
            setDataorder(responseData);
        } catch (error) {
            console.log(error);
        }
    };
    const fetchDataLinechart = async (value) => {

        try {
            const response = await axios.get(`https://falth-api.vercel.app/api/admin/revenue/${value}`, {
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

    const fetchDataselect = async (value) => {
        try {
            setIsLoading(true);
            if (value === "quarterly") {
                SetStatus(false);
            } else {
                SetStatus(true);
            }

            await fetchDataLinechart(value);
            await fetchDataorder(value);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };


    const fetchData = async () => {
        try {
            await fetchDataLinechart("monthly");
            await fetchDataorder("monthly");
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };


    useEffect(() => {
        fetchData();
    }, [token, _id]);
    return (

        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="end">
                <Box><Header2 title={"Thống kê"} /></Box>
                <Box>
                    <div className={style.SelectTime}>
                        <select name="" id="" onChange={(event) => fetchDataselect(event.target.value)}>
                            <option value="monthly">Tháng</option>
                            <option value="quarterly">Quý</option>

                        </select>
                    </div>
                </Box>
            </Box>



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
                                            <i class="fa-solid fa-truck-fast"></i>
                                        </div>

                                    </div>
                                    <div className={style.center}>
                                        <span>Người giao hàng</span>
                                    </div>
                                    <div className={style.botton}>
                                        <span>{dataorder.numShippers} người</span>
                                    </div>
                                </div>
                                <div className={style.view} onClick={() => redirectToManageShipperPage()}>
                                    <div className={style.tittle}>
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
                        gridColumn="span 12"
                        gridRow="span 7"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <div className={style.box}>
                            <div className={style.box1}>
                                <div className={style.container}>
                                    <div className={style.top}>
                                        <div className={style.tranding}>
                                            <span>Thông kê người dùng</span>
                                        </div>
                                    </div>
                                </div>
                                <div className={style.LineChart}>
                                    <LineChartUser data={dataorder} status={status} />
                                </div>


                            </div>

                        </div>

                    </Box>
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
                                            <i class="fa-solid fa-user"></i>
                                        </div>

                                    </div>
                                    <div className={style.center}>
                                        <span>Người dùng</span>
                                    </div>
                                    <div className={style.botton}>
                                        <span>{dataorder.numUsers} người</span>
                                    </div>
                                </div>
                                <div className={style.view} onClick={() => redirectToManageUserPage()}>
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
                                            <i class="fa-solid fa-store"></i>
                                        </div>

                                    </div>
                                    <div className={style.center}>
                                        <span>Cửa hàng</span>
                                    </div>
                                    <div className={style.botton}>
                                        <span>{dataorder.numOwners} cửa hàng </span>
                                    </div>
                                </div>
                                <div className={style.view} onClick={() => redirectToManageStorePage()}>
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

                    </Box>  */}
                    <Box
                        gridColumn="span 12"
                        // backgroundColor={colors.primary[400]}
                        gridRow="span 7"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <div className={style.box}>
                            <div className={style.box1}>
                                <div className={style.container}>
                                    <div className={style.top}>
                                        <div className={style.tranding}>
                                            <span>Thông kê doanh thu</span>
                                        </div>
                                    </div>
                                </div>
                                <div className={style.LineChart}>
                                    <LineChart data={dataLineChart} status={status} />
                                </div>


                            </div>

                        </div>

                    </Box>



                </Box>)}
        </Box>
    );
};

export default Statistics;
