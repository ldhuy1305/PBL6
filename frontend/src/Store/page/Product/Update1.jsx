import React, { useState, useRef, useEffect } from 'react';
import { Box } from "@mui/material";
import * as yup from "yup";
import { Formik, Form } from "formik";
import { TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from 'axios';
import NativeSelect from '@mui/material/NativeSelect';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Image from "../../components/Image/Image";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Ims from "../../components/Image/showimage";
import Notify from '../../../Components/Notify/Notify';

function Update({ data, selectedRow, setOpenEdit, fetchData, setError, setMessage, setOpenNotify, show, showClode }) {
    const [images, setImages] = useState([]);
    const [name, setname] = useState(selectedRow.name);
    const [price, setprice] = useState(selectedRow.price);
    const [des, setdes] = useState(selectedRow.description);
    const [category, setCategory] = useState(selectedRow.category.catName);
    const [deletedImageUrls, setDeletedImageUrls] = useState([]);
    const [urls, setUrls] = useState(selectedRow.images[0]);
    useEffect(() => {
        setImages([]);
        selectedRow.images.map((image, i) =>
            setImages((prevImages) => [
                ...prevImages,
                {
                    url: image,
                },
            ])
        );
    }, []);

    const [isLoading, setIsLoading] = useState(true);
    const token = localStorage.getItem('autoken');
    const _id = localStorage.getItem('_id');
    const [selectActive, setSelectActive] = useState(false);
    const api = `https://falth.vercel.app/api/product/store/${_id}?limit=100`;
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [errorText, setErrorText] = useState("");
    const phoneRegExp =
        /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

    const checkoutSchema = yup.object().shape({
        name: yup.string().required("Tên là bắt buộc"),
        price: yup.string().required("Giá tiền là bắt buộc").matches(phoneRegExp, "Giá tiền không hợp lệ"),
        description: yup.string().required("Mô tả là bắt buộc"),
    });

    let formData = new FormData();

    const updateProduct = async () => {
        try {
            await axios.put(`https://falth.vercel.app/api/product/${selectedRow._id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setError(true);
            setMessage("Cập nhật thành công");
            showClode(false);
            fetchData();
            setOpenNotify(true);
        } catch (error) {
            setError(false);
            setMessage(error.message);
            setOpenNotify(true);
        }
    };

    const handleSubmit = (values) => {
        const tenSanPham = name;
        const giaTien = price;
        const moTa = des;

        checkoutSchema
            .validate({
                name: tenSanPham,
                price: giaTien,
                description: moTa,
            })
            .then(() => {
                formData.append('catName', category);
                formData.append('name', tenSanPham);
                formData.append('price', giaTien);
                formData.append('description', moTa);

                if (images.length === 0) {
                    setError(false);
                    setMessage("Bạn cần chọn ít nhất một hình ảnh.");
                    setOpenNotify(true);
                } else {
                    images.forEach((image) => {
                        if (image.file) {
                            formData.append('images', image.file);
                        }
                    });

                    deletedImageUrls.forEach((imageUrl) => {
                        formData.append('dels', imageUrl.url);
                    });

                    updateProduct();
                }
            })
            .catch((errors) => {
                console.log(errors);
                setError(false);
                setMessage(errors.errors[0]);
                setOpenNotify(true);
                setErrorText(errors.errors[0]);
            });
    };

    const initialValues = {
        name: "",
        price: "",
        description: "",
        contact: "",
    };

    const formRef = useRef();

    return (
        <Modal show={show} onHide={showClode}>
            <Modal.Header closeButton>
                <Modal.Title>Cập nhật sản phẩm</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Box m="20px">
                    <div>
                        <Formik initialValues={initialValues} validationSchema={checkoutSchema} onSubmit={() => { }}>
                            {({
                                values,
                                errors,
                                touched,
                                handleBlur,
                                handleChange,
                            }) => (
                                <Form ref={formRef}>
                                    <Box
                                        display="grid"
                                        gap="30px"
                                        gridTemplateColumns="repeat(4, minmax(0, 1fr)"
                                        sx={{
                                            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                                        }}
                                    >
                                        <Box
                                            display="flex"
                                            justifyContent="center"
                                            alignItems="center"
                                            sx={{ gridColumn: "span 4" }}
                                        >
                                            <Box>
                                                <Ims
                                                    images={images}
                                                    setImages={setImages}
                                                    setDeletedImageUrls={setDeletedImageUrls}
                                                    urls={urls}
                                                    setUrls={setUrls}
                                                />
                                            </Box>
                                        </Box>
                                        <TextField
                                            fullWidth
                                            variant="filled"
                                            type="text"
                                            label="Tên sản phẩm"
                                            value={name}
                                            onBlur={handleBlur}
                                            onChange={(e) => setname(e.target.value)}
                                            name="name"
                                            sx={{ gridColumn: "span 2" }}
                                        />
                                        <TextField
                                            fullWidth
                                            variant="filled"
                                            type="text"
                                            label="Giá tiền"
                                            value={price}
                                            onBlur={handleBlur}
                                            onChange={(e) => setprice(e.target.value)}
                                            name="price"
                                            sx={{ gridColumn: "span 2" }}
                                        />
                                        <TextField
                                            fullWidth
                                            variant="filled"
                                            type="text"
                                            label="Mô tả"
                                            value={des}
                                            onBlur={handleBlur}
                                            onChange={(e) => setdes(e.target.value)}
                                            name="description"
                                            sx={{ gridColumn: "span 4" }}
                                        />
                                        <NativeSelect
                                            sx={{ gridColumn: "span 4" }}
                                            name="category"
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                        >
                                            {data.map((option, index) => (
                                                <option key={index} value={option.catName}>
                                                    {option.catName}
                                                </option>
                                            ))}
                                        </NativeSelect>
                                    </Box>


                                    <Box display="flex" justifyContent="end" mt="20px">
                                        <Box sx={{ gridColumn: "span 3", color: 'red', fontSize: "15px", padding: "0px 50px" }}>
                                            {errorText}
                                        </Box>
                                        <Button
                                            type="button"
                                            onClick={() => handleSubmit(values)}
                                            color="secondary"
                                            variant="contained"
                                        >
                                            Cập nhật
                                        </Button>
                                    </Box>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </Box>
            </Modal.Body>
        </Modal>
    );
}

export default Update;
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import * as formik from 'formik';
import * as yup from 'yup';

function FormExample() {
    const { Formik } = formik;

    const schema = yup.object().shape({
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        username: yup.string().required(),
    });

    return (
        <Formik
            validationSchema={schema}
            onSubmit={console.log}
            initialValues={{
                firstName: '',
                lastName: '',
                username: '',
                city: '',
                state: '',
                zip: '',
                file: null,
                terms: false,
            }}
        >
            {({ handleSubmit, handleChange, values, touched, errors }) => (
                <Form noValidate onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="4" controlId="validationFormikUsername2">
                            <Form.Label>Username</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    type="text"
                                    placeholder="Username"
                                    aria-describedby="inputGroupPrepend"
                                    name="username"
                                    value={values.username}
                                    onChange={handleChange}
                                    isInvalid={!!errors.username}
                                />
                                <Form.Control.Feedback type="invalid" tooltip>
                                    {errors.username}
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="validationFormikUsername2">
                            <Form.Label>Username</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    type="text"
                                    placeholder="Username"
                                    aria-describedby="inputGroupPrepend"
                                    name="username"
                                    value={values.username}
                                    onChange={handleChange}
                                    isInvalid={!!errors.username}
                                />
                                <Form.Control.Feedback type="invalid" tooltip>
                                    {errors.username}
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group
                            as={Col}
                            md="6"
                            controlId="validationFormik103"
                            className="position-relative"
                        >
                            <Form.Label>City</Form.Label>
                            <Form.Control
                                type="textarea"
                                placeholder="City"
                                name="city"
                                value={values.city}
                                onChange={handleChange}
                                isInvalid={!!errors.city}
                            />

                            <Form.Control.Feedback type="invalid" tooltip>
                                {errors.city}
                            </Form.Control.Feedback>
                        </Form.Group>


                    </Row>
                    <Button type="submit">Submit form</Button>
                </Form>
            )}
        </Formik>
    );
}

export default FormExample;
