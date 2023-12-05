import React, { useState, useEffect } from 'react';
import { Box, Paper, InputBase, IconButton, MenuItem, Select, FormControl } from "@mui/material";
import Header2 from "../../components/Header/Header2";
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import Loading from '../../components/Loading/Loading';
import style from './Feedback.module.css';
import Typography from '@mui/material/Typography';

const Detailfeedback = ({ open, handleClose }) => {
    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 500,
                bgcolor: 'background.paper',
                border: '0.1px solid #000',
                borderRadius: "5px",
                boxShadow: 24,
                p: 4,
            }}>
                <div className={style.container}>
                    <div className={style.header}>
                        <Header2 title={"Đánh giá cửa hàng"} />
                    </div>
                    <div className={style.body}>
                        <TextField
                            fullWidth
                            label={"Tên sản phẩm"}
                            defaultValue="Cafe"
                            margin="normal"
                        />
                        <TextField
                            label={"Người đánh giá"}
                            margin="normal"
                            fullWidth
                            defaultValue="Nguyễn Thanh Lịch"
                        />
                        <TextField
                            id="outlined-multiline-basic"
                            label={"Đánh giá"}
                            margin="normal"
                            multiline
                            defaultValue={"Chuỗi cà phê nổi tiếng với độ phủ hơn 500 cửa hàng trên khắp Việt Nam Ngon nhất tại Đà Nẵng và các tỉnh thành liên quan"}
                            fullWidth
                            rows={4}
                        />
                        <Box
                            sx={{
                                '& > legend': { mt: 2 },
                            }}
                        >
                            <Typography component="legend">Controlled</Typography>
                            <Rating
                                name="simple-controlled"
                                value={3}
                            />
                        </Box>
                    </div>
                    <div className={style.poster}>
                        <Button variant="contained" color="success">
                            Success
                        </Button>
                        <Button variant="outlined" color="error">
                            Error
                        </Button>
                    </div>

                </div>
            </Box>
        </Modal >
    );
};

const Feedback = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const [age, setAge] = useState('');
    const handleChange = (event) => {
        setAge(event.target.value);
    };
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const columns = [
        { field: 'id', headerName: 'ID', },
        { field: 'Nameproduct', headerName: 'Tên sản phẩm', flex: 1, },
        { field: 'NamePeople', headerName: 'Người đánh giá', flex: 1, },
        { field: 'review', headerName: 'Đánh giá', flex: 1, },
        { field: 'date', headerName: 'Ngày đánh giá', sortable: false, flex: 1, },
        {
            field: 'Rating',
            headerName: 'Số sao',
            sortable: false,
            renderCell: (params) => (
                <Rating
                    readOnly
                    name="customized-icons"
                    defaultValue={params.value}
                    precision={0.5}
                    icon={<StarIcon fontSize="inherit" />}
                    style={{ marginTop: '10px' }}
                />
            ),
        },
        {
            field: 'Eyes',
            headerName: 'Đánh giá',
            sortable: false,
            editable: false,
            renderCell: () => (
                <div>
                    <Button startIcon={<RemoveRedEyeIcon />} onClick={handleOpenModal}></Button>
                </div>
            ),
        },
    ];

    const rows = [
        { id: 1, Nameproduct: 'Sản phẩm 1', NamePeople: 'Người đánh giá 1', review: 'Đánh giá 1', date: '01/01/2023', Rating: 4.5 },
        { id: 2, Nameproduct: 'Sản phẩm 2', NamePeople: 'Người đánh giá 2', review: 'Đánh giá 2', date: '02/01/2023', Rating: 3 },
        { id: 3, Nameproduct: 'Sản phẩm 3', NamePeople: 'Người đánh giá 3', review: 'Đánh giá 3', date: '03/01/2023', Rating: 5 },
        { id: 4, Nameproduct: 'Sản phẩm 4', NamePeople: 'Người đánh giá 4', review: 'Đánh giá 4', date: '04/01/2023', Rating: 2.5 },
        { id: 5, Nameproduct: 'Sản phẩm 5', NamePeople: 'Người đánh giá 5', review: 'Đánh giá 5', date: '05/01/2023', Rating: 4 },
        { id: 6, Nameproduct: 'Sản phẩm 6', NamePeople: 'Người đánh giá 6', review: 'Đánh giá 6', date: '06/01/2023', Rating: 3.5 },
        { id: 7, Nameproduct: 'Sản phẩm 7', NamePeople: 'Người đánh giá 7', review: 'Đánh giá 7', date: '07/01/2023', Rating: 2 },
        { id: 8, Nameproduct: 'Sản phẩm 8', NamePeople: 'Người đánh giá 8', review: 'Đánh giá 8', date: '08/01/2023', Rating: 4 },
        { id: 9, Nameproduct: 'Sản phẩm 9', NamePeople: 'Người đánh giá 9', review: 'Đánh giá 9', date: '09/01/2023', Rating: 3 },
        { id: 10, Nameproduct: 'Sản phẩm 10', NamePeople: 'Người đánh giá 10', review: 'Đánh giá 10', date: '10/01/2023', Rating: 5 },
    ];


    return (
        <Box m="10px 30px 0px 30px">
            <Header2 title={"Đánh giá cửa hàng"} />
            {isLoading ? (
                <div className={style.isloading}><Loading /></div>
            ) : (
                <Box
                    height="75vh"
                    sx={{
                        "& .MuiDataGrid-columnHeaderTitle": {
                            borderBottom: "none",
                            fontSize: "14px",
                            fontWeight: "bold",
                        },
                    }}
                >
                    <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom="5px">
                        <Box sx={{ flexBasis: '50%' }}>
                            <Typography component="legend">Controlled</Typography>
                            <Paper
                                component="form"
                                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', height: "30px" }}
                            >
                                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                                    <SearchIcon />
                                </IconButton>
                                <InputBase
                                    sx={{ ml: 1, flex: 1 }}
                                    placeholder="Tên sản phẩm"
                                />

                            </Paper>

                        </Box>
                        <Box sx={{ flexBasis: '16%' }}>
                            <FormControl fullWidth>
                                <Typography component="legend">Controlled</Typography>
                                <Select
                                    sx={{ alignItems: 'center', height: "30px" }}
                                    value={10}
                                    onChange={handleChange}
                                    defaultChecked={true}
                                >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>

                        </Box>
                    </Box>

                    <Box sx={{ height: "70vh", width: '100%' }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            loading={isLoading}
                            editable={false}
                            pageSize={8}
                        />
                    </Box>

                    <Detailfeedback open={openModal} handleClose={handleCloseModal} />
                </Box >
            )
            }
        </Box >
    );
};

export default Feedback;
