import React, { useRef, useEffect, useState } from 'react';
// import './customer.css'
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { getAllOderByUserId, viewOrder, createPayment } from '../../services/userServices';
import RatingShipper from '../../Components/Modal/ratingShipper';
import RatingStore from '../../Components/Modal/ratingStore';
import OrderDetail from '../../Components/Modal/orderDetail';
import OrderHisItem from '../../Components/Item/orderHisItem';
import Skeleton from '../../Components/Skeleton/skeleton'
import LoadingModal from '../../Components/Loading/Loading';
const OrderHistory = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const fromDateRef = useRef(null);
    const toDateRef = useRef(null);
    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingModal, setIsLoadingModal] = useState(false)

    useEffect(() => {
        flatpickr(fromDateRef.current, {
            dateFormat: 'Y-m-d', // Định dạng ngày tháng
        });

        flatpickr(toDateRef.current, {
            dateFormat: 'Y-m-d', // Định dạng ngày tháng
        });
        const transaction = async () => {
            const queryString = window.location.search;
            if (queryString) {
                console.log('Trang có query parameters:', queryString);
                try {
                    const response = await createPayment(queryString);
                } catch (error) {
                    console.log(error)
                }
            } else {
                console.log('Trang không có query parameters');
            }
        }
        const getOrder = async () => {
            try {
                setIsLoading(true)
                const response1 = await getAllOderByUserId()
                console.log(response1.data)
                setItems(response1.data)
            } catch (error) {

            }
            setIsLoading(false)
        }
        transaction()
        getOrder()
    }, []);

    const [showModal, setShowModal] = useState(false);
    const [showModal1, setShowModal1] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [orderId, setOrderId] = useState('')
    const [storeName, setStoreName] = useState('')
    const [orderDetail, setOrderDetail] = useState({
        shipCost: '',
        cart: []
    })
    const [item, setItem] = useState(null)
    const [store, setStore] = useState({
        name: '',
        ratingAverage: 2
    })

    const handleShowModal = async (id, storeName) => {
        console.log(storeName)
        // setOrderId(id)
        try {
            setIsLoadingModal(true)
            const response = await viewOrder(id);
            console.log('Lấy thông tin thành công: ', response.data)
            setOrderDetail({
                ...response.data
            })
        } catch (error) {
            console.log(error)
        }
        setIsLoadingModal(false)
        setStoreName(storeName)
        setShowModal(true);
    };
    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleShowModal1 = (item) => {
        setItem({ ...item })
        setShowModal1(true);
        console.log("Mở modal")
    };
    const handleCloseModal1 = () => {
        setShowModal1(false);
    };
    const handleShowModal2 = (storInfo) => {
        setStore({ ...storInfo })
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

    const [page, setPage] = useState(1);

    const handlePageClick = (action) => {
        if (action === 'prev' && page > 1) {
            setPage(page - 1);
        } else if (action === 'next' && page < 5) {
            setPage(page + 1);
        }
    };

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
                                <div class="history-table-row" style={{ height: '50px', width: '1160px', marginBottom: '5px' }} key={index}>
                                    <Skeleton />
                                </div>
                            ))}
                            {items.map((item, index) => (
                                <OrderHisItem item={item} index={index + 1} handleShowDetail={handleShowModal} handleShowRating={handleShowModal1} />
                            ))}

                        </div>
                        <ul class="pagination">
                            <li class="" onClick={() => handlePageClick('prev')}>
                                <button class="no_hover"><i class="fa-solid fa-circle-chevron-left" style={{ color: 'red', fontSize: '18px', verticalAlign: 'middle' }}></i></button>
                            </li>
                            <li className={`${page === 1 ? 'active' : ''}`}
                                onClick={() => setPage(1)}><button class="" >1</button></li>
                            <li className={`${page === 2 ? 'active' : ''}`}
                                onClick={() => setPage(2)}><button class="" >2</button></li>
                            <li className={`${page === 3 ? 'active' : ''}`}
                                onClick={() => setPage(3)}><button class="" >3</button></li>
                            <li className={`${page === 4 ? 'active' : ''}`}
                                onClick={() => setPage(4)}><button class="" >4</button></li>
                            <li className={`${page === 5 ? 'active' : ''}`}
                                onClick={() => setPage(5)}><button class="" >5</button></li>
                            <li class="" onClick={() => handlePageClick('next')}>
                                <button class="no_hover"><i class="fa-solid fa-circle-chevron-right" style={{ color: 'red', fontSize: '18px', verticalAlign: 'middle' }}></i></button>
                            </li>
                        </ul>
                        <div class="filter-table-item" style={{ float: "right", marginTop: '30px' }}>
                            <button type="button" class="btn btn-sm" onClick={handleBack}>{t("back")}</button>
                        </div>
                    </div>
                </div>
            </div>

            <OrderDetail show={showModal} handleClose={handleCloseModal} orderDetail={orderDetail} storeName={storeName} />
            <RatingShipper show={showModal1} handleClose={handleCloseModal1} handleShowRatingStore={handleShowModal2} item={item} />
            <RatingStore show={showModal2} handleClose={handleCloseModal2} handleReturn={handleReturnModal1} store={store} />
            {isLoadingModal && (<LoadingModal />)}
        </div>
    )
}

export default OrderHistory