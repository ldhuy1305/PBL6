import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import { tokens } from "../../theme";
import { Button } from "@mui/material";
import axios from 'axios';
import style from './Detailstore.module.css'
import Bill from './Detailstore';

const Acceptstore = ({ Catname }) => {


    const [data, setData] = useState([]);
    const [selectActive, setSelectActive] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [openDetail, setOpenDetail] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);

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

    const token = localStorage.getItem('autoken');
    const _id = localStorage.getItem('_id');
    const api = `https://falth-api.vercel.app/api/store/city/Đà Nẵng`;
    const fetchData = async () => {
        try {
            const response = await axios.get(api, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const responseData = response.data.data.data;
            setData(responseData);

        } catch (error) {
            console.log(error);
        }
        finally {
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
                        onClick={() => handleDetailClick(params.row)}
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
                    // onClick={() => handleDeleteClick(params.row)}
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
            <Box
                m="40px 0 0 0"
                height="75vh"
            >
                {openDetail && (
                    <Bill rows={selectedRow} show={true} handleClose={setOpenDetail} />
                )}
                <div className={style.dsdh} >
                    <div className={style.dshd1} style={{ background: colors.primary[400], }} >
                        <div className={style.titledsdh}>Danh sách cửa hàng</div>
                        <div className={style.searchBar}>
                            <input
                                type="text"
                                className={style.searchInput}
                                placeholder="Tìm kiếm cửa hàng..."
                                onChange={(e) => Searchproduct(e.target.value)}
                            />
                        </div>
                    </div>

                </div>
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

export default Acceptstore;
