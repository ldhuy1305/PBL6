import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import { tokens } from "../../theme";
import axios from 'axios';
import style from './ManageUser.module.css'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const ManageUser = ({ Catname }) => {


    const [data, setData] = useState([]);
    const [selectActive, setSelectActive] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [openDetail, setOpenDetail] = useState(true);
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
    const api = `https://falth-api.vercel.app/api/admin/user`;
    const fetchData = async () => {
        try {
            const response = await axios.get(api, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const responseData = response.data.data;
            console.log(responseData)
            setData(responseData);

        } catch (error) {
            console.log(error);
        }
        finally {
            setIsLoading(false);
        }
    };

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
        { field: "id", headerName: "ID" },
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
            field: "phoneNumber",
            headerName: "Số điện thoại",
            headerAlign: "center",
            align: "center",
        },
        {
            field: "Detsil",
            flex: 1,
            headerName: "Xem Chi Tiết",
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
    ];

    const rowsWithUniqueIds = data.map((item, index) => {
        const uniqueId = index;
        const fullName = `${item.firstName} ${item.lastName}`;
        const phoneNumber = item.contact.phoneNumber;
        return { ...item, phoneNumber: phoneNumber, id: uniqueId, name: fullName };
    });


    return (
        <Box m="20px" >
            <div className={style.dsdh} >
                <div className={style.dshd1} style={{ background: colors.primary[400], }} >
                    <div className={style.titledsdh}>Danh sách của hàng</div>
                    <div className={style.searchBar}>
                        <input
                            type="text"
                            className={style.searchInput}
                            placeholder="Tìm kiếm cửa hàng..."
                        />
                    </div>
                </div>

            </div>
            <Box
                display="flex"
                height="75vh"
            >
                <Box
                    m="10px  10px 0 0"
                    width="60%"
                    height="75vh"
                >
                    <DataGrid rows={rowsWithUniqueIds} columns={columns}
                        loading={isLoading}
                        initialState={{
                            pagination: {
                                pageSize: 7,
                            },
                        }} />
                </Box>
                <Box
                    m="10px 0  0"
                    width="40%"
                    height="75vh"
                >
                    <div style={{ height: "100%", width: "100%", background: "blue" }}>
                        <div className={style.avata}>
                            <img src="" alt="" />
                        </div>
                    </div>

                </Box>
            </Box >
        </Box>
    );
};

export default ManageUser;
