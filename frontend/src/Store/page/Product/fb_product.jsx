import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, useTheme } from "@mui/material";
import { Button } from "@mui/material";
import style from './Product.module.css'
import Header2 from "../../components/Header/Header";
import Rating from '@mui/material/Rating';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import Avatar from '@mui/material/Avatar';
import Pagination from '@mui/material/Pagination';
const Detailfeedback = ({ open, handleClose, datafb }) => {
    console.log(datafb);
    const itemsPerPage = 2;
    const [currentPage, setCurrentPage] = useState(1);
    const [average, setAverage] = useState(1);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = datafb.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(datafb.length / itemsPerPage);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    useEffect(() => {
        if (datafb.length > 0) {
            const sum = datafb.reduce((total, item) => total + item.number, 0);
            setAverage(sum / datafb.length);
        } else {
            setAverage(0);
        }
    }, []);

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
                width: "70%",
                height: "90%",
                bgcolor: 'background.paper',
                border: '0.1px solid #000',
                borderRadius: "5px",
                boxShadow: 24,
                p: 4,
            }}>
                <div className={style.header}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" >
                        <Header2 title={"Đánh giá cửa hàng"} />
                        <Button startIcon={<CloseIcon />} onClick={handleClose}></Button>
                    </Box>
                </div>
                <div className={style.container}>
                    <div className={style.body}>
                        <div className={style.top_fb}>
                            <Box sx={{
                                display: "flex",
                            }}>

                                <Box
                                    sx={{
                                        '& > legend': { mt: 2 },
                                        alignItems: "center",
                                        width: "30%"
                                    }}
                                >
                                    <Typography variant="h4">{average} trên 5</Typography>
                                    <Rating
                                        name="simple-controlled"
                                        value={average}
                                    />
                                </Box>
                                <Box
                                    sx={{
                                        gap: "10px",
                                        width: "70%",
                                        justifyContent: "space-between",
                                        display: "flex",
                                    }}
                                >
                                    <Button>Tất cả</Button>
                                    <Button>1 sao</Button>
                                    <Button>2 sao</Button>
                                    <Button>3 sao</Button>
                                    <Button>4 sao</Button>
                                    <Button>5 sao</Button>


                                </Box>
                            </Box>
                        </div>
                        <div className={style.bot_fb}>
                            {currentItems.map(item => (
                                <Box sx={{ display: 'flex', gap: "10px", borderBottom: " 0.1px solid #ccc", pb: "20px", mb: "30px" }}>
                                    <Box>
                                        <Avatar alt="Remy Sharp" src={item.user.photo} />
                                    </Box>
                                    <Box
                                        sx={{
                                            '& > legend': { mt: 2 },
                                            width: "80%"
                                        }}
                                    >
                                        <Typography variant="h5">{item.user.firstName} {item.user.lastName}</Typography>
                                        <Rating
                                            name="simple-controlled"
                                            value={item.number}
                                        />
                                        <Typography variant="h6">{item.createdAt}</Typography>
                                        <Typography variant="h4">{item.content}</Typography>
                                        <Box display="flex" paddingTop="5px" gap="5px">
                                            {item.images.map(item =>
                                                (<img className={style.fb_img} src={item} />)

                                            )}

                                        </Box>
                                    </Box>
                                </Box>
                            ))}
                        </div>
                    </div>
                    <div className={style.poster}>
                        <Box>
                            <Pagination
                                count={totalPages}
                                page={currentPage}
                                onChange={handlePageChange}
                            />
                        </Box>
                    </div>
                </div>
            </Box>
        </Modal >
    );
};
export default Detailfeedback;