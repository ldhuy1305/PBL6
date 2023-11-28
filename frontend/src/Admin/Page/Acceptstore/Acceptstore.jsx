import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import { tokens } from "../../theme";
import axios from 'axios';
import Accept from '../../components/Accept/Accept';
import Bill from '../ManageStore/Detailstore';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import style from '../ManageStore/Detailstore.module.css';
import Header2 from "../../components/Header/Header";
import { useNavigate } from 'react-router-dom';

const Acceptstore = () => {
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
    const handleAcceptClick = (row) => {
        setSelectedRow(row);
        SetOpenAccept(true);
    };
    const notify = (er, message) => toast[er](message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });


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
    const api = `https://falth-api.vercel.app/api/admin/owner/approve`;

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
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    const Searchproduct = async (name) => {
        console.log(name);
        try {
            const response = await axios.get(`https://falth-api.vercel.app/api/product/search?search=${name}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const responseData = response.data.data.data;
            console.log(responseData);
            setData(responseData);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };
    const AcceptStore = async (id) => {
        try {
            await axios.patch(`https://falth-api.vercel.app/api/admin/owner/${id}`, {
                "isAccepted": true
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            notify("success", "Thành công");
            fetchData();
        } catch (error) {
            notify("error", "Thất bại");
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
                        <button style={{ height: "40px", width: "40px", background: "#51cc8a", borderRadius: "20px" }} onClick={() => redirectToEditProductPage(params.row._id)}><i class="fa-solid fa-magnifying-glass"></i></button>
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
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header2 title="Danh sách cửa hàng chở xác nhận" />

                {/* <Box>
                    <div className={style.searchBar}>
                        <input
                            type="text"
                            className={style.searchInput}
                            placeholder="Tìm kiếm của hàng..."
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
                    <Accept rows={selectedRow} show={true} handleClose={SetOpenAccept} AcceptStore={AcceptStore} />
                )}
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
