import React, { useState, useRef, } from 'react';
import { Box, colors, } from "@mui/material";
import Image from "../../components/Image/Image";
import * as yup from "yup";
import { Formik, Form } from "formik";
import { TextField, NativeSelect } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import CloseButton from 'react-bootstrap/CloseButton';
import Col from 'react-bootstrap/Col';
import Header1 from '../../components/Header/Header1';

const Product = ({ data, fetchData, setError, setMessage, setOpenNotify, show, handleClose }) => {
    const [images, setImages] = useState([]);
    const token = localStorage.getItem('autoken');
    const _id = localStorage.getItem('_id');
    const [category, setCategory] = useState(data[0].catName);
    const api = `https://falth.vercel.app/api/product/store/${_id}?limit=100`;
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [deletedImageUrls, setDeletedImageUrls] = useState([]);
    const initialValues = {
        name: "",
        price: "",
        description: "",
    };
    let formData = new FormData();

    const phoneRegExp =
        /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

    const checkoutSchema = yup.object().shape({
        name: yup.string().required("Tên là bắt buộc"),
        price: yup.string().required("Giá tiền là bắt buộc").matches(phoneRegExp, "Giá tiền không hợp lệ"),
        description: yup.string().required("Mô tả là bắt buộc"),
    });

    const Addproduct = async (formData) => {
        try {
            await axios.post(`https://falth.vercel.app/api/product/owner/${_id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setError(true);
            setMessage("Thêm thành công");
            handleClose(false);
            fetchData();
            setOpenNotify(true);

        } catch (error) {
            setError(false);
            setMessage(error.message);
            setOpenNotify(true);
        }
    };
    const onSub = (values) => {
        const tenSanPham = values.name;
        const giaTien = values.price;
        const moTa = values.description;
        const danhMuc = category;

        checkoutSchema.validate({
            name: tenSanPham,
            price: giaTien,
            description: moTa,
        })
            .then(valid => {

                formData.append('catName', danhMuc);
                formData.append('name', tenSanPham);
                formData.append('price', giaTien);
                formData.append('description', moTa);
                console.log(images)
                if (images.length === 0) {
                    setError(false);
                    setMessage("Bạn cần chọn ít nhất một hình ảnh.");
                    setOpenNotify(true);
                } else {
                    images.forEach((image, i) =>
                        formData.append('images', image.file)
                    );
                    Addproduct(formData);
                }
            })
            .catch(errors => {
                console.log(errors);
                setError(false);
                setMessage(errors.errors[0]);
                setOpenNotify(true);
            });
    }
    return (

        <Box m="20px 100px">
            <Header1 title={"Thống kê"} />
            <Box
                display="grid"
                gridTemplateColumns="repeat(6, 1fr)"
                gridAutoRows="10vh"
                gap="5px"
            >
                {/* ORDER */}
                <Box
                    gridColumn="span 4"
                    display="flex"
                    gridRow="span 7"
                    alignItems="center"
                    justifyContent="center"
                >sdđsdssdsđs
                </Box>
                <Box
                    gridColumn="span 2"
                    gridRow="span 4"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                </Box>

            </Box>
        </Box>
    );
};

export default Product;
