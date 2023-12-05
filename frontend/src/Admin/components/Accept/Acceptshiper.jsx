import React, { useState, useRef, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

function Accept({ rows, show, handleClose, AcceptStore }) {
    const Acceptw = (id) => {
        handleClose(false);
        AcceptStore(id);
    }
    return (
        <div>

            <Modal show={show} onHide={() => handleClose(false)} animation={true}>
                <Modal.Header closeButton={() => handleClose(false)}>
                    <Modal.Title>Cấp phép hoạt động</Modal.Title>
                </Modal.Header>
                <Modal.Body>id: {rows._id}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleClose(false)}>
                        Đóng
                    </Button>
                    <Button variant="success" onClick={() => Acceptw(rows._id)} >
                        Cấp phép
                    </Button>

                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Accept
