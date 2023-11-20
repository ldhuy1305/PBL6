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



function Add({ data, fetchData, setError, setMessage, setOpenNotify, show, handleClose }) {
    const [images, setImages] = useState([]);
    const token = localStorage.getItem('autoken');
    const _id = localStorage.getItem('_id');
    const [category, setCategory] = useState(data[0].catName);
    const api = `https://falth-api.vercel.app/api/product/store/${_id}?limit=100`;
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
            await axios.post(`https://falth-api.vercel.app/api/product/owner/${_id}`, formData, {
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
        <Modal show={show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title >Thêm sản phẩm</Modal.Title>
                <CloseButton />
                <CloseButton />
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={initialValues}
                    validationSchema={checkoutSchema}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleBlur,
                        handleChange,
                        handleSubmit,
                    }) => (
                        <Form>
                            <Box
                                display="grid"
                                gap="30px"
                                gridTemplateColumns="repeat(4, minmax(0, 1fr)"
                                sx={{
                                    "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                                }}
                            >
                                <Box display="flex" justifyContent="center" alignItems="center" sx={{ gridColumn: "span 4" }}>
                                    <Box >
                                        <Image images={images} setImages={setImages} setDeletedImageUrls={setDeletedImageUrls} />
                                    </Box>
                                </Box>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Tên sản phẩm"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    name="name"
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <Form.Group as={Col} md="4" controlId="validationCustom01">
                                    <Form.Label>Tên sản phẩm</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="First name"
                                        defaultValue="Mark"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Giá tiền"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    name="price"
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Mô tả"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    name="description"
                                    sx={{ gridColumn: "span 4" }}
                                />
                                <NativeSelect
                                    sx={{ gridColumn: "span 4" }}
                                    name="category"
                                    value={category}
                                    onBlur={(e) => setCategory(e.target.value)}
                                    onChange={(e) => setCategory(e.target.value)}
                                    defaultValue=""
                                >
                                    {data.map((option, index) => {
                                        return (
                                            <option value={option.catName}>{option.catName}</option>
                                        );
                                    })}
                                </NativeSelect>
                            </Box>
                            <Box display="flex" justifyContent="end" mt="20px">
                                <Button onClick={() => onSub(values)} color="secondary" variant="contained">
                                    Thêm mới
                                </Button>
                            </Box>
                        </Form>
                    )}
                </Formik>
            </Modal.Body>
        </Modal >
    )
}

export default Add;
