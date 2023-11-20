import React, { useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import Image from "../../components/Image/Image";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import CloseButton from 'react-bootstrap/CloseButton';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
function Add({ data, fetchData, setError, setMessage, setOpenNotify, show, handleClose }) {
    const [images, setImages] = useState([]);
    const token = localStorage.getItem('autoken');
    const _id = localStorage.getItem('_id');
    const [category, setCategory] = useState(data[0].catName);
    const [deletedImageUrls, setDeletedImageUrls] = useState([]);
    const [validated, setValidated] = useState(false);
    const phoneRegExp =
        /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
    const schema = yup.object().shape({
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
    let formData = new FormData();
    return (
        <Modal show={show} onHide={handleClose} animation={true}>
            <Modal.Header closeButton>
                <Modal.Title>Thêm sản phẩm</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    validationSchema={schema}
                    onSubmit={(values) => {

                        const tenSanPham = values.name;
                        const giaTien = values.price;
                        const moTa = values.description;
                        const danhMuc = values.catName;

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
                    }}
                    initialValues={{
                        name: "",
                        price: "",
                        description: "",
                        catName: data[1].catName,

                    }}
                >
                    {({ handleSubmit, handleChange, values, touched, errors }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            <Form.Group as={Col} md="12" controlId="validationFormikUsername2">
                                <div style={{ margin: "0 18%" }}>
                                    <InputGroup>
                                        <Image images={images} setImages={setImages} setDeletedImageUrls={setDeletedImageUrls} />
                                    </InputGroup>
                                </div>
                            </Form.Group>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="6" controlId="validationFormikUsername2">
                                    <Form.Label>Tên sản phẩm</Form.Label>
                                    <InputGroup hasValidation>
                                        <Form.Control
                                            type="text"
                                            placeholder="Tên sản phẩm"
                                            aria-describedby="inputGroupPrepend"
                                            name="name"
                                            value={values.name}
                                            onChange={handleChange}
                                            isInvalid={!!errors.name}
                                        />
                                        <Form.Control.Feedback type="invalid" tooltip>
                                            {errors.name}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group as={Col} md="6" controlId="validationFormikUsername2">
                                    <Form.Label>Giá tiền</Form.Label>
                                    <InputGroup hasValidation>
                                        <Form.Control
                                            type="text"
                                            placeholder="Giá tiền"
                                            aria-describedby="inputGroupPrepend"
                                            name="price"
                                            value={values.price}
                                            onChange={handleChange}
                                            isInvalid={!!errors.price}
                                        />
                                        <Form.Control.Feedback type="invalid" tooltip>
                                            {errors.price}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group
                                    as={Col}
                                    md="12"
                                    controlId="validationFormik103"
                                    className="position-relative"
                                >
                                    <Form.Label>Mô tả</Form.Label>
                                    <Form.Control
                                        type="textarea"
                                        placeholder="Mô tả"
                                        name="description"
                                        value={values.description}
                                        onChange={handleChange}
                                        isInvalid={!!errors.description}
                                    />
                                    <Form.Control.Feedback type="invalid" tooltip>
                                        {errors.description}
                                    </Form.Control.Feedback>
                                </Form.Group>


                            </Row>
                            <Row className="mb-3">
                                <Form.Group
                                    as={Col}
                                    md="12"
                                    controlId="validationFormik103"
                                    className="position-relative"
                                >
                                    <Form.Label>Danh mục</Form.Label>
                                    <FormControl
                                        as="select"
                                        name="catName"
                                        value={values.catName}
                                        onChange={handleChange}
                                    >
                                        {data.map((option, index) => (
                                            <option key={index} value={option.catName}>
                                                {option.catName}
                                            </option>
                                        ))}
                                    </FormControl>
                                </Form.Group>
                            </Row>

                            <Button style={{ margin: "10px" }} type="submit">Thêm sản phẩm</Button>
                        </Form>
                    )}
                </Formik>
            </Modal.Body>
        </Modal>
    );
}

export default Add;
