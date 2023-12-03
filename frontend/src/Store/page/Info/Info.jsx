import React, { useState, useRef, useEffect } from 'react';
import style from './Info.css'
import axios from 'axios';
import * as yup from "yup";
import { useTheme, Box } from "@mui/material";
import { tokens } from "../../theme";
import Loading from '../../components/Loading/Loading'
import Notify from '../../../Components/Notify/Notify';
import Header2 from '../../components/Header/Header2'


const UserProfile = () => {

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [openingHours, setOpeningHours] = useState('');
    const [closingHours, setClosingHours] = useState('');
    const [password, setPassword] = useState('');
    const [newpassword, setnewPassword] = useState('');
    const [isPasswordChangeVisible, setPasswordChangeVisible] = useState(false);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [imgLink, setimgLink] = useState("");
    const [img, setimg] = useState(null);
    const token = localStorage.getItem('token');
    const _id = localStorage.getItem('_id');
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [openNotify, setOpenNotify] = useState(null)
    const [error, setError] = useState(false)
    const [message, setMessage] = useState("")
    const phoneRegExp =
        /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

    const checkoutSchema = yup.object().shape({
        name: yup.string().required("Tên là bắt buộc"),
        address: yup.string().required("Địa chỉ là bắt buộc"),
        phoneNumber: yup.string().required("Số điện thoại là bắt buộc").matches(phoneRegExp, "Số điện thoại không hợp lệ"),
        openingHours: yup.string().required("Giờ mở cửa là bắt buộc"),
        closingHours: yup.string().required("Giờ đóng cửa là bắt buộc"),
    });

    const handleSubmit = (event) => {
        event.preventDefault();

        checkoutSchema.validate({
            name: name,
            address: address,
            phoneNumber: phoneNumber,
            openingHours: openingHours,
            closingHours: closingHours,
        })
            .then(valid => {
                let formData = new FormData()
                console.log(img)
                formData.append("image", img);
                formData.append("name", name);
                formData.append("address", address);
                formData.append("phoneNumber", phoneNumber);
                formData.append("openAt", openingHours);
                formData.append("closeAt", closingHours);
                formData.append("description", description);
                if (isPasswordChangeVisible) {
                    formData.append("password", password);
                    formData.append("newPassword", newpassword);
                    UpdateStore(formData);
                } else {
                    UpdateStore(formData);
                }
            })
            .catch(errors => {
                console.log(errors);
                setError(false);
                setMessage(errors.errors[0]);
                setOpenNotify(true);
            });
    };


    const getdatainfostore = async (json) => {
        try {
            const response = await axios.get(`https://falth-api.vercel.app/api/store/owner/${_id}`, json
                , {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            const responseData = response.data.data;

            setData(responseData);
            console.log(responseData);
            setInfostore();
        } catch (error) {
            console.log(error);
        }
        finally {
            setTimeout(() => { setIsLoading(false) }, 3000)

        }

    }

    const setInfostore = async () => {
        console.log(data);
        console.log(data.openAt);
        setimgLink(data.image);
        setName(data.name);
        setAddress(data.address);
        setClosingHours(data.closeAt);
        setOpeningHours(data.openAt);
        setPhoneNumber(data.phoneNumber);
        setDiscription(data.description);
    }
    const [description, setDiscription] = useState("");
    useEffect(() => {
        getdatainfostore();
        console.log(data.openAt);
        console.log(data);

    }, []);
    useEffect(() => {
        setInfostore();
    }, [data]);



    const UpdateStore = async (formData) => {
        try {
            const response = await axios.put(`https://falth-api.vercel.app/api/store/${_id}`, formData
                , {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setIsLoading(true);
            getdatainfostore();
        } catch (error) {
            console.log(error);
        }
    };



    const togglePasswordChange = () => {
        setPasswordChangeVisible(!isPasswordChangeVisible);
    };
    const handleNewPasswordChange = (event) => {
        setnewPassword(event.target.value);
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    };

    const handlePhoneNumberChange = (event) => {
        setPhoneNumber(event.target.value);
    };

    const handleOpeningHoursChange = (event) => {
        setOpeningHours(event.target.value);
    };

    const handleClosingHoursChange = (event) => {
        setClosingHours(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const handleDiscriptionChange = (event) => {
        setDiscription(event.target.value);
    };

    return (
        <Box m="0px 20px" position='relative'>
            <Header2 title=" Thông tin cửa hàng" />
            <Box
                m="0 0 0 0"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                    },
                    "& .name-column--cell": {
                        color: colors.greenAccent[300],
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: colors.blueAccent[700],
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: colors.primary[400],
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: colors.blueAccent[700],
                    },
                }}
            >
                <div className="now-detail-profile1" style={{
                    borderRadius: "4px",
                    boxShadow: " 0 0 3px 0 rgba(50,50,50,.3)"
                }} >

                    {isLoading ? (
                        <div style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                            height: "70vh",
                        }}>
                            <Loading />
                        </div>

                    ) : (
                        <div className="content-user-profile1">

                            <div className="user-profile-update11">
                                <form >
                                    <div className="title-user1">Thay đổi thông tin</div>
                                    <div className="form-group11">
                                        <div className="col-3_11">Tên quán</div>
                                        <div className="col-91">
                                            <div className="input-group11">
                                                <input
                                                    name="name"
                                                    placeholder="Tên"
                                                    type="text"
                                                    className="form-control1"
                                                    value={name}
                                                    onChange={handleNameChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group11">
                                        <div className="col-3_11">Địa chỉ</div>
                                        <div className="col-91">
                                            <div className="input-group11">
                                                <input
                                                    name="address"
                                                    placeholder="Địa chỉ"
                                                    type="text"
                                                    className="form-control1"
                                                    value={address}
                                                    onChange={handleAddressChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group11">
                                        <div className="col-3_11">Số điện thoại</div>
                                        <div className="col-91">
                                            <div className="input-group11">
                                                <input
                                                    name="phoneNumber"
                                                    placeholder="Số điện thoại"
                                                    type="text"
                                                    className="form-control1"
                                                    value={phoneNumber}
                                                    onChange={handlePhoneNumberChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group11">
                                        <div className="col-3_11">Mô tả</div>
                                        <div className="col-91">
                                            <div className="input-group11">
                                                <input
                                                    name="discription"
                                                    placeholder="Mô tả"
                                                    type="text"
                                                    className="form-control1"
                                                    value={description}
                                                    onChange={handleDiscriptionChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group11">
                                        <div className="col-3_11">Giờ mở cửa</div>
                                        <div className="col-91">
                                            <div className="input-group11">
                                                <input
                                                    name="openingHours"
                                                    placeholder="Giờ mở cửa"
                                                    type="time"
                                                    className="form-control1"
                                                    value={openingHours}
                                                    onChange={handleOpeningHoursChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group11">
                                        <div className="col-3_11">Giờ đóng cửa</div>
                                        <div className="col-91">
                                            <div className="input-group11">
                                                <input
                                                    name="closingHours"
                                                    placeholder="Giờ đóng cửa"
                                                    type="time"
                                                    className="form-control1"
                                                    value={closingHours}
                                                    onChange={handleClosingHoursChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {isPasswordChangeVisible ? (
                                        <>
                                            <div className="form-group11">
                                                <div className="col-3_11">Mật khẩu cũ</div>
                                                <div className="col-91">
                                                    <div className="input-group11">
                                                        <input
                                                            name="oldPassword1"
                                                            placeholder="Mật khẩu cũ"
                                                            type="password"
                                                            className="form-control1"
                                                            value={password}
                                                            onChange={handlePasswordChange}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group11">
                                                <div className="col-3_11">Mật khẩu mới</div>
                                                <div className="col-91">
                                                    <div className="input-group11">
                                                        <input
                                                            name="newPassword"
                                                            placeholder="Mật khẩu mới"
                                                            type="password"
                                                            className="form-control1"
                                                            value={newpassword}
                                                            onChange={handleNewPasswordChange}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="form-group11">
                                                <div className="col-3_11">Mật khẩu</div>
                                                <div className="col-91">
                                                    <div className="input-group11">
                                                        <span className="show-pass1">********</span>
                                                        <button type="button" className="change-pass1" onClick={togglePasswordChange}>
                                                            Đổi mật khẩu
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                    <div className="row11">
                                        <div className="col-3_11">
                                            <button onClick={handleSubmit} className="btn11 btn-blue-4 btn-block">Lưu thay đổi</button>
                                        </div>
                                    </div>
                                    {
                                        openNotify && (
                                            <div className="form-container"
                                                style={{ position: "absolute", zIndex: 1000, width: "40%", top: '30%', right: '30%', background: colors.primary[400], border: colors.primary[900] }}>
                                                <Box m="20px" >
                                                    <Notify error={error} message={message} setOpenNotify={setOpenNotify} />
                                                </Box>
                                            </div>
                                        )
                                    }
                                </form>
                            </div>
                            <div className="user-profile-update1">
                                <div className="title-user1">Tải ảnh đại diện</div>
                                <div className="row11">
                                    <div className="col-3_11">
                                        <div className="user-avatar-image1">
                                            <img className="user-avatar-image1" src={imgLink} id="avatar_user" />
                                        </div>

                                    </div>
                                    <div className="col-91">
                                        <div className="form-group1" style={{ justifyContent: "center", display: "flex", flexDirection: "column" }}>
                                            <span style={{ display: "inline" }}>Tải lên từ</span>
                                            <div className="custom-file-image1">
                                                <input type="file" id="validatedCustomFile1" className="input-custom11" required="" hidden accept="image/*"
                                                    onChange={({ target: { files } }) => {
                                                        if (files) {
                                                            setimg((files[0]))
                                                            setimgLink(URL.createObjectURL(files[0]))
                                                        }
                                                    }} />
                                                <label className="label-custom11" htmlFor="validatedCustomFile1">Chọn</label>
                                                <span className="font-italic1 font131">Chấp nhận GIF, JPEG, PNG, BMP với kích thước tối đa 5.0 MB</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </Box >
        </Box >

    );
};

export default UserProfile;
