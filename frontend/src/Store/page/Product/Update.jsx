import React, { useState, useRef, useEffect } from 'react';
import { Box } from "@mui/material";
import Header from "../../components/Header/Header";
import * as yup from "yup";
import { Formik, Form } from "formik";
import { Button, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from 'axios';
import NativeSelect from '@mui/material/NativeSelect';
import Loading from '../../components/Loading/Loading'
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Image from "../../components/Image/Image";
import Ims from "../../components/Image/showimage";




function Update({ data, selectedRow, setOpenEdit, fetchData, setError, setMessage, setOpenNotify }) {

    const [images, setImages] = useState([]);
    const [name, setname] = useState(selectedRow.name);
    const [price, setprice] = useState(selectedRow.price);
    const [des, setdes] = useState(selectedRow.description);
    const [category, setCategory] = useState(selectedRow.category.catName);
    const [deletedImageUrls, setDeletedImageUrls] = useState([]);
    useEffect(() => {
        setImages([])
        selectedRow.images.map((image, i) =>

            setImages((prevImages) => [
                ...prevImages,
                {
                    url: image,
                },
            ])
        )
    }, []);

    const [isLoading, setIsLoading] = useState(true);
    const token = localStorage.getItem('autoken');
    const _id = localStorage.getItem('_id');

    const [selectActive, setSelectActive] = useState(false);
    const api = `https://falth-api.vercel.app/api/product/store/${_id}?limit=100`;
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const priceRegExp = /^\d+$/;


    const checkoutSchema = yup.object().shape({
        name: yup.string().required("Tên là bắt buộc"),
        price: yup.string().required("Giá tiền là bắt buộc").matches(priceRegExp, "Giá tiền không hợp lệ"),
        description: yup.string().required("Mô tả là bắt buộc"),
    });
    let formData = new FormData();
    const Updateproduct = (values) => {
        const tenSanPham = name;
        const giaTien = price;
        const moTa = des;
        const danhMuc = category;
        console.log(tenSanPham, giaTien, moTa)

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
                if (images.length === 0) {
                    setError(false);
                    setMessage("Bạn cần chọn ít nhất một hình ảnh.");
                    setOpenNotify(true);
                } else {
                    images.forEach((image, i) => { if (image.file) { formData.append('images', image.file) } }
                    );
                    deletedImageUrls.forEach(
                        (imageUrl, i) => { formData.append('dels', imageUrl.url) }
                    )
                    Update(formData);
                }
            })
            .catch(errors => {
                console.log(errors);
                setError(false);
                setMessage(errors.errors[0]);
                setOpenNotify(true);
            });
    };
    const Update = async (json) => {
        try {
            await axios.put(`https://falth-api.vercel.app/api/product/${selectedRow._id}`, json, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setError(true);
            setMessage("Cập nhật thành công");
            setOpenEdit(false);
            fetchData();
            setOpenNotify(true);

        } catch (error) {
            setError(false);
            setMessage(error.message);
            setOpenNotify(true);
        }
    };
    const initialValues = {
        name: "",
        price: "",
        description: "",
        contact: "",
    };

    const formRef = useRef();
    return (
        <div >
            <div>
                <Box>
                    <div ><div>
                    </div>
                        <Box display="flex" justifyContent="end" mt="20px" gap="55px">
                            <h3>Cập nhật sản phẩm</h3>
                            <Button onClick={() => setOpenEdit(false)} pb="10px">
                                <i style={{ fontSize: "20px" }} class="fa-solid fa-xmark"></i>
                            </Button>
                        </Box>

                        < Formik
                            initialValues={initialValues}
                            validationSchema={checkoutSchema}
                        >
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
                                        <Box display="flex" justifyContent="center" alignItems="center" sx={{ gridColumn: "span 4" }} >
                                            <Box>

                                                <Image images={images} setImages={setImages} setDeletedImageUrls={setDeletedImageUrls} />

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
                                            {data.map((option, index) => {
                                                return (
                                                    <option value={option.catName}>{option.catName}</option>
                                                );
                                            })}
                                        </NativeSelect>

                                    </Box>
                                    <Box display="flex" justifyContent="end" mt="20px">
                                        <Button type='submit' onClick={() => Updateproduct(values)} color="secondary" variant="contained">
                                            Cập nhật
                                        </Button>
                                    </Box>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </Box>
            </div >
        </div >
    )
}

export default Update
