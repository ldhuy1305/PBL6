import React, { useEffect, useState, useRef } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { tokens } from "../../theme";
import { Box, Typography, useTheme } from "@mui/material";
import DetailShipper from './DetailShipper';
import style from "./DetailShipper.module.css";
import Notify from '../../../Components/Notify/Notify';
import { createTheme } from '@mui/material/styles';


const theme = createTheme({
    palette: {
        type: 'dark'
    },
    typography: {
        fontSize: 20
    },
});

function ManageShipper() {
    const [data, setData] = useState([]);
    const [selectActive, setSelectActive] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [openDetail, setOpenDetail] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [error, setError] = useState(false)
    const [message, setMessage] = useState("")
    const formRef = useRef();

    const Showdetailshipper = (rows) => {
        setOpenDetail(true);
        setSelectedRow(rows);
    }

    const Acceptshipper = (rows) => {
        setOpenDetail(true);
        setSelectedRow(rows);
    }

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
    const api = `https://falth.vercel.app/api/admin/shipper/approve`;


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
        }
    };
    const handleDeleteClick = (id) => {
        const confirmed = window.confirm('Bạn có muốn cấp phép hoạt động cho shipper?');
        console.log(id)

        if (confirmed) {
            try {
                axios.patch(`https://falth.vercel.app/api/admin/shipper/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then((res) => {
                    fetchData();
                })
            } catch (error) {
                console.log(error);
            }
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const rowsWithUniqueIds = data.map((item, index) => {
        const uniqueId = index;
        return { ...item, id: uniqueId };
    });

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const columns = [
        { field: "id", headerName: "ID" },
        {
            flex: 1,
            fontsize: 14,
            field: 'photo',
            headerAlign: "center",
            align: "center",
            headerName: 'Hình ảnh',
            renderCell: (params) => (
                <img
                    src={params.value}
                    alt="Hình ảnh"
                    style={{ width: "50px", height: "50px", borderRadius: "50px" }}
                />
            ),
        },
        {
            flex: 2,
            field: "firstName",
            headerName: "Họ",
            type: "firstName",
            headerAlign: "center",
            align: "center",
        },
        {
            flex: 2,
            field: "lastName",
            headerName: "Tên",
            type: "type",
            headerAlign: "center",
            align: "center",
        },
        {
            flex: 2,
            field: "phoneNumber",
            headerAlign: "center",
            align: "center",
            headerName: "Số điện thoại",
        },
        {
            flex: 2,
            field: "status",
            headerAlign: "center",
            align: "center",
            headerName: "Trạng thái",
        },
        {
            field: "Detdsil",
            flex: 1,
            headerName: "Xem",
            headerAlign: "center",
            align: "center",
            renderCell: (params) => (
                <div>
                    <button style={{ height: "40px", width: "40px", background: "#51cc8a", borderRadius: "20px" }} onClick={() => Showdetailshipper(params.row)} >
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                </div>
            ),
        },
        {
            field: "Accept",
            flex: 1,
            headerName: "Chấp nhận",
            headerAlign: "center",
            align: "center",
            renderCell: (params) => (
                <div>
                    <button style={{ height: "40px", width: "40px", background: "#747af2", borderRadius: "20px" }} onClick={() => handleDeleteClick(params.row._id)}  >
                        <i className="fa-solid fa-file"></i>
                    </button>
                </div>
            ),
        },
        {
            field: "Delete",
            flex: 1,
            headerName: "Từ chối",
            headerAlign: "center",
            align: "center",
            renderCell: (params) => (
                <div>
                    <button style={{ height: "40px", width: "40px", background: "#ef376e", borderRadius: "20px" }} >
                        <i className="fa-solid fa-trash-can"></i>
                    </button>
                </div>
            ),
        },
    ];

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
                    <DetailShipper rows={selectedRow} show={true} handleClose={setOpenDetail} />
                )}
                <div className={style.dsdh} >
                    <div className={style.dshd1} style={{ background: colors.primary[400], }} >
                        <div className={style.titledsdh}>Danh sách Shipper chờ duyệt</div>
                        <div className={style.searchBar}>
                            <input
                                type="text"
                                className={style.searchInput}
                                placeholder="Tìm kiếm shipper..."
                            />
                        </div>
                    </div>

                </div>
                <DataGrid

                    rows={rowsWithUniqueIds}
                    columns={columns}
                    initialState={{
                        pagination: {
                            pageSize: 10,
                        },
                    }}
                    loading={isLoading}
                />

            </Box>
        </Box>
    );
}

export default ManageShipper;
