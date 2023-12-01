import React, { useState } from "react";
import soldout from '../../assets/img/sold-out.png'
import { Navigate, useNavigate } from "react-router-dom";
import ProductDetailModal from "../Modal/productDetailModal";
const DishInMenuGroup = ({ dish, handleOpen, handleAddToCart }) => {
    const navigate = useNavigate()
    const handleAdd = (quantity) => {
        // console.log(dish)
        handleAddToCart(dish, quantity);
        handleOpen();
    }

    // const handleProductDetail = () => {
    //     navigate('/home/store/productDetail', {state: {dish:dish}})
    // }

    const [showModal, setShowModal] = useState(false)
    const handleShowModal = async (id, storeName) => {       
        setShowModal(true);
    };
    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div>
            <div
                class="item-restaurant-row"
                style={{
                    height: '84px',
                    width: '100%',
                }}
            >
                <div class="row">
                    <div class="col-auto item-restaurant-img" onClick={handleShowModal}>
                        <button class="inline">
                            <img
                                src={dish.images[0]}
                                alt={dish.name}
                                width="60"
                                height="60"
                            />
                        </button>
                    </div>
                    <div class="col item-restaurant-info" onClick={handleShowModal}>
                        <h2 class="item-restaurant-name">
                            {dish.name}
                        </h2>
                        <div class="item-restaurant-desc">Yêu thích</div>
                        <div class="item-restaurant-total">
                            Đã được đặt<span class="txt-bold"
                            >&nbsp;10+&nbsp;</span>lần
                        </div>
                    </div>
                    <div class="col-auto item-restaurant-more">
                        <div class="row">
                            <div class="col-auto product-price">
                                <div class="current-price">
                                    {dish.price.toLocaleString('vi-VN')}<span
                                        style={{
                                            fontWeight: '400',
                                            position: 'relative',
                                            top: '-9px',
                                            fontSize: '10px',
                                            right: '0',
                                        }}
                                    >đ</span>
                                </div>
                            </div>
                            <div
                                class="col-auto adding-food-cart txt-right"
                            >
                            {dish.isOutOfOrder ? (
                                <img 
                                    src={soldout}
                                    alt="Hết hàng"
                                    style={{height:'80%', width:'80px'}}
                                ></img>
                            ) : (
                                <div class="btn-adding" onClick={() => handleAdd(1)}>+</div>
                            )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ProductDetailModal show={showModal} handleClose={handleCloseModal} product={dish} handleAdd={handleAdd}/>
        </div>


    )
}

export default DishInMenuGroup