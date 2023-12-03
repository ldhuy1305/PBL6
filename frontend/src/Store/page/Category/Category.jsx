import React, { useState, useEffect } from 'react';
import { useTheme, Box } from "@mui/material";
import { tokens } from "../../theme";
import axios from 'axios';
import Loading from '../../components/Loading/Loading'
import Header2 from '../../components/Header/Header2';
import style from './category.css';

const Category = () => {
    const [isLoading, setIsLoading] = useState(true);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [currentPage, setCurrentPage] = useState(1);
    const [listCat, setlistCat] = useState([]);
    const token = localStorage.getItem('token');
    const _id = localStorage.getItem('_id');
    const api = `https://falth-api.vercel.app/api/category/store/${_id}`;
    const [data, setData] = useState([]);

    const itemsPerPage = 4;
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://falth-api.vercel.app/api/product/owner/${_id}?limit=100`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const responseData = response.data.data;
                setData(responseData);
                setTotalPages(Math.ceil(responseData.length / itemsPerPage));
                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
        fetchCatList();
    }, [api, token]);
    const fetchProductList = async (Name) => {
        try {
            const response = await axios.get(`https://falth-api.vercel.app/api/product?catName=${Name}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const responseData = response.data.data.data;
            console.log(responseData);
            setData(responseData);
            setTotalPages(Math.ceil(responseData.length / itemsPerPage));
        } catch (error) {
            console.log(error);
        }
    };
    const fetchCatList = async () => {
        try {
            const response = await axios.get(`https://falth-api.vercel.app/api/category/owner/${_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const responseData = response.data.data;
            console.log(responseData);
            setlistCat(responseData);
        } catch (error) {
            console.log(error);
        }
    };


    const handlePageChange = (page) => {
        const clampedPage = Math.max(1, Math.min(page, totalPages));
        setCurrentPage(clampedPage);
    };


    return (
        <Box m="10px" position='relative'>
            <Header2 title="Danh mục" />
            <Box
                height="75vh"
            >
                <div className="product">
                    {isLoading ? (
                        <div className="isloading"><Loading /></div>
                    ) : (
                        <>

                            <div style={{ height: "145px", display: "flex", }}>
                                {listCat.map((value, index) => (
                                    <div className='category' onClick={() => fetchProductList(value.catName)}>
                                        <div className='imagecat'>
                                            <img style={{
                                                height: "100px",
                                                width: "100%"
                                            }} src={value.photo} alt="" />
                                        </div>

                                        <span style={{ fontSize: "15px", fontWeight: "500", padding: "3px", justifyContent: "" }}>{value.catName}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="container">
                                {data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((item, index) => (
                                    <div key={index} className="box">
                                        <div className="img_box">
                                            <img className="image" src={item.images[0]} alt="image" />
                                        </div>
                                        <div className="detail">
                                            <h3>{item.name}</h3>
                                            <div style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                                <p style={{ display: "inline" }}>{item.description}</p>
                                            </div>

                                            <div className="rating">
                                                {[...Array(item.ratingAverage)].map((rating, index) => (
                                                    <i key={index} className="fa-solid fa-star" style={{ fontSize: '14px', color: "gold" }}></i>
                                                ))}

                                            </div>
                                            <h4>{item.price}</h4>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div >
                                <ul className="pagination">
                                    <li className={currentPage === 1 ? 'disabled' : ''}>
                                        <a className="" onClick={() => handlePageChange(currentPage - 1)}>
                                            <i className="fa-solid fa-circle-chevron-left" style={{ color: 'red', fontSize: '18px', verticalAlign: 'middle' }}></i>
                                        </a>
                                    </li>
                                    {Array.from({ length: totalPages }).map((_, index) => (
                                        <li key={index} className={currentPage === index + 1 ? 'active' : ''}>
                                            <a className="undefined" href="#" onClick={() => handlePageChange(index + 1)}>{index + 1}</a>
                                        </li>
                                    ))}
                                    <li className={currentPage === totalPages ? 'disabled' : ''}>
                                        <a className="" onClick={() => handlePageChange(currentPage + 1)}>
                                            <i className="fa-solid fa-circle-chevron-right" style={{ color: 'red', fontSize: '18px', verticalAlign: 'middle' }}></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </>

                    )
                    }
                </div >
            </Box >
        </Box >
    );
};

export default Category;
