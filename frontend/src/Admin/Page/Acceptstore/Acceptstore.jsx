import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import { tokens } from "../../theme";
import axios from 'axios';
import Bill from '../ManageStore/Detailstore';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import style from '../ManageStore/Detailstore.module.css';

const Acceptstore = ({ Catname }) => {
    const [data, setData] = useState([]);
    const [selectActive, setSelectActive] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [openDetail, setOpenDetail] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const handleAcceptClick = (row) => {
        const isConfirmed = window.confirm('Bạn có chắc chắn muốn thực hiện hành động này không?');

        if (isConfirmed) {
            Accept(row._id)
            alert('Bạn đã chấp nhận!');
        } else {
        }
    };


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
    const api = `https://falth.vercel.app/api/admin/owner/approve`;

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
        finally {
            setIsLoading(false);
        }
    };

    const Searchproduct = async (name) => {
        console.log(name);
        try {
            const response = await axios.get(`https://falth.vercel.app/api/product/search?search=${name}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const responseData = response.data.data.data;
            console.log(responseData);
            setData(responseData);
        } catch (error) {
            console.log(error);
        }
        finally {
            setIsLoading(false);
        }
    };
    const Accept = async (id) => {
        try {
            await axios.get(`https://falth.vercel.app/api/admin/owner/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            fetchData();
        } catch (error) {
            console.log(error);
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
            flex: 3,
            field: "name",
            headerName: "Tên",
            type: "number",
            headerAlign: "center",
            align: "center",
        },
        {
            flex: 3,
            field: "address",
            headerName: "Địa chỉ",
            headerAlign: "center",
            align: "center",
        },
        {
            flex: 3,
            field: "phoneNumber",
            headerName: "Số điện thoại",
            headerAlign: "center",
            align: "center",
        },
        {
            field: "Detdsil",
            flex: 1,
            headerName: "Xem",
            headerAlign: "center",
            align: "center",
            renderCell: (params) => {
                return (
                    <div>
                        <button style={{ height: "40px", width: "40px", background: "#51cc8a", borderRadius: "20px" }} onClick={() => handleDetailClick(params.row)}><i class="fa-solid fa-magnifying-glass"></i></button>
                    </div >
                );
            },
        },
        {
            field: "Accept",
            flex: 1,
            headerName: "Chấp nhận",
            headerAlign: "center",
            align: "center",
            renderCell: (params) => {
                return (
                    <div>
                        <button style={{ height: "40px", width: "40px", background: "#747af2", borderRadius: "20px" }} onClick={() => handleAcceptClick(params.row)}><i class="fa-solid fa-file"></i></button>
                    </div >
                );
            },
        },

        {
            field: "Delete",
            flex: 1,
            headerName: "Từ chối",
            headerAlign: "center",
            align: "center",
            renderCell: (params) => {
                return (
                    <div>
                        <button style={{ height: "40px", width: "40px", background: "#ef376e", borderRadius: "20px" }} onClick={() => handleAcceptClick()}><i className="fa-solid fa-trash-can"></i></button>
                    </div >
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
            // sx={{
            //     "& .MuiDataGrid-root": {
            //         border: "none",
            //     },
            //     "& .MuiDataGrid-cell": {
            //         borderBottom: "none",
            //     },
            //     "& .name-column--cell": {
            //         color: colors.greenAccent[300],
            //     },
            //     "& .MuiDataGrid-columnHeaders": {
            //         backgroundColor: colors.blueAccent[700],
            //         borderBottom: "none",
            //     },
            //     "& .MuiDataGrid-virtualScroller": {
            //         backgroundColor: colors.primary[400],
            //     },
            //     "& .MuiDataGrid-footerContainer": {
            //         borderTop: "none",
            //         backgroundColor: colors.blueAccent[700],
            //     },
            // }}
            >
                {openDetail && (
                    <Bill rows={selectedRow} show={true} handleClose={setOpenDetail} />
                )}
                <div className={style.dsdh} >
                    <div className={style.dshd1} style={{ background: colors.primary[400], }} >
                        <div className={style.titledsdh}>Danh sách cửa hàng chờ duyệt</div>
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
                    disableSelectionOnClick
                    loading={isLoading}

                    initialState={{
                        pagination: {
                            pageSize: 8,
                        },

                    }} />

            </Box >
        </Box >
    );
};

export default Acceptstore;
