import React, {
    useState
} from 'react'
import Modal from 'react-bootstrap/Modal';
import style from './DetailShipper.module.css';
import Button from 'react-bootstrap/Button';


function DetailShipper({ rows, show, handleClose }) {
    return (
        <Modal show={show} onHide={handleClose} animation={true}>
            <Modal.Header closeButton>
                <Modal.Title>Chi tiết shipper</Modal.Title>
            </Modal.Header>
            <div className={style.Store}>
                <div >
                    <div className={style.bill}>
                        <div >
                            <img className={style.img_bill} src={rows.photo} alt="" />
                        </div>
                    </div>
                    <div className={style.bill_time} >
                        <div className={style.bill_stt}>
                            <span className={style.col1}>Họ tên : </span>
                            <span className={style.col}> {rows.firstName} {rows.lastName}</span>
                        </div>
                    </div>
                    <div className={style.bill_time} >
                        <div className={style.bill_stt}>
                            <span className={style.col1}>Email : </span>
                            <span className={style.col}> {rows.email}</span>
                        </div>
                    </div>
                    <div className={style.bill_time} >
                        <div className={style.bill_stt}>
                            <span className={style.col1}>ID giấy phép : </span>
                            <span className={style.col}>{rows.licenseId}</span>
                        </div>
                    </div>
                    <div className={style.bill_time} >
                        <div className={style.bill_stt}>
                            <span className={style.col1}>Biến số : </span>
                            <span className={style.col}>{rows.vehicleNumber}</span>
                        </div>
                    </div>
                    <div className={style.bill_time} >
                        <div className={style.bill_stt}>
                            <span className={style.col1}>Loại xe: </span>
                            <span className={style.col}>{rows.vehicleType}</span>
                        </div>
                    </div>
                    <div className={style.bill_time} >
                        <div className={style.bill_stt}>
                            <span className={style.col1}>Giấy phép xe cộ: </span>
                            <span className={style.col}>{rows.vehicleLicense}</span>
                        </div>
                    </div>
                    <div className={style.feedback}>
                        <div className={style.bill_time} >
                            <div className={style.bill_stt}>
                                <span><i className="fa-solid fa-star" style={{ color: 'gold' }}></i> </span>
                                <span >{rows.ratingAverage}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <Modal.Footer style={{ justifyContent: "end" }} >
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>

            </Modal.Footer>
        </Modal >
    )
}

export default DetailShipper



