import React from "react";

const DishInMenuGroup = ({ dish, handleOpen, handleAddToCart }) => {

    const handleAdd = () => {
        // console.log(dish)
        handleAddToCart(dish);
        handleOpen();
    }

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
                    <div class="col-auto item-restaurant-img">
                        <button class="inline">
                            <img
                                src={dish.images[0]}
                                alt={dish.name}
                                width="60"
                                height="60"
                            />
                        </button>
                    </div>
                    <div class="col item-restaurant-info">
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
                                    {dish.price}<span
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
                                <div class="btn-adding" onClick={handleAdd}>+</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default DishInMenuGroup