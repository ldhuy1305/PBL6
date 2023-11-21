import React from "react";
import '../../assets/css/pcmall.css'


const Comment = () => {
    return (
        <div>
            <div style={{ display: 'contents' }}>
                <div class="product-ratings" data-nosnippet="true">
                    <div class="product-ratings__header">
                        {/* <div class="product-ratings__header_score">ĐÁNH GIÁ SẢN PHẨM</div> */}
                    </div>
                    <div class="product-rating-overview">
                        <div class="product-rating-overview__briefing">
                            <div class="product-rating-overview__score-wrapper">
                                <span class="product-rating-overview__rating-score">4.9 </span>
                                <span class="product-rating-overview__rating-score-out-of">
                                    / 5
                                </span>
                            </div>
                            <div class="shopee-rating-stars product-rating-overview__stars">
                                <div class="shopee-rating-stars__stars">
                                    {Array(5).fill(0).map((item, index) => (

                                        <div class="shopee-rating-stars__star-wrapper" key={index}>
                                            <div className="shopee-rating-stars__lit" style={{ width: '100%' }}>
                                                <svg
                                                    enableBackground="new 0 0 15 15"
                                                    viewBox="0 0 15 15"
                                                    x="0"
                                                    y="0"
                                                    className="shopee-svg-icon shopee-rating-stars__primary-star icon-rating-solid"
                                                >
                                                    <polygon
                                                        points="7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeMiterlimit="10"
                                                    ></polygon>
                                                </svg>
                                            </div>
                                            <svg
                                                enable-background="new 0 0 15 15"
                                                viewBox="0 0 15 15"
                                                x="0"
                                                y="0"
                                                class="shopee-svg-icon shopee-rating-stars__hollow-star icon-rating"
                                            >
                                                <polygon
                                                    fill="none"
                                                    points="7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-miterlimit="10"
                                                ></polygon>
                                            </svg>
                                        </div>
                                    ))}

                                </div>
                            </div>
                        </div>
                        <div className="product-rating-overview__filters">
                            <div className="product-rating-overview__filter product-rating-overview__filter--active">
                                Tất cả
                            </div>
                            <div className="product-rating-overview__filter">5 Sao (2,3k)</div>
                            <div className="product-rating-overview__filter">4 Sao (114)</div>
                            <div className="product-rating-overview__filter">3 Sao (40)</div>
                            <div className="product-rating-overview__filter">2 Sao (9)</div>
                            <div className="product-rating-overview__filter">1 Sao (11)</div>
                            <div className="product-rating-overview__filter">Có Bình luận (1,1k)</div>
                            <div className="product-rating-overview__filter">Có hình ảnh (439)</div>
                        </div>
                    </div>
                    <div class="product-ratings__list" style={{ opacity: '1' }}>
                        <div class="shopee-product-comment-list">
                            <div class="shopee-product-rating">
                                <a class="shopee-product-rating__avatar" >
                                    {/* href="/shop/254745985" */}
                                    <div class="shopee-avatar">
                                        <img
                                            class="shopee-avatar__img"
                                            alt="a"
                                            src="https://res.cloudinary.com/drk3oaeza/image/upload/v1700123551/pbl6/koycb60iwvqpwxqfeogu.jpg"
                                        />
                                    </div>
                                </a>
                                <div class="shopee-product-rating__main">
                                    <a
                                        class="shopee-product-rating__author-name"
                                        href="/shop/254745985"
                                    >lanngan91</a>
                                    <div class="repeat-purchase-con">
                                        <div class="shopee-product-rating__rating">
                                            <svg
                                                enable-background="new 0 0 15 15"
                                                viewBox="0 0 15 15"
                                                x="0"
                                                y="0"
                                                class="shopee-svg-icon icon-rating-solid--active icon-rating-solid"
                                            >
                                                <polygon
                                                    points="7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-miterlimit="10"
                                                ></polygon></svg><svg
                                                    enable-background="new 0 0 15 15"
                                                    viewBox="0 0 15 15"
                                                    x="0"
                                                    y="0"
                                                    class="shopee-svg-icon icon-rating-solid--active icon-rating-solid"
                                                >
                                                <polygon
                                                    points="7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-miterlimit="10"
                                                ></polygon></svg><svg
                                                    enable-background="new 0 0 15 15"
                                                    viewBox="0 0 15 15"
                                                    x="0"
                                                    y="0"
                                                    class="shopee-svg-icon icon-rating-solid--active icon-rating-solid"
                                                >
                                                <polygon
                                                    points="7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-miterlimit="10"
                                                ></polygon></svg><svg
                                                    enable-background="new 0 0 15 15"
                                                    viewBox="0 0 15 15"
                                                    x="0"
                                                    y="0"
                                                    class="shopee-svg-icon icon-rating-solid--active icon-rating-solid"
                                                >
                                                <polygon
                                                    points="7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-miterlimit="10"
                                                ></polygon></svg>
                                            <svg
                                                enable-background="new 0 0 15 15"
                                                viewBox="0 0 15 15"
                                                x="0"
                                                y="0"
                                                class="shopee-svg-icon icon-rating-solid--active icon-rating-solid"
                                            >
                                                <polygon
                                                    points="7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-miterlimit="10"
                                                ></polygon>
                                            </svg>
                                        </div>
                                    </div>
                                    <div class="shopee-product-rating__time">
                                        2022-05-05 20:14 | Kích thước: Lớn
                                    </div>
                                    <div
                                        style={{
                                            textAlign:'justify',
                                            width:'90%',
                                            position: 'relative',
                                            boxSizing: 'border-box',
                                            margin: '15px 0px',
                                            fontSize: '14px',
                                            lineHeight: '20px',
                                            color: 'rgba(0, 0, 0, 0.87)',
                                            wordBreak: 'break-word',
                                            whiteSpace: 'pre-wrap',
                                        }}

                                    >
                                        Đồ ăn ngon nhưng giá hơn cao so với những quán khác

                                    </div>
                                    <div class="shopee-product-rating__image-list-wrapper">
                                        <div class="rating-media-list">
                                            <div class="rating-media-list__container">
                                                <div
                                                    class="rating-media-list__image-wrapper rating-media-list__image-wrapper--inactive"
                                                >
                                                    <div class="shopee-rating-media-list-image__wrapper">
                                                        <div
                                                            class="shopee-rating-media-list-image__content"
                                                            style={{ backgroundImage: `url('https://res.cloudinary.com/drk3oaeza/image/upload/v1700104620/pbl6/efcpqocfqyuom9pt6iwi.jpg')`, }}
                                                        >
                                                            <div
                                                                class="shopee-rating-media-list-image__content--blur"
                                                            ></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="rating-media-list__zoomed-image">
                                                <div className="rating-media-list-image-carousel" style={{ transition: 'all 0ms ease 0s' }}>
                                                    <div className="rating-media-list-image-carousel__item-list-wrapper">
                                                        <ul className="rating-media-list-image-carousel__item-list" style={{ marginTop: '0px', transform: 'translateX(0px)', transition: 'all 0ms ease 0s' }}>
                                                            <li className="rating-media-list-image-carousel__item rating-media-list-image-carousel__item--fluid" style={{ padding: '0px 0.625rem' }}>
                                                                <img
                                                                    src="https://res.cloudinary.com/drk3oaeza/image/upload/v1700104620/pbl6/efcpqocfqyuom9pt6iwi.jpg"
                                                                    alt="rating"
                                                                    className="rating-media-list__zoomed-image-item"
                                                                />
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="rating-media-list-carousel-arrow rating-media-list-carousel-arrow--prev rating-media-list-carousel-arrow--hint rating-media-list-carousel-arrow--hidden" role="button" tabIndex="0" style={{ opacity: 1, visibility: 'hidden', transform: 'translateX(calc(-50% + 0px))' }}>
                                                        <svg
                                                            enableBackground="new 0 0 13 20"
                                                            viewBox="0 0 13 20"
                                                            x="0"
                                                            y="0"
                                                            className="shopee-svg-icon icon-arrow-left-bold"
                                                        >
                                                            <polygon points="4.2 10 12.1 2.1 10 -.1 1 8.9 -.1 10 1 11 10 20 12.1 17.9"></polygon>
                                                        </svg>
                                                    </div>
                                                    <div className="rating-media-list-carousel-arrow rating-media-list-carousel-arrow--next rating-media-list-carousel-arrow--hint rating-media-list-carousel-arrow--hidden" role="button" tabIndex="0" style={{ opacity: 1, visibility: 'hidden', transform: 'translateX(calc(50% - 0px))' }}>
                                                        <svg
                                                            enableBackground="new 0 0 13 21"
                                                            viewBox="0 0 13 21"
                                                            x="0"
                                                            y="0"
                                                            className="shopee-svg-icon icon-arrow-right-bold"
                                                        >
                                                            <polygon points="11.1 9.9 2.1 .9 -.1 3.1 7.9 11 -.1 18.9 2.1 21 11.1 12 12.1 11"></polygon>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="shopee-product-rating__actions" style={{ justifyContent: 'space-between' }}>
                                        <div style={{ display: 'flex' }}>
                                            <div className="shopee-product-rating__like-button">
                                                <svg
                                                    width="14px"
                                                    height="13px"
                                                    viewBox="0 0 14 13"
                                                    version="1.1"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M0,12.7272727 L2.54545455,12.7272727 L2.54545455,5.09090909 L0,5.09090909 L0,12.7272727 Z M14,5.72727273 C14,5.02727273 13.4272727,4.45454545 12.7272727,4.45454545 L8.71818182,4.45454545 L9.35454545,1.52727273 L9.35454545,1.33636364 C9.35454545,1.08181818 9.22727273,0.827272727 9.1,0.636363636 L8.4,0 L4.2,4.2 C3.94545455,4.39090909 3.81818182,4.70909091 3.81818182,5.09090909 L3.81818182,11.4545455 C3.81818182,12.1545455 4.39090909,12.7272727 5.09090909,12.7272727 L10.8181818,12.7272727 C11.3272727,12.7272727 11.7727273,12.4090909 11.9636364,11.9636364 L13.8727273,7.44545455 C13.9363636,7.31818182 13.9363636,7.12727273 13.9363636,7 L13.9363636,5.72727273 L14,5.72727273 C14,5.79090909 14,5.72727273 14,5.72727273 Z"
                                                    ></path>
                                                </svg>
                                            </div>
                                            <div className="shopee-product-rating__like-count">
                                                3
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div class="shopee-product-rating">
                                <a class="shopee-product-rating__avatar" href="/shop/168006836">
                                    <div class="shopee-avatar">
                                        <img
                                            class="shopee-avatar__img"
                                            alt="a"
                                            src="https://down-vn.img.susercontent.com/file/b20d232fc0ce2a222384f7f3f8071790_tn"
                                        />
                                    </div>
                                </a>
                                <div class="shopee-product-rating__main">
                                    <a
                                        class="shopee-product-rating__author-name"
                                        href="/shop/168006836"
                                    >huynhnhu</a>
                                    <div class="repeat-purchase-con">
                                        <div class="shopee-product-rating__rating">
                                            <svg
                                                enable-background="new 0 0 15 15"
                                                viewBox="0 0 15 15"
                                                x="0"
                                                y="0"
                                                class="shopee-svg-icon icon-rating-solid--active icon-rating-solid"
                                            >
                                                <polygon
                                                    points="7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-miterlimit="10"
                                                ></polygon></svg><svg
                                                    enable-background="new 0 0 15 15"
                                                    viewBox="0 0 15 15"
                                                    x="0"
                                                    y="0"
                                                    class="shopee-svg-icon icon-rating-solid--active icon-rating-solid"
                                                >
                                                <polygon
                                                    points="7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-miterlimit="10"
                                                ></polygon></svg><svg
                                                    enable-background="new 0 0 15 15"
                                                    viewBox="0 0 15 15"
                                                    x="0"
                                                    y="0"
                                                    class="shopee-svg-icon icon-rating-solid--active icon-rating-solid"
                                                >
                                                <polygon
                                                    points="7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-miterlimit="10"
                                                ></polygon></svg><svg
                                                    enable-background="new 0 0 15 15"
                                                    viewBox="0 0 15 15"
                                                    x="0"
                                                    y="0"
                                                    class="shopee-svg-icon icon-rating-solid--active icon-rating-solid"
                                                >
                                                <polygon
                                                    points="7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-miterlimit="10"
                                                ></polygon></svg>
                                            <svg
                                                enable-background="new 0 0 15 15"
                                                viewBox="0 0 15 15"
                                                x="0"
                                                y="0"
                                                class="shopee-svg-icon icon-rating-solid--active icon-rating-solid"
                                            >
                                                <polygon
                                                    points="7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-miterlimit="10"
                                                ></polygon>
                                            </svg>
                                        </div>
                                    </div>
                                    <div class="shopee-product-rating__time">
                                        2022-05-11 18:56 | Kích thước: Lớn
                                    </div>
                                    <div
                                        style={{
                                            textAlign:'justify',
                                            width:'90%',
                                            position: 'relative',
                                            boxSizing: 'border-box',
                                            margin: '15px 0px',
                                            fontSize: '14px',
                                            lineHeight: '20px',
                                            color: 'rgba(0, 0, 0, 0.87)',
                                            wordBreak: 'break-word',
                                            whiteSpace: 'pre-wrap',
                                        }}

                                    >
                                        Trước hết, đó là sự tươi ngon và chất lượng của nguyên liệu. Tôi đặt một bữa trưa với một món sushi combo và mỗi miếng sushi đều cho thấy sự chăm sóc đặc biệt trong cách chế biến. Cảm giác tươi mới của các nguyên liệu như cá hồi, tôm và cơm sushi đã tạo nên một trải nghiệm ẩm thực đích thực ngay tại nhà.<br/>

                                        Thứ hai, là cách nhà hàng đóng gói sản phẩm. Mọi thứ đều được đóng gói cẩn thận, giữ cho thực phẩm không bị biến dạng hay rơi rớt trong quá trình vận chuyển. Đặc biệt, gói đựng số lượng đúng của các loại sốt và gia vị, tạo điều kiện cho khách hàng thưởng thức món ăn theo cách tốt nhất có thể.<br/>

                                        Cuối cùng, tôi phải khen ngợi sự chính xác của dịch vụ giao hàng. Bữa trưa của tôi đến đúng giờ đã được cam kết, và nhân viên giao hàng rất thân thiện và chu đáo. Họ giữ nguyên tình trạng nóng hổi của đồ ăn và đảm bảo rằng tôi nhận được mọi thứ trong tình trạng tốt nhất.

                                        Tổng cảm nhận, trải nghiệm đặt hàng online từ nhà hàng này không chỉ đáp ứng mong đợi về chất lượng mà còn mở ra một cách tiện lợi và an toàn để thưởng thức ẩm thực ngon miệng mà không cần phải rời khỏi nhà.
                                        <div
                                            style={{

                                                position: 'absolute',
                                                right: '0px',
                                                bottom: '0px',
                                                background: 'linear-gradient(to left, rgb(255, 255, 255) 75%, rgba(255, 255, 255, 0))',
                                                paddingLeft: '24px',
                                            }}

                                        ></div>
                                    </div>
                                    <div class="shopee-product-rating__image-list-wrapper">
                                        <div class="rating-media-list">
                                            <div class="rating-media-list__container">
                                                <div
                                                    class="rating-media-list__image-wrapper rating-media-list__image-wrapper--inactive"
                                                >
                                                    <div class="shopee-rating-media-list-image__wrapper">
                                                        <div
                                                            class="shopee-rating-media-list-image__place-holder"
                                                        >
                                                            <svg
                                                                enable-background="new 0 0 15 15"
                                                                viewBox="0 0 15 15"
                                                                x="0"
                                                                y="0"
                                                                class="shopee-svg-icon icon-loading-image"
                                                            >
                                                                <g>
                                                                    <rect
                                                                        fill="none"
                                                                        height="8"
                                                                        stroke-linecap="round"
                                                                        stroke-linejoin="round"
                                                                        stroke-miterlimit="10"
                                                                        width="10"
                                                                        x="1"
                                                                        y="4.5"
                                                                    ></rect>
                                                                    <line
                                                                        fill="none"
                                                                        stroke-linecap="round"
                                                                        stroke-linejoin="round"
                                                                        stroke-miterlimit="10"
                                                                        x1="1"
                                                                        x2="11"
                                                                        y1="6.5"
                                                                        y2="6.5"
                                                                    ></line>
                                                                    <rect
                                                                        fill="none"
                                                                        height="3"
                                                                        stroke-linecap="round"
                                                                        stroke-linejoin="round"
                                                                        stroke-miterlimit="10"
                                                                        width="3"
                                                                        x="11"
                                                                        y="6.5"
                                                                    ></rect>
                                                                    <line
                                                                        fill="none"
                                                                        stroke-linecap="round"
                                                                        stroke-linejoin="round"
                                                                        stroke-miterlimit="10"
                                                                        x1="1"
                                                                        x2="11"
                                                                        y1="14.5"
                                                                        y2="14.5"
                                                                    ></line>
                                                                    <line
                                                                        fill="none"
                                                                        stroke-linecap="round"
                                                                        stroke-linejoin="round"
                                                                        stroke-miterlimit="10"
                                                                        x1="6"
                                                                        x2="6"
                                                                        y1=".5"
                                                                        y2="3"
                                                                    ></line>
                                                                    <line
                                                                        fill="none"
                                                                        stroke-linecap="round"
                                                                        stroke-linejoin="round"
                                                                        stroke-miterlimit="10"
                                                                        x1="3.5"
                                                                        x2="3.5"
                                                                        y1="1"
                                                                        y2="3"
                                                                    ></line>
                                                                    <line
                                                                        fill="none"
                                                                        stroke-linecap="round"
                                                                        stroke-linejoin="round"
                                                                        stroke-miterlimit="10"
                                                                        x1="8.5"
                                                                        x2="8.5"
                                                                        y1="1"
                                                                        y2="3"
                                                                    ></line>
                                                                </g>
                                                            </svg>
                                                        </div>
                                                        <div
                                                            class="shopee-rating-media-list-image__content"
                                                            style={{ backgroundImage: `url('https://res.cloudinary.com/drk3oaeza/image/upload/v1700104620/pbl6/efcpqocfqyuom9pt6iwi.jpg')`, }}
                                                        >
                                                            <div
                                                                class="shopee-rating-media-list-image__content--blur"
                                                            ></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="rating-media-list__image-wrapper rating-media-list__image-wrapper--inactive">
                                                    <div className="shopee-rating-media-list-image__wrapper">
                                                        <div className="shopee-rating-media-list-image__place-holder">
                                                            <svg
                                                                enableBackground="new 0 0 15 15"
                                                                viewBox="0 0 15 15"
                                                                x="0"
                                                                y="0"
                                                                className="shopee-svg-icon icon-loading-image"
                                                            >
                                                                <g>
                                                                    <rect
                                                                        fill="none"
                                                                        height="8"
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeMiterlimit="10"
                                                                        width="10"
                                                                        x="1"
                                                                        y="4.5"
                                                                    ></rect>
                                                                    <line
                                                                        fill="none"
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeMiterlimit="10"
                                                                        x1="1"
                                                                        x2="11"
                                                                        y1="6.5"
                                                                        y2="6.5"
                                                                    ></line>
                                                                    <rect
                                                                        fill="none"
                                                                        height="3"
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeMiterlimit="10"
                                                                        width="3"
                                                                        x="11"
                                                                        y="6.5"
                                                                    ></rect>
                                                                    <line
                                                                        fill="none"
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeMiterlimit="10"
                                                                        x1="1"
                                                                        x2="11"
                                                                        y1="14.5"
                                                                        y2="14.5"
                                                                    ></line>
                                                                    <line
                                                                        fill="none"
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeMiterlimit="10"
                                                                        x1="6"
                                                                        x2="6"
                                                                        y1=".5"
                                                                        y2="3"
                                                                    ></line>
                                                                    <line
                                                                        fill="none"
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeMiterlimit="10"
                                                                        x1="3.5"
                                                                        x2="3.5"
                                                                        y1="1"
                                                                        y2="3"
                                                                    ></line>
                                                                    <line
                                                                        fill="none"
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeMiterlimit="10"
                                                                        x1="8.5"
                                                                        x2="8.5"
                                                                        y1="1"
                                                                        y2="3"
                                                                    ></line>
                                                                </g>
                                                            </svg>
                                                        </div>
                                                        <div
                                                            className="shopee-rating-media-list-image__content"
                                                            style={{
                                                                backgroundImage: `url('https://res.cloudinary.com/drk3oaeza/image/upload/v1700104620/pbl6/efcpqocfqyuom9pt6iwi.jpg')`,
                                                            }}
                                                        >
                                                            <div className="shopee-rating-media-list-image__content--blur"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="rating-media-list__image-wrapper rating-media-list__image-wrapper--inactive">
                                                    <div className="shopee-rating-media-list-image__wrapper">
                                                        <div className="shopee-rating-media-list-image__place-holder">
                                                            <svg
                                                                enableBackground="new 0 0 15 15"
                                                                viewBox="0 0 15 15"
                                                                x="0"
                                                                y="0"
                                                                className="shopee-svg-icon icon-loading-image"
                                                            >
                                                                <g>
                                                                    <rect
                                                                        fill="none"
                                                                        height="8"
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeMiterlimit="10"
                                                                        width="10"
                                                                        x="1"
                                                                        y="4.5"
                                                                    ></rect>
                                                                    <line
                                                                        fill="none"
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeMiterlimit="10"
                                                                        x1="1"
                                                                        x2="11"
                                                                        y1="6.5"
                                                                        y2="6.5"
                                                                    ></line>
                                                                    <rect
                                                                        fill="none"
                                                                        height="3"
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeMiterlimit="10"
                                                                        width="3"
                                                                        x="11"
                                                                        y="6.5"
                                                                    ></rect>
                                                                    <line
                                                                        fill="none"
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeMiterlimit="10"
                                                                        x1="1"
                                                                        x2="11"
                                                                        y1="14.5"
                                                                        y2="14.5"
                                                                    ></line>
                                                                    <line
                                                                        fill="none"
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeMiterlimit="10"
                                                                        x1="6"
                                                                        x2="6"
                                                                        y1=".5"
                                                                        y2="3"
                                                                    ></line>
                                                                    <line
                                                                        fill="none"
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeMiterlimit="10"
                                                                        x1="3.5"
                                                                        x2="3.5"
                                                                        y1="1"
                                                                        y2="3"
                                                                    ></line>
                                                                    <line
                                                                        fill="none"
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeMiterlimit="10"
                                                                        x1="8.5"
                                                                        x2="8.5"
                                                                        y1="1"
                                                                        y2="3"
                                                                    ></line>
                                                                </g>
                                                            </svg>
                                                        </div>
                                                        <div
                                                            className="shopee-rating-media-list-image__content"
                                                            style={{
                                                                backgroundImage: `url('https://res.cloudinary.com/drk3oaeza/image/upload/v1700104620/pbl6/efcpqocfqyuom9pt6iwi.jpg')`,
                                                            }}
                                                        >
                                                            <div className="shopee-rating-media-list-image__content--blur"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="rating-media-list__zoomed-image">
                                                <div className="rating-media-list-image-carousel" style={{ transition: 'all 0ms ease 0s' }}>
                                                    <div className="rating-media-list-image-carousel__item-list-wrapper">
                                                        <ul className="rating-media-list-image-carousel__item-list" style={{ marginTop: '0px', transform: 'translateX(0px)', transition: 'all 0ms ease 0s' }}>
                                                            <li className="rating-media-list-image-carousel__item rating-media-list-image-carousel__item--fluid" style={{ padding: '0px 0.625rem' }}>
                                                                <img
                                                                    src="https://res.cloudinary.com/drk3oaeza/image/upload/v1700104620/pbl6/efcpqocfqyuom9pt6iwi.jpg"
                                                                    alt="rating"
                                                                    className="rating-media-list__zoomed-image-item"
                                                                />
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="rating-media-list-carousel-arrow rating-media-list-carousel-arrow--prev rating-media-list-carousel-arrow--hint rating-media-list-carousel-arrow--hidden" role="button" tabIndex="0" style={{ opacity: 1, visibility: 'hidden', transform: 'translateX(calc(-50% + 0px))' }}>
                                                        <svg
                                                            enableBackground="new 0 0 13 20"
                                                            viewBox="0 0 13 20"
                                                            x="0"
                                                            y="0"
                                                            className="shopee-svg-icon icon-arrow-left-bold"
                                                        >
                                                            <polygon points="4.2 10 12.1 2.1 10 -.1 1 8.9 -.1 10 1 11 10 20 12.1 17.9"></polygon>
                                                        </svg>
                                                    </div>
                                                    <div className="rating-media-list-carousel-arrow rating-media-list-carousel-arrow--next rating-media-list-carousel-arrow--hint rating-media-list-carousel-arrow--hidden" role="button" tabIndex="0" style={{ opacity: 1, visibility: 'hidden', transform: 'translateX(calc(50% - 0px))' }}>
                                                        <svg
                                                            enableBackground="new 0 0 13 21"
                                                            viewBox="0 0 13 21"
                                                            x="0"
                                                            y="0"
                                                            className="shopee-svg-icon icon-arrow-right-bold"
                                                        >
                                                            <polygon points="11.1 9.9 2.1 .9 -.1 3.1 7.9 11 -.1 18.9 2.1 21 11.1 12 12.1 11"></polygon>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="shopee-product-rating__actions" style={{ justifyContent: 'space-between' }}>
                                        <div style={{ display: 'flex' }}>
                                            <div className="shopee-product-rating__like-button">
                                                <svg
                                                    width="14px"
                                                    height="13px"
                                                    viewBox="0 0 14 13"
                                                    version="1.1"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M0,12.7272727 L2.54545455,12.7272727 L2.54545455,5.09090909 L0,5.09090909 L0,12.7272727 Z M14,5.72727273 C14,5.02727273 13.4272727,4.45454545 12.7272727,4.45454545 L8.71818182,4.45454545 L9.35454545,1.52727273 L9.35454545,1.33636364 C9.35454545,1.08181818 9.22727273,0.827272727 9.1,0.636363636 L8.4,0 L4.2,4.2 C3.94545455,4.39090909 3.81818182,4.70909091 3.81818182,5.09090909 L3.81818182,11.4545455 C3.81818182,12.1545455 4.39090909,12.7272727 5.09090909,12.7272727 L10.8181818,12.7272727 C11.3272727,12.7272727 11.7727273,12.4090909 11.9636364,11.9636364 L13.8727273,7.44545455 C13.9363636,7.31818182 13.9363636,7.12727273 13.9363636,7 L13.9363636,5.72727273 L14,5.72727273 C14,5.79090909 14,5.72727273 14,5.72727273 Z"
                                                    ></path>
                                                </svg>
                                            </div>
                                            <div className="shopee-product-rating__like-count">
                                                7
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="shopee-page-controller product-ratings__page-controller" style={{ margin: '20px 0 15px 0' }}>
                            <button className="shopee-icon-button shopee-icon-button--left">
                                <svg
                                    enableBackground="new 0 0 11 11"
                                    viewBox="0 0 11 11"
                                    x="0"
                                    y="0"
                                    className="shopee-svg-icon icon-arrow-left"
                                >
                                    <g>
                                        <path
                                            d="m8.5 11c-.1 0-.2 0-.3-.1l-6-5c-.1-.1-.2-.3-.2-.4s.1-.3.2-.4l6-5c .2-.2.5-.1.7.1s.1.5-.1.7l-5.5 4.6 5.5 4.6c.2.2.2.5.1.7-.1.1-.3.2-.4.2z"
                                        ></path>
                                    </g>
                                </svg>
                            </button>
                            <button className="shopee-button-no-outline">1</button>
                            <button className="shopee-button-solid shopee-button-solid--primary">
                                2
                            </button>
                            <button className="shopee-button-no-outline">3</button>
                            <button className="shopee-button-no-outline">4</button>
                            <button className="shopee-button-no-outline">5</button>
                            <button className="shopee-button-no-outline shopee-button-no-outline--non-click">
                                ...
                            </button>
                            <button className="shopee-icon-button shopee-icon-button--right">
                                <svg
                                    enableBackground="new 0 0 11 11"
                                    viewBox="0 0 11 11"
                                    x="0"
                                    y="0"
                                    className="shopee-svg-icon icon-arrow-right"
                                >
                                    <path
                                        d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z"
                                    ></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Comment