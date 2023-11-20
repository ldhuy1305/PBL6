import React from "react";
import Modal from 'react-bootstrap/Modal';

const OrderDetail = ( {show, handleClose}) => {
    return (
        <div>
            <Modal className="modal fade bd-example-modal-lg " show={show} handleClose={handleClose} size="lg">

                <Modal.Body>
                    <div class="modal-dialog modal-lg modal-dialog-centered">
                        <div class="modal-content">
                            <div
                                class="modal-header modal-header-transparent justify-content-center"
                            >
                                <h5 class="modal-title">Chi tiết đơn hàng</h5>
                            </div>
                            <div class="modal-body">
                                <div class="row no-gutters">
                                    <div class="col">
                                        Đơn của bạn tại&nbsp;<strong>Coco Chè - Hồ Xuân Hương</strong>
                                    </div>
                                    <div class="col-auto">
                                        <div
                                            class="font-weight-bold mb-0 text-danger history-customer-total"
                                        >
                                            Tổng cộng: 171,550đ
                                        </div>
                                    </div>
                                </div>
                                <div class="history-table history-customer-order">
                                    <div class="history-table-row history-table-heading">
                                        <div class="history-table-cell history-table-col1">
                                            Thành viên
                                        </div>
                                        <div class="history-table-cell history-table-col2">món</div>
                                        <div class="history-table-cell history-table-col3">Số lượng</div>
                                        <div class="history-table-cell history-table-col4">Giá</div>
                                        <div class="history-table-cell history-table-col5">phí</div>
                                        {/* <div class="history-table-cell history-table-col6">Giảm giá</div> */}
                                        <div class="history-table-cell history-table-col7">Tổng cộng</div>
                                        <div class="history-table-cell history-table-col8"></div>
                                    </div>
                                    <div class="history-table-scroll">
                                        <div class="history-table-row">
                                            <div class="history-table-cell history-table-col1">
                                                <div class="customer-order row no-gutters align-items-center">
                                                    <div class="customer-order-avatar col-auto">
                                                        <img
                                                            src="http://media-test.foody.vn/default/s160/shopeefood-user-default-female.png"
                                                            alt=""
                                                            class="w-100 d-block"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="history-table-cell history-table-col2">
                                                <div class="mb-1 history-order">
                                                    <span class="circle-status sm"></span>
                                                    <span class="txt-bold">2 Chè khoai dẻo Co co</span>
                                                    <span class="history-table-note"></span>
                                                </div>
                                                <div class="mb-1 history-order">
                                                    <span class="circle-status sm"></span>
                                                    <span class="txt-bold">1 Chè khoai dẻo đậu</span><span class="history-table-note"></span>
                                                </div>
                                                <div class="mb-1 history-order">
                                                    <span class="circle-status sm"></span>
                                                    <span class="txt-bold">2 Chè khoai dẻo trân châu</span><span class="history-table-note"></span>
                                                </div>
                                            </div>
                                            <div class="history-table-cell history-table-col3">5 Items</div>
                                            <div class="history-table-cell history-table-col4">
                                                145,000<span
                                                    style={{
                                                        fontWeight: '400',
                                                        position: 'relative',
                                                        top: '-9px',
                                                        fontSize: '10px',
                                                        right: '0',
                                                    }}>đ</span>
                                            </div>
                                            <div class="history-table-cell history-table-col5">
                                                46,550<span
                                                    style={{
                                                        fontWeight: '400',
                                                        position: 'relative',
                                                        top: '-9px',
                                                        fontSize: '10px',
                                                        right: '0',
                                                    }}
                                                >đ</span>
                                            </div>
                                            {/* <div class="history-table-cell history-table-col6">
                                -<span
                                >20,000<span
                                    style={{
                                        fontWeight: '400',
                                        position: 'relative',
                                        top: '-9px',
                                        fontSize: '10px',
                                        right: '0',
                                    }}>đ</span></span>
                            </div> */}
                                            <div class="history-table-cell history-table-col7">
                                                <strong class="text-danger">171,550đ</strong>
                                            </div>
                                            <div class="history-table-cell history-table-col8">
                                                <div class="custom-checkbox">
                                                    <input type="checkbox" id="district-1" /><label
                                                        for="district-1"
                                                    ></label>
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
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )

}

export default OrderDetail