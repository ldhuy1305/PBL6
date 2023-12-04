import React, { useState, useEffect } from 'react';
import { Box } from "@mui/material";
import Header1 from "../../components/Header/Header1";
import axios from 'axios';
//import 'bootstrap/dist/css/bootstrap.min.css';
import style from './DetailShipper.module.css';
import Form from 'react-bootstrap/Form';
import { useLocation } from 'react-router-dom';
import Loading from '../../components/Loading/Loading'
import { toast } from 'react-toastify';
import Spinner from 'react-bootstrap/Spinner';

const DetailShipper = () => {
    const location = useLocation();
    const dataFromPreviousPage = location.state;
    const [images, setImages] = useState([]);
    const token = localStorage.getItem('token');
    const _id = localStorage.getItem('_id');
    const [data, setdata] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const fetchData = async () => {
        try {
            const response = await axios.get(
                `https://falth-api.vercel.app/api/admin/shipper/${dataFromPreviousPage}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const responseData = response.data;
            console.log(responseData);
            setdata(responseData);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);




    return (
        <Box m="20px 100px">
            <Header1 title={"Chi tiết người giao hàng"} to="/admin/ViewAllShipper" />
            {isLoading ? (
                <div className={style.isloading}><Loading /></div>
            ) : (
                <Box
                    display="grid"
                    gridTemplateColumns="repeat(6, 1fr)"
                    gridAutoRows="5vh"
                    gap="20px"
                    mt="30px"
                >
                    <Box
                        gridColumn="span 4"
                        display="flex"
                        gridRow="span 10"
                    >
                        <div style={{ width: "100%", height: "100%", padding: "20px", gap: "40px", border: " 0.1px solid rgb(223, 223, 223)", borderRadius: "10px" }}>
                            <Form noValidate style={{ width: "100%", height: "100%" }}>
                                <h5 style={{ paddingBottom: "20px" }}>Thông tin</h5>
                                <div className={style.container}>
                                    <div className={style.Store}>
                                        <div >
                                            <div className={style.bill_time} >
                                                <div className={style.bill_stt}>
                                                    <span className={style.col1}>Họ và tên : </span>
                                                    <span className={style.col}> {data.firstName} {data.lastName}</span>
                                                </div>
                                            </div>
                                            <div className={style.bill_time} >
                                                <div className={style.bill_stt}>
                                                    <span className={style.col1}>email : </span>
                                                    <span className={style.col}> {data.email}</span>
                                                </div>
                                            </div>
                                            <div className={style.bill_time} >
                                                <div className={style.bill_stt}>
                                                    <span className={style.col1}>Địa chỉ : </span>
                                                    <span className={style.col}> {data.contact[0].address}</span>
                                                </div>
                                            </div>
                                            <div className={style.bill_time} >
                                                <div className={style.bill_stt}>
                                                    <span className={style.col1}>Số điện thoại : </span>
                                                    <span className={style.col}> {data.contact[0].phoneNumber}</span>
                                                </div>
                                            </div>
                                            <div className={style.bill_time} >
                                                <div className={style.bill_stt}>
                                                    <span className={style.col1}>Biển số xe : </span>
                                                    <span className={style.col}>{data.vehicleNumber
                                                    }</span>
                                                </div>
                                            </div>
                                            <div className={style.bill_time} >
                                                <div className={style.bill_stt}>
                                                    <span className={style.col1}>Loại xe : </span>
                                                    <span className={style.col}>{data.vehicleType
                                                    }</span>
                                                </div>
                                            </div>
                                            <div className={style.bill_time} >
                                                <div className={style.bill_stt}>
                                                    <span className={style.col1}>Số sao đánh giá : </span>
                                                    <span className={style.col}>{data.ratingsQuantity}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div >
                                </div>
                            </Form>
                        </div>
                    </Box>
                    <Box
                        gridColumn="span 2"
                        gridRow="span 6"
                        display="flex"
                    >
                        <div style={{
                            width: "100%", padding: "20px", border: " 0.1px solid rgb(223, 223, 223)", borderRadius: "10px"
                        }}>
                            <h5>Hình ảnh</h5>
                            <div className={style.bill}>
                                <div >
                                    <img className={style.img_bill} src={data.photo} alt="" />
                                </div>
                            </div>
                        </div>

                    </Box>
                    <Box
                        gridColumn="span 2"
                        gridRow="span 4"
                        display="flex"

                    >
                        <div style={{
                            width: "100%",
                            padding: "20px",
                            border: "0.1px solid rgb(223, 223, 223)",
                            borderRadius: "10px"
                        }}>
                            <h5>Đánh giá từ khách hàng</h5>
                            <span>Chứa có đánh giá</span>

                        </div>
                    </Box>

                </Box>)
            }
        </Box >
    );
};

export default DetailShipper;
