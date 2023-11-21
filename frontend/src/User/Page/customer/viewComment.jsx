import React, { useState, useEffect } from "react";
import CartModal from "../../Components/Modal/cart";
import { useLocation } from "react-router-dom";
import { getAllCategoryByStoreId } from "../../services/userServices";
import { useTranslation } from "react-i18next";
import MenuGroup from "../../Components/Item/menuGroup";
import { Link, Element } from "react-scroll";
import Skeleton from "../../Components/Skeleton/skeleton";
import Comment from "../../Components/Modal/comment";
const ViewComment = () => {
    const { t } = useTranslation()
    const [showModal, setShowModal] = useState(false);
    const [categories, setCategories] = useState([]);
    const location = useLocation()
    const [isLoading, setIsLoading] = useState(false)
    const store = location.state.store.store;
    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true)
                const data = await getAllCategoryByStoreId(store._id)
                setCategories(data.data)

            } catch (error) {
                console.error("Lỗi khi lấy thông tin quán ăn:", error);
            }
            setIsLoading(false)
        }
        fetchData();
    }, []);

    const [activeCategory, setActiveCategory] = useState(null);

    const handleCategoryClick = (categoryId) => {
        setActiveCategory(categoryId);
    };

    return (
        <div>
            <div class="wrapper">
                <div class="now-detail-restaurant clearfix" style={{width:'80%', marginLeft:'10%', height:'310px'}}>
                    <div class="container">
                        <div class="detail-restaurant-img">
                            <img
                                // src="https://images.foody.vn/res/g119/1184583/prof/s640x400/foody-upload-api-foody-mobile-37-80aba800-230914093440.jpeg"
                                src={store.image}
                                alt={store.name}
                                class=""
                                style={{height:'250px', width:'100%', marginLeft:'8%'}}
                            />
                        </div>
                        <div class="detail-restaurant-info">

                            <div class="kind-restaurant"><span> {t("store")}</span></div>
                            <h1 class="name-restaurant">
                                {store.name}
                            </h1>
                            <div class="address-restaurant">
                                {store.address}
                            </div>
                            <div class="rating">
                                <div class="stars">
                                    <span class=""><i class="fas fa-solid fa-star"></i></span>
                                </div>
                                <span class="number-rating">{store.ratingAverage}</span>{t("ratingInFALTH")}
                            </div>
                            <div class="view-more-rating">
                                <span
                                    // href="https://foody.vn/da-nang/sau-nuong-lau-nuong-tran-dai-nghia"
                                    rel="noopener noreferrer nofollow"
                                    target="_blank"
                                    class="number-review"
                                >{store.description}</span>
                            </div>
                            <div class="status-restaurant">
                                <div class="opentime-status">
                                    <span class="stt online" title={t("storeActive")}></span>
                                </div>
                                <div class="time"><i class="far fa-clock"></i>{store.openAt} - {store.closeAt}</div>
                            </div>

                            <div class="share-social clearfix">
                                <div class="share-social-box">
                                    <div
                                        class="fb-like"
                                        data-layout="button"
                                        data-action="like"
                                        data-size="small"
                                        data-show-faces="false"
                                        data-share="true"
                                        data-colorscheme="light"
                                        data-kid-directed-site="false"
                                    ></div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div class="container relative clearfix">
                    <div class="now-menu-restaurant" style={{width:'100%'}}>
                        <div class="menu-restaurant-tab">
                            <div class="item active" style={{fontSize:'20px'}}>Đánh giá cửa hàng</div>
                        </div>
                        <div class="menu-restaurant-content-tab">
                            <div class="menu-restaurant-container">
                                {/* <div class="menu-restaurant-category">
                                    <div class="list-category" id="scroll-spy">
                                        <div class="scrollbar-container ps">
                                        </div>
                                    </div>
                                </div> */}
                                <div class="menu-restaurant-detail"  style={{width:'100%'}}>

                                   <Comment/>

                                </div>

                            </div>
                        </div>

                    </div>

                </div>

            </div>
            {
                showModal && (
                    <CartModal show={showModal} handleClose={closeModal} handleOpen={openModal} />
                )
            }
        </div >
    )
}

export default ViewComment