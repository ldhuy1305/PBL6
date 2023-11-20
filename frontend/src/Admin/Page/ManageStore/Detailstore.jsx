import React, {
    useState
} from 'react'
import Modal from 'react-bootstrap/Modal';
import style from './Detailstore.module.css';
import Button from 'react-bootstrap/Button';

function Detailstore({ rows, show, handleClose }) {
    return (
        <>

            <Modal fullscreen={true} show={show} onHide={handleClose} animation={true} >
                <div className={style.container}>
                    <div >
                        <div className={style.Store}>
                            <div className={style.Name_store}>
                                <div >
                                    <span>{rows.name}</span>
                                </div>
                            </div>
                            <div className={style.addres_store}>
                                <div >
                                    <span>SĐT: {rows.phoneNumber}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={style.Store}>
                        <div >
                            <div className={style.bill}>
                                <div >
                                    <img className={style.img_bill} src={rows.image} alt="" />
                                </div>
                            </div>
                            <div className={style.bill_time} >
                                <div className={style.bill_stt}>
                                    <span className={style.col1}>Địa chỉ : </span>
                                    <span className={style.col}> {rows.address}</span>
                                </div>
                            </div>
                            <div className={style.bill_time} >
                                <div className={style.bill_stt}>
                                    <span className={style.col1}>Mô tả : </span>
                                    <span className={style.col}> {rows.description}</span>
                                </div>
                            </div>
                            <div className={style.bill_time} >
                                <div className={style.bill_stt}>
                                    <span className={style.col1}>Giờ mỡ cửa : </span>
                                    <span className={style.col}>{rows.openAt}</span>
                                </div>
                            </div>
                            <div className={style.bill_time} >
                                <div className={style.bill_stt}>
                                    <span className={style.col1}>Giờ đóng cửa : </span>
                                    <span className={style.col}>{rows.closeAt}</span>
                                </div>
                            </div>


                            <div className={style.feedback}>
                                <div className={style.bill_time} >
                                    <div className={style.bill_stt}>
                                        <span> <i class="fa-regular fa-comment"></i></span>
                                        <span >10</span>
                                    </div>
                                </div>
                                <div className={style.bill_time} >
                                    <div className={style.bill_stt}>
                                        <span><i class="fa-regular fa-thumbs-up"></i> </span>
                                        <span >10</span>
                                    </div>
                                </div>
                                <div className={style.bill_time} >
                                    <div className={style.bill_stt}>
                                        <span><i className="fa-solid fa-star" style={{ color: 'gold' }}></i> </span>
                                        <span >{rows.ratingAverage}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div ></div>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleClose(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>

    )
}

export default Detailstore
