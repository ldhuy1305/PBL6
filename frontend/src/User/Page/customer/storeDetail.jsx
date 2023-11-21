import React, { useState, useEffect } from "react";
import CartModal from "../../Components/Modal/cart";
import { useLocation } from "react-router-dom";
import { getAllCategoryByStoreId } from "../../services/userServices";
import { useTranslation } from "react-i18next";
import MenuGroup from "../../Components/Item/menuGroup";
import { Link, Element } from "react-scroll";
import Skeleton from "../../Components/Skeleton/skeleton";
import { useNavigate } from "react-router-dom";
const StoreDetail = () => {
    const navigate = useNavigate()
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

    const [activeCategory, setActiveCategory] = useState('');

    const handleCategoryClick = (categoryId) => {
        setActiveCategory(categoryId);
    };

    const handleComment = () => {
            navigate("/home/storeComment", { state: { store: { store } } });
    }

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
                            <div class="rating" style={{cursor:'pointer'}} onClick={handleComment}>
                                <span class="number-rating">{store.ratingsAverage}</span>
                                <div class="stars">
                                    <span class=""><i class="fas fa-solid fa-star"></i></span>
                                </div>
                                <span style={{color:'#ee4d2d'}}>{t("ratingInFALTH")}</span>
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
                    <div class="now-menu-restaurant">
                        <div class="menu-restaurant-tab">
                            <div class="item active">{t("menu")}</div>
                        </div>
                        <div class="menu-restaurant-content-tab">
                            <div class="menu-restaurant-container">
                                <div class="menu-restaurant-category">
                                    <div class="list-category" id="scroll-spy">
                                        <div class="scrollbar-container ps">
                                            {isLoading && Array(3).fill(0).map((item, index) => (
                                                <div className="item" key={index} style={{ height: '30px', width: '100px' }}>
                                                    <Skeleton />
                                                </div>
                                            ))}
                                            {categories.map((category) => (
                                                <Link to={category.catName} spy={true} smooth={true} duration={500} offset={-150}>

                                                    <div className="item" key={category._id}>
                                                        <span
                                                            id={`category-link-${category._id}`}
                                                            title={category.catName}
                                                            className={`item-link ${category._id === activeCategory ? 'active' : ''
                                                                }`}
                                                            onClick={() => handleCategoryClick(category._id)}
                                                        >
                                                            {category.catName}
                                                        </span>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div class="menu-restaurant-detail">

                                    <div class="menu-restaurant-list">
                                        <div class="search-items">
                                            <p class="input-group">
                                                <i class="fas fa-search"></i><input
                                                    type="search"
                                                    name="searchKey"
                                                    placeholder={t("searchDish")}
                                                    value=""
                                                />
                                            </p>
                                        </div>
                                        <div id="restaurant-item">
                                            <div
                                                aria-label="grid"
                                                aria-readonly="true"
                                                class="ReactVirtualized__Grid ReactVirtualized__List"
                                                role="grid"
                                                tabindex="0"
                                                style={{
                                                    boxSizing: 'border-box',
                                                    direction: 'ltr',
                                                    height: 'auto',
                                                    position: 'relative',
                                                    width: '558px',
                                                    willChange: 'transform',
                                                    overflow: 'auto',
                                                    outline: 'none',
                                                }}
                                            >
                                                <div
                                                    class="ReactVirtualized__Grid__innerScrollContainer"
                                                    role="rowgroup"
                                                    style={{
                                                        width: 'auto',
                                                        height: '2719px',
                                                        maxWidth: '558px',
                                                        maxHeight: '2719px',
                                                        overflow: 'hidden',
                                                        position: 'relative',
                                                    }}
                                                >

                                                    {categories.map((category) => (
                                                        <Element name={category.catName} className="element">

                                                            <MenuGroup
                                                                category={category}
                                                                openModal={openModal}
                                                                store={store}
                                                            />
                                                        </Element>
                                                    ))}

                                                </div>
                                            </div>
                                        </div>
                                    </div>

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

export default StoreDetail