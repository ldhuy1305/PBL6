import React, { useState } from "react";
import moment from 'moment-timezone';
import { useTranslation } from 'react-i18next';
import LoadingModal from "../Loading/Loading";
import { getStoreById } from "../../services/userServices";
import { useNavigate } from "react-router-dom";
const OrderHisItem = ({ item, index, handleShowDetail, handleShowRating }) => {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const formatteOrderTime = moment.utc(item.dateOrdered).format('DD/MM/YYYY HH:mm');
    // const localFormattedDate = moment(item.dateOrdered).local().format('DD/MM/YYYY HH:mm');
    const handleStore = async () => {

        try {
            setIsLoading(true)
            const storeData = await getStoreById(item.store._id);
            const store = storeData.data;
            navigate("/home/storeDetail", { state: { store: { store } } });
            // handleClose();
        } catch (error) {
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <div>
            <div class="history-table-row">
                <div class="history-table-cell history-table-col1">{index}</div>
                <div class="history-table-cell history-table-col3">
                    <div>{t("orderTime")}: {formatteOrderTime}</div>
                    {/* <div>{t("receiveTime")}: {item.dateOrdered}</div> */}
                    {/* <div>{t("receiveTime")}: {localFormattedDate}</div> */}
                </div>
                <div class="history-table-cell history-table-col4">
                    <a
                        onClick={handleStore}
                        target="_blank"
                        rel="noopener noreferrer"
                    ><div class="text-body">
                            <strong class="d-block text-truncate"
                            >{item.store.name}</strong><span class="d-block text-truncate"
                            >{item.store.address}</span>
                        </div></a>
                </div>
                <div className="history-table-cell history-table-col5">
                    {item.shipper ? (
                        <strong className="d-block text-truncate">{item.shipper}</strong>
                    ) : (
                        <span></span>
                    )}
                </div>
                <div class="history-table-cell history-table-col6">
                    <div style={{ fontWeight: 'bold' }}><span>{item.totalPrice.toLocaleString('vi-VN')}đ</span></div>
                    {/* <div style={{ color: 'green', fontWeight: 'bold' }}>
                        Thanh toán trực tuyến
                    </div> */}
                </div>
                <div class="history-table-cell history-table-col7">
                    <div class="font-weight-bold history-table-status" style={{
                        color:
                            item.status === 'Finished'
                                ? '#6cc942' // Màu xanh cho trạng thái complete
                                : item.status === 'Pending'
                                    ? 'orange' // Màu vàng cho trạng thái pending
                                    : item.status === 'Refused'
                                        ? 'red' // Màu đỏ cho trạng thái reject
                                        : 'black' // Màu mặc định nếu không phù hợp với các trạng thái trên
                    }}>
                        {item.status}
                    </div>
                </div>
                <div class="history-table-cell history-table-col8">
                    <button className="d-block mb-1" onClick={() => handleShowDetail(item._id, item.store.name)} style={{ color: '#0288d1', fontWeight: '600' }}>
                        {t("orderDetail")}
                    </button>
                </div>
                <div class="history-table-cell history-table-col8">
                    <button
                        class="font-weight-bold history-table-status gray pointer"
                        style={{ backgroundColor: '#e81f1b', color: 'white' }}
                    >
                        {t('cancel')}
                    </button>
                    <button
                        class="font-weight-bold history-table-status gray pointer"
                        style={{ backgroundColor: '#0288d1', color: 'white' }}
                        onClick={() => handleShowRating(item)}
                    >
                        {t('rating')}
                    </button>
                </div>
            </div>
            {isLoading && (<LoadingModal/>)}
        </div>
    )
}

export default OrderHisItem