import React, { useRef, useEffect, useState } from 'react';
// import './customer.css'
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { getAllOderByUserId, viewOrder } from '../../services/userServices';
import RatingShipper from '../../Components/Modal/ratingShipper';
import RatingStore from '../../Components/Modal/ratingStore';
import OrderDetail from '../../Components/Modal/orderDetail';
import OrderHisItem from '../../Components/Item/orderHisItem';
import Skeleton from '../../Components/Skeleton/skeleton'
const OrderHistory = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const fromDateRef = useRef(null);
    const toDateRef = useRef(null);
    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        flatpickr(fromDateRef.current, {
            dateFormat: 'Y-m-d', // Định dạng ngày tháng
        });

        flatpickr(toDateRef.current, {
            dateFormat: 'Y-m-d', // Định dạng ngày tháng
        });
        const getOrder = async () => {
            try {
                setIsLoading(true)
                const response1 = await getAllOderByUserId()
                console.log(response1.data)
                setItems(response1.data)
                // const response2 = await viewOrder("65546ead65254f0008541b84")
            } catch (error) {

            }
            setIsLoading(false)
        }
        getOrder()
    }, []);

    const [showModal, setShowModal] = useState(false);
    const [showModal1, setShowModal1] = useState(false);
    const [showModal2, setShowModal2] = useState(false);

    const handleShowModal = () => {
        setShowModal(true);
    };
    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleShowModal1 = () => {
        setShowModal1(true);
        console.log("Mở modal")
    };
    const handleCloseModal1 = () => {
        setShowModal1(false);
    };
    const handleShowModal2 = () => {
        setShowModal1(false); // Tắt modal 1
        setShowModal2(true); // Hiển thị modal 2
    };

    const handleCloseModal2 = () => {
        setShowModal2(false); // Tắt modal 2
        setShowModal1(false); // Tắt modal 1
    };
    const handleReturnModal1 = () => {
        setShowModal2(false); // Tắt modal 2
        setShowModal1(true); // Tắt modal 1
    };


    const handleBack = () => {
        navigate("/user/profile")
    }

    return (
        <div>
            <div class="block-section">
                <div class="container">
                    <h1 class="block-title mb-4 text-center">{t("orderHis")}</h1>
                    <div class="history-switch">
                        <div class="item now active">FALTH</div>
                    </div>
                    <div class="history-table-container">
                        <div class="filter-table">
                            <div class="filter-table-item">
                                <div class="text-nowrap">
                                    <span class="filter-table-label">{t("status")}</span><select name="" class="form-control filter-table-input">
                                        <option value="-1" selected="">{t("all")}</option>
                                        <option value="4">{t("complete")}</option>
                                        <option value="8">{t("cancel")}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="filter-table-item">
                                <div class="text-nowrap">
                                    <span class="filter-table-label">{t("from")}</span>
                                    <input ref={fromDateRef} class="input--style-2 js-datepicker" type="text" style={{ width: '255px' }} />
                                </div>
                            </div>

                            <div class="filter-table-item">
                                <div class="text-nowrap">
                                    <span class="filter-table-label">{t("to")}</span>
                                    <input
                                        ref={toDateRef}
                                        class="flatpickr-input input--style-2 js-datepicker"
                                        type="text"
                                        style={{ width: '255px' }}
                                    />
                                </div>
                            </div>
                            <div class="filter-table-item">
                                <button type="button" class="btn btn-sm">{t("search")}</button>
                            </div>
                        </div>
                        <div class="history-table">
                            <div class="history-table-row history-table-heading">
                                <div class="history-table-cell history-table-col1">STT</div>
                                <div class="history-table-cell history-table-col3">
                                    {t("time")}
                                </div>
                                <div class="history-table-cell history-table-col4">
                                    {t("place")}
                                </div>
                                <div class="history-table-cell history-table-col5">
                                    {t("staff")}
                                </div>
                                <div class="history-table-cell history-table-col6">
                                    {t("total")}
                                </div>
                                <div class="history-table-cell history-table-col7">
                                    {t("status")}
                                </div>
                                <div class="history-table-cell history-table-col8">
                                    {t("detail")}
                                </div>
                                <div class="history-table-cell history-table-col8">
                                    {t("action")}
                                </div>
                            </div>
                            {isLoading && Array(4).fill(0).map((index) => (
                                <div class="history-table-row" style={{ height: '50px', width: '1160px', marginBottom:'5px'}} key={index}>
                                <Skeleton />
                            </div>
                            ))}                           
                            {items.map((item, index) => (
                                <OrderHisItem item={item} index={index + 1} handleShowDetail={handleShowModal} handleShowRating={handleShowModal1} />
                            ))}

                        </div>
                        <div class="filter-table-item" style={{ float: "right", marginTop: '30px' }}>
                            <button type="button" class="btn btn-sm" onClick={handleBack}>{t("back")}</button>
                        </div>
                    </div>
                </div>
            </div>

            <OrderDetail show={showModal} handleClose={handleCloseModal} />
            <RatingShipper show={showModal1} handleClose={handleCloseModal1} handleShowRatingStore={handleShowModal2} />
            <RatingStore show={showModal2} handleClose={handleCloseModal2} />

        </div>
    )
}

export default OrderHistory