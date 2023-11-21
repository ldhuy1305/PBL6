import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { deleteContact } from '../../services/userServices';
import LoadingModal from '../Loading/Loading';
import { useState } from 'react';
import Notify from '../Notify.jsx/Notify';
const DeleteConfirmationModal = ({ show, handleClose, handleDelete, id, action, setContacts }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [openNotify, setOpenNotify] = useState(false)
    const [message, setMessage] = useState("")

    const handleDeleteItem = async() => {
        console.log(action)
        if(action === 'contact') {
            setIsLoading(true)
            const user = localStorage.getItem("user");
            const userData = JSON.parse(user);
            const contactIndex = userData.contact.findIndex(contact => contact._id === id);
            if (contactIndex !== -1) {
                userData.contact.splice(contactIndex, 1);
            }
            localStorage.setItem("user", JSON.stringify(userData));
            handleClose();
            const  response = await deleteContact(id)
            setContacts(userData.contact)
            setIsLoading(false)
            setMessage("Xóa địa chỉ thành công!")
            setOpenNotify(true)
        } else if (action === 'cart') {
            setIsLoading(true)
            handleDelete(id);
            handleClose();
            setIsLoading(false)
        }
    };
    return (
        <div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Cảnh Báo Xóa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có chắc chắn muốn xóa mục này?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Hủy
                    </Button>
                    <Button variant="danger" onClick={handleDeleteItem}>
                        Xóa
                    </Button>
                </Modal.Footer>
            </Modal>
            {isLoading && (<LoadingModal />)}
            {openNotify && (<Notify message={message} setOpenNotify={setOpenNotify}/>)}
        </div>
    );
};

export default DeleteConfirmationModal;
