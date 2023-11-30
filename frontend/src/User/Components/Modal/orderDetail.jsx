import React from "react";
import Modal from 'react-bootstrap/Modal';
const OrderDetail = ( {show, handleClose, orderDetail, storeName}) => {
    return (
        <div>
            <Modal className="modal fade bd-example-modal-lg " show={show} handleClose={handleClose} size="lg">
            <Modal.Title style={{textAlign:'center', margin: '10px 0 0 0'}}>Chi tiết đơn hàng</Modal.Title>
                <Modal.Body>
                    <div class="modal-dialog modal-lg modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-body">
                                <div class="row no-gutters">
                                    <div class="col">
                                        Đơn của bạn tại&nbsp;<strong>{storeName}</strong>
                                    </div>
                                    <div class="col-auto">
                                        <div
                                            class="font-weight-bold mb-0 text-danger history-customer-total"
                                        >
                                            Tổng cộng: {orderDetail && orderDetail.totalPrice ? orderDetail.totalPrice.toLocaleString('vi-VN') + 'đ' : 'N/A'}
                                        </div>
                                    </div>
                                </div>
                                <div class="history-table history-customer-order">
                                    <div class="history-table-row history-table-heading">
                                        <div class="history-table-cell history-table-col2">món</div>
                                        <div class="history-table-cell history-table-col3">Yêu cầu đặc biệt</div>
                                        <div class="history-table-cell history-table-col4">Giá</div>
                                        <div class="history-table-cell history-table-col5">Phí giao hàng</div>
                                        <div class="history-table-cell history-table-col7">Tổng cộng</div>
                                    </div>
                                    <div class="history-table-scroll">
                                        <div class="history-table-row">
                                            <div class="history-table-cell history-table-col2">
                                                {orderDetail.cart.map((dish) => (
                                                    <div class="mb-1 history-order">
                                                        <span class="txt-bold">{dish.quantity} {dish.product.name}</span>
                                                        <span class="history-table-note"></span>
                                                    </div>
                                                ))}
                                            </div>
                                            <div class="history-table-cell history-table-col3">
                                            {orderDetail.cart.map((dish) => (
                                                    <div class="mb-1 history-order">
                                                        <span class="txt-bold">{dish.notes}</span>
                                                        <span class="history-table-note"></span>
                                                    </div>
                                                ))}
                                            </div>
                                            <div class="history-table-cell history-table-col4">
                                                {(orderDetail.totalPrice - orderDetail.shipCost).toLocaleString('vi-VN')}<span
                                                    style={{
                                                        fontWeight: '400',
                                                        position: 'relative',
                                                        top: '-9px',
                                                        fontSize: '10px',
                                                        right: '0',
                                                    }}>đ</span>
                                            </div>
                                            <div class="history-table-cell history-table-col5">
                                            {(orderDetail.shipCost).toLocaleString('vi-VN')}<span
                                                    style={{
                                                        fontWeight: '400',
                                                        position: 'relative',
                                                        top: '-9px',
                                                        fontSize: '10px',
                                                        right: '0',
                                                    }}
                                                >đ</span>
                                            </div>

                                            <div class="history-table-cell history-table-col7">
                                                <strong class="text-danger">{orderDetail && orderDetail.totalPrice ? orderDetail.totalPrice.toLocaleString('vi-VN') + 'đ' : 'N/A'}</strong>
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
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )

}

export default OrderDetail