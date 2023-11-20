import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import Header2 from "../../components/Header/Header";
import useMediaQuery from "@mui/material/useMediaQuery";
import style from './Listorder.module.css'
import axios from 'axios'

const Product = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [data, setData] = useState([]);
    const [row, setRow] = useState([]);
    const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 10));
    const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 10));
    const [isLoading, setisLoading] = useState(false)
    const handleFormSubmit = (values) => {
        console.log(values);
    };
    const token = localStorage.getItem('autoken');
    const _id = localStorage.getItem('_id');
    const api = `https://falth.vercel.app/api/order/owner/${_id}`;
    const fetchData = async () => {
        try {
            const response = await axios.get(api, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const responseData = response.data.data;
            console.log(responseData);
            setData(responseData);

        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    const [open, setOpen] = useState(false);
    const formRef = useRef();
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (formRef.current && !formRef.current.contains(e.target)) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    const handleAccessLevelClick = (row) => {
        console.log(row)
        setRow(row)
    };

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const columns = [
        { field: "id", flex: 1, headerName: "ID" },
        {
            field: "_id",
            headerName: "ID đơn hàng",
            flex: 2,
            headerAlign: "center",
            align: "center",

        },
        {
            field: "totalPrice",
            headerName: "Giá tiền(VNĐ)",
            headerAlign: "center",
            align: "center",
            flex: 2,

        },

        {
            field: "accessLevel",
            headerName: "Xem",
            headerAlign: "center",
            align: "center",
            flex: 1,
            renderCell: (params) => {
                return (
                    <Box
                        width="60%"
                        m="0 auto"
                        p="5px"
                        display="flex"
                        justifyContent="center"
                        borderRadius="4px"
                        onClick={() => handleAccessLevelClick(params.row)}
                    >
                        <div>
                            <button style={{ height: "40px", width: "40px", background: "#51cc8a", borderRadius: "20px" }} ><i class="fa-solid fa-magnifying-glass"></i></button>
                        </div >
                    </Box>
                );
            },
        },
        {
            field: "status",
            headerName: "Trạng thái",
            headerAlign: "center",
            align: "center",
            flex: 2,
            renderCell: (params) => {
                let color;
                switch (params.row.status) {
                    case "Finished":
                        color = "#4caf4fb9"; // Màu xanh lá cây cho trạng thái Finished
                        break;
                    case "Refused":
                        color = "#FF5722"; // Màu cam cho trạng thái Refused
                        break;
                    case "Cancelled":
                        color = "#F44336"; // Màu đỏ cho trạng thái Cancelled
                        break;
                    default:
                        color = "#000000"; // Màu mặc định nếu không phải các trạng thái trên
                }

                return (
                    <Box
                        width="60%"
                        m="0 auto"
                        p="5px"
                        display="flex"
                        justifyContent="center"
                    >
                        <div style={{ padding: "2px 10px", background: color, borderRadius: "30px", }}>
                            <i style={{ color: "#ffffff" }} className="fa-regular fa-circle"></i>
                            <span style={{ padding: "0 5px" }}>{params.row.status}</span>
                        </div >
                    </Box>
                );
            },
        }

    ];
    const rowsWithUniqueIds = data.map((item, index) => {
        const uniqueId = index;
        return { ...item, id: uniqueId };
    });

    return (

        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header2 title="Danh sách đơn hàng" />

                <Box>
                    <div className={style.searchBar}>
                        <input
                            type="text"
                            className={style.searchInput}
                            placeholder="Tìm kiếm đơn hàng..."
                        />
                    </div>


                </Box>
                <Box>
                    <div className={style.searchBar}>
                        <span>Từ:</span>
                        <input
                            type="date"
                            className={style.searchInput1}
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>
                </Box>
                <Box>
                    <div className={style.searchBar}>
                        <span>Đến:</span>
                        <input
                            type="date"
                            className={style.searchInput1}
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>
                </Box>
            </Box>
            <Box display="flex">
                <Box
                    m="10px 0 0"
                    width="100%"
                    height="75vh"
                    sx={{
                        "& .MuiDataGrid-columnHeaderTitle": {
                            borderBottom: "none",
                            fontSize: "14px"
                            ,
                            fontWeight: "bold",
                        },
                    }}
                >
                    <DataGrid rows={rowsWithUniqueIds} columns={columns} isLoading={isLoading}
                        initialState={{
                            pagination: {
                                pageSize: 9,
                            },
                        }} />
                </Box>
            </Box></Box >
    );
};

export default Product;
