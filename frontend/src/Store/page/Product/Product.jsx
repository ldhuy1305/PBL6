import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import { tokens } from "../../theme";
import Header from "../../components/Header/Header";
import { Button } from "@mui/material";
import axios from 'axios';
import Delete from './Delete';
import style from './Product.module.css'
import Header2 from "../../components/Header/Header";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Detailfeedback from './fb_product';




const Product = ({ Catname }) => {
    const [data, setData] = useState([]);
    const [datafb, setDatafb] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [openEdit, setOpenEdit] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);


    const history = useNavigate();
    const redirectToProductPage = () => {
        history('/store/Formadd');
    };
    const redirectToEditProductPage = (id) => {
        history('/store/Formedit', { state: id });
    };
    const formRef = useRef();
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

    const token = localStorage.getItem('token');
    const _id = localStorage.getItem('_id');
    const api = `https://falth-api.vercel.app/api/product/owner/${_id}?limit=100`;
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
            const response = await axios.get(`https://falth-api.vercel.app/api/product/owner/${_id}?search=${name}`
                , {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            const responseData = response.data.data;
            console.log(responseData);
            setData(responseData);

        } catch (error) {
            console.log(error);
        }
        finally {
            setIsLoading(false);
        }
    }
    const fb = async (id) => {
        try {
            const response = await axios.get(`https://falth-api.vercel.app/api/product/${id}/rating`
                , {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            const responseData = response.data.data;
            console.log(responseData);
            setDatafb(responseData);
            handleOpenModal()


        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleDeleteClick = (row) => {
        setSelectedRow(row);
        setOpenDelete(true);
        setOpenAdd(false);
    };

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const columns = [
        { field: "id", headerName: "ID" },
        {
            field: "name",
            headerName: "Tên",
            type: "number",
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "price",
            headerName: "Giá tiền",
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "isOutofOrder",
            headerName: "Trạng thái",
            headerAlign: "center",
            align: "center",
            renderCell: (params) => {
                let color;
                switch (params.row.isOutofOrder) {
                    case false:
                        color = "#4caf4fb9";
                        break;
                    case true:
                        color = "#FF5722";
                        break;
                    default:
                        color = "#4caf4fb9";
                }

                return (
                    <Box
                        display="flex"
                        justifyContent="center"
                    >
                        <div style={{ height: "10px", width: "10px", background: color, borderRadius: "30px", }}>
                        </div >
                    </Box>
                );
            },
        },
        {
            field: "Detsil",
            headerName: "Chỉnh sửa",
            headerAlign: "center",
            align: "center",
            renderCell: (params) => {

                return (<div>
                    <Button startIcon={<ModeEditIcon style={{ color: "rgb(103, 58, 183)" }} />} onClick={() => redirectToEditProductPage(params.row._id)}></Button>
                </div >);
            },
        },
        {
            headerName: "Xóa",
            headerAlign: "center",
            align: "center",
            renderCell: (params) => {
                return (
                    <div>
                        <Button startIcon={<DeleteIcon style={{ color: 'red' }} />} onClick={() => handleDeleteClick(params.row)}>
                        </Button>
                    </div>
                );

            },
        },
        {
            field: 'Eyes',
            headerName: 'Xem đánh giá',
            sortable: false,
            editable: false,
            headerAlign: "center",
            align: "center",
            renderCell: (params) => (
                <div>
                    <Button startIcon={<RemoveRedEyeIcon style={{ color: "rgb(33, 150, 243)" }} />} onClick={() => fb(params.row._id)}></Button>
                </div>
            ),
        },

    ];

    const rowsWithUniqueIds = data.map((item, index) => {
        const uniqueId = index;
        return { ...item, id: uniqueId };
    });


    return (
        <Box m="20px" position='relative'>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header2 title="Danh sách sản phẩm" />

                <Box>
                    <div className={style.searchBar}>
                        <input
                            type="text"
                            className={style.searchInput}
                            placeholder="Tìm kiếm sản phẩm..."
                            onChange={(e) => Searchproduct(e.target.value)}
                        />
                    </div>
                </Box>
                <Box>
                </Box>
                <Box>
                    <Button
                        color="secondary"
                        variant="contained"
                        onClick={() => { redirectToProductPage() }}
                    >
                        Thêm sản phẩm
                    </Button>
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
                {
                    openDelete && (
                        <div ref={formRef} className="form-container"
                            style={{ position: "absolute", zIndex: 1000, width: "40%", top: '5%', right: '30%', background: colors.primary[400], border: colors.primary[900] }}>
                            <Box m="20px" >
                                <Delete selectedRow={selectedRow} setOpenDelete={setOpenDelete} fetchData={fetchData} setOpenNotify={notify} />
                            </Box>
                        </div>
                    )
                }
                <Detailfeedback open={openModal} handleClose={handleCloseModal} datafb={datafb} />
                <DataGrid rows={rowsWithUniqueIds} columns={columns} loading={isLoading}
                    initialState={{
                        pagination: {
                            pageSize: 8,
                        },
                    }} />
            </Box >
        </Box >
    );
};
export default Product;
