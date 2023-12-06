import React, { useState, useEffect } from 'react';
import { Box } from "@mui/material";
import Header1 from "../../components/Header/Header1";
import axios from 'axios';
//import 'bootstrap/dist/css/bootstrap.min.css';
import style from './Detailstore.module.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useLocation } from 'react-router-dom';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
//import 'bootstrap/dist/css/bootstrap.min.css';
import { Formik } from 'formik';
import Loading from '../../components/Loading/Loading'
import { toast } from 'react-toastify';
import Spinner from 'react-bootstrap/Spinner';

const Detailorder = () => {
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
                `https://falth-api.vercel.app/api/admin/store/${dataFromPreviousPage}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const responseData = response.data.data;
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
            <Header1 title={"Chi tiết cửa hàng"} to="/admin/Acceptstore" />
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
                                    <div >
                                        <div className={style.Store}>
                                            <div className={style.Name_store}>
                                                <div >
                                                    <span>{data.name}</span>
                                                </div>
                                            </div>
                                            <div className={style.addres_store}>
                                                <div >
                                                    <span>SĐT: {data.phoneNumber}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={style.Store}>
                                        <div >
                                            <div className={style.bill_time} >
                                                <div className={style.bill_stt}>
                                                    <span className={style.col1}>Địa chỉ : </span>
                                                    <span className={style.col}> {data.address}</span>
                                                </div>
                                            </div>
                                            <div className={style.bill_time} >
                                                <div className={style.bill_stt}>
                                                    <span className={style.col1}>Mô tả : </span>
                                                    <span className={style.col}> {data.description}</span>
                                                </div>
                                            </div>
                                            <div className={style.bill_time} >
                                                <div className={style.bill_stt}>
                                                    <span className={style.col1}>Giờ mỡ cửa : </span>
                                                    <span className={style.col}>{data.openAt}</span>
                                                </div>
                                            </div>
                                            <div className={style.bill_time} >
                                                <div className={style.bill_stt}>
                                                    <span className={style.col1}>Giờ đóng cửa : </span>
                                                    <span className={style.col}>{data.closeAt}</span>
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
                        gridRow="span 5"
                        display="flex"
                    >
                        <div style={{
                            width: "100%", padding: "20px", border: " 0.1px solid rgb(223, 223, 223)", borderRadius: "10px"
                        }}>
                            <h5>Hình ảnh</h5>
                            <div className={style.bill}>
                                <div >
                                    <img className={style.img_bill} src={data.image} alt="" />
                                </div>
                            </div>
                        </div>

                    </Box>
                    <Box
                        gridColumn="span 2"
                        gridRow="span 5"
                        display="flex"

                    >
                        <div style={{
                            width: "100%",
                            padding: "20px",
                            border: "0.1px solid rgb(223, 223, 223)",
                            borderRadius: "10px"
                        }}>
                            <h5>Đánh giá từ khách hàng</h5>
                            {data.ratings.map((value, index) => {
                                <div className={style.infocustumer1}>
                                    <div className={style.user}>
                                        <img height="55px" width="55px" src="https://res.cloudinary.com/drk3oaeza/image/upload/v1700584933/pbl6/f9juqmmadmqfencac2fe.jpg"
                                            alt="" />
                                    </div>
                                    <div className={style.infocustumer}>
                                        <h6>{value.user.firstName} {value.user.lastName}</h6>
                                        <span>{value.content}</span>
                                    </div>
                                </div>
                            })}
                            {/* <div className={style.infocustumer1}>
                                <div className={style.user}>
                                    <img height="55px" width="55px" src="https://res.cloudinary.com/drk3oaeza/image/upload/v1700584933/pbl6/f9juqmmadmqfencac2fe.jpg"
                                        alt="" />
                                </div>
                                <div className={style.infocustumer}>
                                    <h6>Địa chỉ</h6>
                                    <span>339 Đ. Trần Hưng Đạo, P, Sơn Trà, Đà Nẵng 550000</span>

                                </div>
                            </div> */}
                            {/* <div className={style.infocustumer1}>
                                <div className={style.user}>
                                    <img height="55px" width="55px" src="https://res.cloudinary.com/drk3oaeza/image/upload/v1700584933/pbl6/f9juqmmadmqfencac2fe.jpg"
                                        alt="" />
                                </div>
                                <div className={style.infocustumer}>
                                    <h6>Địa chỉ</h6>
                                    <span>339 Đ. Trần Hưng Đạo, P, Sơn Trà, Đà Nẵng 550000</span>

                                </div>
                            </div> */}

                        </div>
                    </Box>

                </Box>)
            }
        </Box >
    );
};

export default Detailorder;
