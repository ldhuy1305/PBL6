import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
const StoreItem = ({ like, store }) => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const handleStore = () => {
        navigate("/home/storeDetail", { state: { store: { store } } });
    };
    return (
        <div class="item-restaurant" onClick={handleStore}>
            <a
                target="_blank"
                class="item-content"
            // href={link}
            ><div class="img-restaurant">
                    {like === "no" ? null : (
                        <div className="tag-preferred">
                            <i className="fa fa-thumbs-up" aria-hidden="true"></i>{t("storeLike")}
                        </div>
                    )}
                    <img
                        src={store.image}
                    />
                </div>
                <div class="info-restaurant">
                    <div class="info-basic-res">
                        <h4
                            class="name-res"
                            title={store.name}
                        >
                            <span
                                class="icon icon-quality-merchant"
                                title="Đây là 1 trong những Merchants được đánh giá cao trong ShopeeFood"></span>{store.name}
                        </h4>
                        <div
                            class="address-res"
                            title={store.address}
                        >
                            {store.address}
                        </div>
                    </div>
                    <p class="content-promotion">
                        <i class="fas fa-solid fa-star"></i> {store.ratingAverage}
                        <p class="opening-hours"><i class="fas fa-solid fa-clock" style={{ color: 'rgb(35, 152, 57)' }}></i>{t("storeActive")} {store.openAt}-{store.closeAt}</p>
                    </p>
                    <div class="opentime-status">
                        <span
                            class="stt online"
                            title="Mở cửa"
                            style={{
                                color: 'rgb(35, 152, 57',
                                backgroundColor: 'rgb(35, 152, 57)'
                            }}
                        ></span>
                    </div></div></a>
        </div>
    )
}

export default StoreItem