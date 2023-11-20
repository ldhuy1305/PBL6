import React, { useState, useEffect } from 'react';
import { useTheme, Box } from "@mui/material";
import { tokens } from "../../theme";
import axios from 'axios';
import Loading from '../../components/Loading/Loading'
import { mockDataTeam } from "../../data/mockData";
import style from './category.css';

const Category = ({ listCat }) => {
    const [isLoading, setIsLoading] = useState(true);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [currentPage, setCurrentPage] = useState(1);
    const [catName, setCatName] = useState('');
    const token = localStorage.getItem('autoken');
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
            } catch (error) {
                console.log(error);
            }
            finally {
                setIsLoading(false)
            }
        };



        fetchData();
    }, [api, token, catName]);
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


    const handlePageChange = (page) => {
        const clampedPage = Math.max(1, Math.min(page, totalPages));
        setCurrentPage(clampedPage);
    };


    return (
        <Box m="20px" position='relative'>
            <Box
                m="40px 0 0 0"
                height="75vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                    },
                    "& .name-column--cell": {
                        color: colors.greenAccent[300],
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: colors.blueAccent[700],
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: colors.primary[400],
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: colors.blueAccent[700],
                    },
                }}
            >
                <div className="product">
                    {isLoading ? (
                        <Loading />
                    ) : (
                        <>
                            <div style={{ height: "145px", display: "flex", }}>
                                {listCat.map((value, index) => (
                                    <div className='category' onClick={() => fetchProductList(value.catName)}>
                                        <div className='imagecat'>
                                            <img style={{
                                                height: "100px",
                                                width: "100%"
                                            }} src={value.photo} alt="dsdsdsd" />
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
