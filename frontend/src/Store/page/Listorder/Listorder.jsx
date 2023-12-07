import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import Header2 from "../../components/Header/Header";
import useMediaQuery from "@mui/material/useMediaQuery";
import style from './Listorder.module.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { Button } from "@mui/material";

const Product = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [data, setData] = useState([]);
    const [row, setRow] = useState([]);
    const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 10));
    const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 10));
    const [isLoading, setisLoading] = useState(true)
    const history = useNavigate();
    const redirectToDetailorderPage = (id) => {
        history(`/store/detailorder/${id}`, { state: id });
    };
    const token = localStorage.getItem('token');
    const _id = localStorage.getItem('_id');
    const api = `https://falth-api.vercel.app/api/order/owner/${_id}`;
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
            setisLoading(false);

        } catch (error) {
            console.log(error);
            setisLoading(false);
        }
    };
    function formatDate(inputDate) {
        const dateObject = new Date(inputDate);

        const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
        const formattedDate = dateObject.toLocaleDateString('vi-VN', options).replace(/\//g, '-');

        return formattedDate;
    }

    const Search = async () => {
        try {
            const e = formatDate(endDate);
            const s = formatDate(startDate);
            const response = await axios.get(`https://falth-api.vercel.app/api/order/owner/${_id}?start=${s}&end=${e}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const responseData = response.data.data;
            console.log(responseData);
            setData(responseData);
        } catch (error) {
            console.log(error);
            setisLoading(false);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    const setEndDateSr = (e) => {
        if (e < startDate) { setStartDate(e) }
        console.log(e);
    }
    const setStartDateSr = (e) => {
        if (e > endDate) { setEndDate(e) }
        setStartDate(e);
    }


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
            field: "orderCost",
            headerName: "Giá đơn hàng (VNĐ)",
            headerAlign: "center",
            align: "center",
            flex: 2,

        },
        {
            field: "depreciation",
            headerName: "Hoa hồng (VNĐ)",
            headerAlign: "center",
            align: "center",
            flex: 2,

        },
        {
            field: "revenue",
            headerName: "Tiền nhận được(VNĐ)",
            headerAlign: "center",
            align: "center",
            flex: 2,

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
                        color = "#4CAF50"; // Màu xanh lá cây cho trạng thái Finished
                        break;
                    case "Refused":
                        color = "#FF5722"; // Màu cam cho trạng thái Refused
                        break;
                    case "Cancelled":
                        color = "#F44336"; // Màu đỏ cho trạng thái Cancelled
                        break;
                    case "Preparing":
                        color = "#FFC107"; // Màu vàng cho trạng thái Preparing
                        break;
                    case "Ready":
                        color = "#FFC107"; // Màu vàng cho trạng thái Ready
                        break;
                    case "Pending":
                        color = "#FFC107"; // Màu vàng cho trạng thái Ready
                        break;
                    case "Delivering":
                        color = "#2196F3"; // Màu xanh dương cho trạng thái Delivering
                        break;
                    case "Waiting":
                        color = "#9E9E9E"; // Màu xám cho trạng thái Waiting
                        break;
                    default:
                        color = "#000000"; // Màu đen mặc định hoặc một màu khác tùy ý
                        break;
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
                            <i style={{ color: "#ffffff" }} className="fas fa-info-circle"></i>
                            <span style={{ padding: "0 5px" }}>{params.row.status}</span>
                        </div >
                    </Box>
                );
            },
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
                        onClick={() => redirectToDetailorderPage(params.row._id)}
                    >
                        <div>
                            <button style={{ height: "40px", width: "40px", background: "#51cc8a", borderRadius: "20px" }} ><i class="fas fa-info-circle"></i></button>
                        </div >
                    </Box>
                );



            },
        },

    ];
    const rowsWithUniqueIds = data.map((item, index) => {
        const uniqueId = index;
        return { ...item, id: uniqueId };
    });

    return (

        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header2 title="Danh sách đơn hàng" />
                <Box display="flex" justifyContent="space-between" alignItems="center" gap={10}>
                    <Box>
                        <div className={style.searchBar}>
                            <span>Từ:</span>
                            <input
                                type="date"
                                className={style.searchInput1}
                                value={startDate}
                                onChange={(e) => setStartDateSr(e.target.value)}
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
                                onChange={(e) => setEndDateSr(e.target.value)}
                            />
                        </div>
                    </Box>
                    <Box>
                        <Button
                            color="secondary"
                            variant="contained"
                            onClick={() => { Search() }}
                        >
                            Tìm kiếm
                        </Button>
                    </Box>
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
                    <DataGrid rows={rowsWithUniqueIds} columns={columns} loading={isLoading}
                        initialState={{
                            pagination: {
                                pageSize: 8,
                            },
                        }} />
                </Box>
            </Box></Box >
    );
};

export default Product;
