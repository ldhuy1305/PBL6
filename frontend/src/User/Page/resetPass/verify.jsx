import React, { useState } from 'react'
import '../../assets/fonts/fontawesome-free-6.2.0-web/css/all.min.css'
import { useNavigate, useLocation } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { Troubleshoot } from '@mui/icons-material';
const Verify = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const [otp, setOTP] = useState("");
    const [error, seterror] = useState("");
    const location = useLocation();
    const action = location.state.action;
    const email = location.state.email;
    const isButtonDisabled = otp.length !== 6;
    const [loadingAPI, setLoadingAPI] = useState(false);
    const handleVerify = async () => {
        // const verify = {
        //     signUpToken: otp
        // };
        // console.log(verify)
        if (action === "verifyUser") {
            setLoadingAPI(true);
            try {
                // Gọi API đăng ký người dùng
                const response = await axios.post(`https://falth.vercel.app/api/user/${email}`, {signUpToken: otp});
                handleShow()
            } catch (error) {
                seterror(t("error4"))
            }
            setLoadingAPI(false);
        } else if (action === 'verifyShipper') {
            setLoadingAPI(true);
            try {
                // Gọi API đăng ký người dùng
                const response = await axios.post(`https://falth.vercel.app/api/shipper/${email}`, {signUpToken: otp});
                handleShow()
            } catch (error) {
                seterror(t("error4"))
            }
            setLoadingAPI(false);
        } else if (action === 'verifyStore') {
            setLoadingAPI(true);
            try {
                // Gọi API đăng ký người dùng
                const response = await axios.post(`https://falth.vercel.app/api/owner/${email}`, {signUpToken: otp});
                handleShow()
            } catch (error) {
                seterror(t("error4"))
            }
            setLoadingAPI(false);
        } else if (action === "verifyToken") {
            setLoadingAPI(true);
            try {
                const response = await axios.post(`https://falth.vercel.app/api/auth/verify-token/${email}`, {token: otp});    
                console.log('Đăng ký thành công', response.data);
                navigate("/resetPass", {state: {email: email, token: otp}})
            } catch (error) {
                seterror(t("error4"))
            }
            setLoadingAPI(false);
        }
        
    };
    const [show, setShow] = useState(false)
    const handleClose = () => {
        setShow(false)
        navigate("/")
    }
    const handleShow = () => {
        setShow(true)
    }
    const handleNavSignin = () => {
        navigate("/signin")
    }
    return (
        <div>

            <div class="now-login">
                <div class="content">
                    <div class="title">{t("verifyTitle")}</div>
                    {error && <div className="alert-danger">{error}</div>}
                    <div class="form-login-input">
                        <div class="field-group">
                            <div class="input-group">
                                <i class="far fa-solid fa-lock"></i>
                                <input type="text" placeholder={t("verifyMess")} value={otp} onChange={(e) => setOTP(e.target.value)} maxLength={6} />
                            </div>
                        </div>
                        <button class="btn btn-block" onClick={handleVerify} disabled={isButtonDisabled} style={{ flexDirection: 'row' }}>
                            {loadingAPI && <i class="fas fa-spinner fa-spin" style={{ color: 'white', position: 'inherit', marginRight: '10px' }}></i>}
                            {t("next")}
                        </button>
                    </div>
                </div>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>FALTH thông báo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Đăng kí tài khoản thành công! Mời bạn đăng nhập lại tài khoản.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Hủy
                    </Button>
                    <Button variant="danger" onClick={handleNavSignin}>                       
                        Ok
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Verify;