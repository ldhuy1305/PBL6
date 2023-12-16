import React from 'react';
import shipper from './shipper.jpg'
import './shipper.css'
import { useNavigate } from "react-router-dom";
const ShipperDashboard = () => {
    // const { isLoggedIn, setIsLoggedIn, userName, setUserName, img, setImg } = useAuth()
    const navigate = useNavigate()
    function handleLogout() {
        // logout();
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        navigate("/")
        console.log("thoát")
    }
  return (
    <div id="shipper-dashboard" class="hidden over">
    <img src={shipper} alt="Shipper Image"/>
    <p onClick={handleLogout}>Tải app để truy cập tài khoản shipper</p>
</div>
  );
};

export default ShipperDashboard;
