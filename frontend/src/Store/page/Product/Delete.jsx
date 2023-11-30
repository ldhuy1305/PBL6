import React, { useState, useRef, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

function Delete({ selectedRow, setOpenDelete, setError, fetchData, setMessage, setOpenNotify }) {
    const token = localStorage.getItem('token');
    const _id = localStorage.getItem('_id');
    const api = `https://falth-api.vercel.app/api/product/store/${_id}?limit=100`;
    const handleDeleteProduct = async (id) => {
        console.log('delete product')
        try {
            await axios.delete(`https://falth-api.vercel.app/api/product/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setError(true);
            setMessage("Xóa thành công");
            fetchData();
            setOpenDelete(false);
            setOpenNotify(true);
        } catch (error) {
            console.log(error);
            setError(false);
            setMessage(error.message);
            setOpenNotify(true);
        }
    };

    return (
        <div>

            <Modal show={true} onHide={() => setOpenDelete(false)} animation={true}>
                <Modal.Header closeButton={() => setOpenDelete(false)}>
                    <Modal.Title>Thông báo</Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn muốn xóa sản phẩm: {selectedRow.name}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setOpenDelete(false)}>
                        Đóng
                    </Button>
                    <Button variant="danger" onClick={() => handleDeleteProduct(selectedRow._id)}>
                        Xóa
                    </Button>

                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Delete
