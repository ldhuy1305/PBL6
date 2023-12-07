import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from "react-i18next";
import '../../assets/css/productDetail2.css'
import Comment from "./comment";
const ShipperInfoModal = ({ show, handleClose, shipper, ratings, setRatings, idUser }) => {
    const { t } = useTranslation()

    return (
        <div>
            <Modal className="modal fade bd-example-modal-lg " show={show} handleClose={handleClose} size="lg">
                <Modal.Title style={{ textAlign: 'center', margin: '10px 0 0 0' }}>Thông tin nhân viên giao hàng
                    <button onClick={handleClose} style={{ backgroundColor: '#cf2127', float: 'right', marginRight: '10px', padding: '3px 10px 5px 10px', borderRadius: '5px', color: 'white' }}>
                        x
                    </button>
                </Modal.Title>
                <Modal.Header>
                </Modal.Header>
                <Modal.Body>
                    <div class="now-detail-restaurant clearfix" style={{ width: '90%', marginLeft: '5%', height: '400px' }}>
                        <div class="container" style={{ width: '100%' }}>
                            <div class="detail-restaurant-img" style={{ width: '40%', height: '100%' }}>
                                <div class="img">
                                    <img src={shipper ? shipper.photo : ''} alt="" id="avatar_user" style={{ borderRadius: '50%' }} />
                                </div>
                                {/* <div class="img" style={{ width: 'auto' }}>
                                    <img
                                        src={shipper.photo}
                                        alt={shipper.name}
                                        class=""
                                        style={{ height: '200px', width: '100%', marginLeft: '0' }}
                                    />
                                </div> */}
                            </div>

                            <div class="detail-restaurant-info" style={{ width: '56%' }}>
                                <div class="product-essential-detail" style={{ width: '100%' }}>
                                    <h1 class="name-restaurant" style={{marginBottom:'30px'}}>
                                        {shipper ? shipper.lastName + shipper.firstName : ''}
                                    </h1>
                                    <form>                                       
                                        <div class="row form-group align-items-center">
                                            <div class="col-4 txt-bold">Email</div>
                                            <div class="col-8">
                                                    <div class="show-email">{shipper ? shipper.email : ''}</div>
                                            </div>
                                        </div>
                                        <div class="row form-group align-items-center">
                                            <div class="col-4 txt-bold">
                                                {t("address1")}

                                            </div>
                                            <div class="col-8">
                                                {shipper ? shipper.contact[0].address : ''}
                                            </div>
                                        </div>
                                        <div class="row form-group align-items-center">
                                            <div class="col-4 txt-bold">
                                                {t("phoneNumber")}

                                            </div>
                                            <div class="col-4">
                                            {shipper ? shipper.contact[0].phoneNumber : ''}
                                            </div>
                                        </div>


                                    </form>


                                </div>

                            </div>
                        </div>
                    </div>

                    <div class="container relative clearfix" style={{ width: '100%' }}>
                        <div class="now-menu-restaurant" style={{ width: '100%' }}>
                            <div class="menu-restaurant-tab">
                                <div class="item active" style={{ fontSize: '20px' }}>Đánh giá </div>
                            </div>
                            <div className="history-table-scroll">

                                <div class="menu-restaurant-content-tab">
                                    <div class="menu-restaurant-container">
                                        <div class="menu-restaurant-detail" style={{ width: '100%' }}>

                                            {/* <Comment product={product} ratings={ratings} idUser={idUser} setRatings={setRatings} /> */}

                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                    <div class="modal-footer content-center">
                        <div class="relative">
                            <button
                                type="button"
                                class="btn btn-danger btn-width-long"
                                onClick={handleClose}
                            >
                                Đóng
                            </button>
                        </div>
                    </div>

                    {/* </div> */}
                </Modal.Body>
            </Modal>
        </div>
    )

}

export default ShipperInfoModal