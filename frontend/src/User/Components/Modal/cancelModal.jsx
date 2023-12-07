import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import LoadingModal from '../Loading/Loading';
import { useState } from 'react';
import Notify from '../Notify.jsx/Notify';
import axios from 'axios';
import { cancelOrder } from '../../services/userServices';
const CancelModal = ({ show, handleClose, orderItem, setOrderItem }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [openNotify, setOpenNotify] = useState(false)
    const [message, setMessage] = useState('')
    const handleCancel = async () => {
        try {
            setIsLoading(true)
            const token = localStorage.getItem("token")
            await axios.put(
                `https://falth-api.vercel.app/api/order/${orderItem._id}/cancel`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            const updatedItem = { ...orderItem, status: 'Cancelled' };
            setOrderItem(updatedItem);
            setMessage('Hủy đơn hàng thành công!')
            setOpenNotify(true)
        } catch (error) {
            console.error("Error thất bại:", error);
            setMessage('Hủy đơn hàng thất bại!')
            setOpenNotify(true)
        }
        setIsLoading(false)
        handleClose()
    }
    return (
        <div>

            <Modal show={show} onHide={handleClose} style={{ zIndex: '100001' }}>
                <Modal.Header closeButton>
                    <Modal.Title>Cảnh Báo Huỷ Đơn Hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    Bạn có chắc chắn muốn hủy đơn hàng này?
                </Modal.Body>
                <Modal.Footer className="justify-content-end">
                    <Button variant="secondary" onClick={handleClose}>
                        Không
                    </Button>
                    <Button variant="danger" onClick={handleCancel} default>
                        Đồng ý
                    </Button>
                </Modal.Footer>
            </Modal>
            {isLoading && (<LoadingModal />)}
            {openNotify && (<Notify message={message} setOpenNotify={setOpenNotify} />)}
        </div>
    );
};

export default CancelModal;
