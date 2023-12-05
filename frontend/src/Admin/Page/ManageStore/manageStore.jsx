import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import { tokens } from "../../theme";
import { Button } from "@mui/material";
import Header2 from "../../components/Header/Header";
import axios from 'axios';
import style from './Detailstore.module.css'
import Bill from './Detailstore';
import Accept from '../../components/Accept/Accept';
import { useNavigate } from 'react-router-dom';

const ManageStore = ({ Catname }) => {
    const history = useNavigate();
    const redirectToEditProductPage = (id) => {
        history('/admin/Detailstore', { state: id });
    };

    const [data, setData] = useState([]);
    const [selectActive, setSelectActive] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [openDetail, setOpenDetail] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [openAccept, SetOpenAccept] = useState(false);

    const formRef = useRef();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (formRef.current && !formRef.current.contains(e.target) && !selectActive) {
                setOpenDetail(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [selectActive]);

    const token = localStorage.getItem('token');
    const _id = localStorage.getItem('_id');
    const fetchData = async () => {
        try {
            const response = await axios.get("https://falth-api.vercel.app/api/admin/store?isLocked=false", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const responseData = response.data.data;
            setData(responseData);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };
    const Searchproduct = async (name) => {
        console.log(name);
        try {
            const response = await axios.get(`https://falth-api.vercel.app/api/product/search?search=${name}`
                , {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            const responseData = response.data.data.data;
            console.log(responseData);
            setData(responseData);
            setIsLoading(false);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleDetailClick = (row) => {

        setSelectedRow(row);
        setOpenDetail(true);
    };
    const handleopenAcceptClick = (row) => {
        setSelectedRow(row);
        SetOpenAccept(true);
    };


    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const columns = [
        {
            field: "id", headerName: "ID", headerAlign: "center",
            align: "center",
        },
        {
            flex: 1,
            field: "name",
            headerName: "Tên",
            type: "number",
            headerAlign: "center",
            align: "center",
        },
        {
            flex: 1,
            field: "address",
            headerName: "Địa chỉ",
            headerAlign: "center",
            align: "center",
        },
        {
            field: "Detsil",
            flex: 1,
            headerName: "Xem Chi Tiết",
            headerAlign: "center",
            align: "center",
            renderCell: (params) => {
                return (
                    <Box
                        width="60%"
                        m="0 auto"
                        p="5px"
                        display="flex"
                        justifyContent="center"
                        backgroundColor={colors.greenAccent[600]}
                        borderRadius="4px"
                        onClick={() => redirectToEditProductPage(params.row._id)}
                    >
                        <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                            Xem chi tiết
                        </Typography>
                    </Box>
                );
            },
        },
        {
            headerName: "Khóa của hàng",
            flex: 1,
            headerAlign: "center",
            align: "center",
            renderCell: (params) => {
                return (
                    <Box
                        width="60%"
                        m="0 auto"
                        p="5px"
                        display="flex"
                        justifyContent="center"
                        backgroundColor={colors.greenAccent[600]}
                        borderRadius="4px"
                        onClick={() => handleopenAcceptClick(params.row)}
                    >
                        <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                            Khóa cửa hàng
                        </Typography>
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
        <Box m="20px" position='relative'>
            <Box display="flex" justifyContent="space-between" alignItems="center">

                <Box> <Header2 title="Danh sách cửa hàng" /></Box>
                {/* <Box>
                    <div className={style.searchBar}>
                        <input
                            type="text"
                            className={style.searchInput}
                            placeholder="Tìm kiếm cửa hàng"
                            onChange={(e) => Searchproduct(e.target.value)}
                        />
                    </div>


                </Box> */}
                <Box>
                </Box>
            </Box>
            <Box
                m="10px 0 0 0"
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
                {openDetail && (
                    <Bill rows={selectedRow} show={true} handleClose={setOpenDetail} />
                )}
                {openAccept && (
                    <Accept rows={selectedRow} show={true} handleClose />
                )}
                <DataGrid rows={rowsWithUniqueIds} columns={columns}
                    loading={isLoading}
                    initialState={{
                        pagination: {
                            pageSize: 10,
                        },
                    }} />
            </Box >
        </Box >
    );
};

export default ManageStore;
