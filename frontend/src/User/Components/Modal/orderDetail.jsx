import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from "react-i18next";
import RatingProduct from "./ratingProduct";
const OrderDetail = ({ show, handleClose, orderDetail, storeName }) => {
    const { t } = useTranslation()
    const [showModal, setShowModal] = useState(false)
    const [product, setProduct] = useState({
        name: '',
        ratingAverage: 2
    })
    const handleShowModal = (product) => {
        console.log(product)
        setProduct({ ...product })
        setShowModal(true);
        console.log("Mở modal")
    };
    const handleCloseModal = () => {
        setShowModal(false);
    };
    return (
        <div>
            <Modal className="modal fade bd-example-modal-lg " show={show} handleClose={handleClose} size="lg">
                <Modal.Title style={{ textAlign: 'center', margin: '10px 0 0 0' }}>Chi tiết đơn hàng</Modal.Title>
                <Modal.Body>
                    <div class="modal-dialog modal-lg modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-body">
                                <div class="row no-gutters">
                                    <div class="col">
                                        Đơn của bạn tại&nbsp;<strong>{storeName}</strong>
                                    </div>
                                </div>
                                <div class="history-table history-customer-order">
                                    <div class="history-table-row history-table-heading">
                                        <div class="history-table-cell history-table-col2">món</div>
                                        <div class="history-table-cell history-table-col3">Yêu cầu đặc biệt</div>
                                        <div class="history-table-cell history-table-col4">Số lượng</div>
                                        <div class="history-table-cell history-table-col5">Giá</div>
                                        <div class="history-table-cell history-table-col7">Tổng cộng</div>
                                        <div class="history-table-cell history-table-col7">Đánh giá</div>
                                    </div>
                                    <div class="history-table-scroll">
                                        {orderDetail.cart.map((dish) => (
                                            <div class="history-table-row">
                                                <div class="history-table-cell history-table-col2">
                                                    <div class="mb-1 history-order">
                                                        <span class="txt-bold">{dish.product.name}</span>
                                                        <span class="history-table-note"></span>
                                                    </div>
                                                </div>
                                                <div class="history-table-cell history-table-col3">
                                                    <div class="mb-1 history-order">
                                                        <span class="txt-bold">{dish.notes}</span>
                                                        <span class="history-table-note"></span>
                                                    </div>
                                                </div>
                                                <div class="history-table-cell history-table-col4">
                                                    {dish.quantity}
                                                </div>
                                                <div class="history-table-cell history-table-col5">
                                                    {(dish.price).toLocaleString('vi-VN')}đ
                                                </div>

                                                <div class="history-table-cell history-table-col7">
                                                    {/* <strong class="text-danger">{}</strong> */}
                                                    {(dish.quantity * dish.price).toLocaleString('vi-VN')}đ
                                                </div>
                                                <div class="history-table-cell history-table-col7">
                                                    <button
                                                        class="font-weight-bold history-table-status gray pointer"
                                                        style={{ backgroundColor: '#0288d1', color: 'white' }}
                                                        onClick={() => handleShowModal(dish)}

                                                    >
                                                        {t('rating')}
                                                    </button>
                                                </div>

                                            </div>
                                        ))}
                                    </div>
                                    <div class="KQyCj0" aria-live="polite">
                                        <h3 class="Tc17Ac XIEGGF BcITa9">Tổng tiền hàng</h3>
                                        <div class="Tc17Ac mCEcIy BcITa9">{(orderDetail.totalPrice - orderDetail.shipCost).toLocaleString('vi-VN')}₫</div>
                                        <h3 class="Tc17Ac XIEGGF RY9Grr">Phí vận chuyển</h3>
                                        <div class="Tc17Ac mCEcIy RY9Grr">{(orderDetail.shipCost).toLocaleString('vi-VN')}₫</div>
                                        <h3 class="Tc17Ac XIEGGF n3vdfL">Tổng thanh toán:</h3>
                                        <div class="Tc17Ac kC0GSn mCEcIy n3vdfL">{orderDetail && orderDetail.totalPrice ? orderDetail.totalPrice.toLocaleString('vi-VN') : 'N/A'}₫</div>
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
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            <RatingProduct show={showModal} handleClose={handleCloseModal} product={product}/>
        </div>
    )

}

export default OrderDetail