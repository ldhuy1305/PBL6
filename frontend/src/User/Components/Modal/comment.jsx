import React, { useState } from "react";
import '../../assets/css/pcmall.css'
import CommentItem from "../Item/commentItem";

const Comment = () => {
    const renderStars = (rating) => {
        return Array(5).fill(0).map((_, index) => {
            const starValue = index + 1;
            const percentFilled = Math.min(100, Math.max(0, rating - index) * 100);
            const isHalfFilled = percentFilled > 0 && percentFilled < 100;

            return (
                <div className="shopee-rating-stars__star-wrapper" key={index}>
                    <div className="shopee-rating-stars__lit" style={{ width: `${isHalfFilled ? percentFilled : percentFilled}%`, color: '#ee4d2d' }}>
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
                </div>
            );
        });
    };
    const [activeFilter, setActiveFilter] = useState('Tất cả');

    const handleFilterClick = (filter) => {
        setActiveFilter(filter);
    };

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
            <div style={{ display: 'contents' }}>
                <div class="product-ratings" data-nosnippet="true">
                    <div class="product-ratings__header">
                        {/* <div class="product-ratings__header_score">ĐÁNH GIÁ SẢN PHẨM</div> */}
                    </div>
                    <div class="product-rating-overview">
                        <div class="product-rating-overview__briefing">
                            <div class="product-rating-overview__score-wrapper">
                                <span class="product-rating-overview__rating-score">4.6 </span>
                                <span class="product-rating-overview__rating-score-out-of">
                                    / 5
                                </span>
                            </div>
                            <div class="shopee-rating-stars product-rating-overview__stars">
                                <div className="shopee-rating-stars__stars">
                                    {renderStars(4.6)}
                                </div>
                            </div>
                        </div>
                        <div className="product-rating-overview__filters">
                            <div
                                className={`product-rating-overview__filter ${activeFilter === 'Tất cả' ? 'product-rating-overview__filter--active' : ''}`}
                                onClick={() => handleFilterClick('Tất cả')}
                            >
                                Tất cả
                            </div>
                            <div
                                className={`product-rating-overview__filter ${activeFilter === '5 Sao (2,3k)' ? 'product-rating-overview__filter--active' : ''}`}
                                onClick={() => handleFilterClick('5 Sao (2,3k)')}
                            >5 Sao (2,3k)</div>
                            <div
                                className={`product-rating-overview__filter ${activeFilter === '4 Sao (114)' ? 'product-rating-overview__filter--active' : ''}`}
                                onClick={() => handleFilterClick('4 Sao (114)')}
                            >4 Sao (114)</div>
                            <div
                                className={`product-rating-overview__filter ${activeFilter === '3 Sao (40)' ? 'product-rating-overview__filter--active' : ''}`}
                                onClick={() => handleFilterClick('3 Sao (40)')}
                            >3 Sao (40)</div>
                            <div
                                className={`product-rating-overview__filter ${activeFilter === '2 Sao (9)' ? 'product-rating-overview__filter--active' : ''}`}
                                onClick={() => handleFilterClick('2 Sao (9)')}
                            >2 Sao (9)</div>
                            <div
                                className={`product-rating-overview__filter ${activeFilter === '1 Sao (11)' ? 'product-rating-overview__filter--active' : ''}`}
                                onClick={() => handleFilterClick('1 Sao (11)')}
                            >1 Sao (11)</div>
                            <div
                                className={`product-rating-overview__filter ${activeFilter === 'Có Bình luận (1,1k)' ? 'product-rating-overview__filter--active' : ''}`}
                                onClick={() => handleFilterClick('Có Bình luận (1,1k)')}
                            >Có Bình luận (1,1k)</div>
                            <div
                                className={`product-rating-overview__filter ${activeFilter === 'Có hình ảnh (439)' ? 'product-rating-overview__filter--active' : ''}`}
                                onClick={() => handleFilterClick('Có hình ảnh (439)')}
                            >Có hình ảnh (439)</div>
                        </div>
                    </div>
                    <div class="product-ratings__list" style={{ opacity: '1' }}>
                        <div class="shopee-product-comment-list">
                            <CommentItem
                                like={6}
                                avatar='https://res.cloudinary.com/drk3oaeza/image/upload/v1700123551/pbl6/koycb60iwvqpwxqfeogu.jpg'
                                userName='lanngan91'
                                rating={5}
                                comment='Đồ ăn ngon nhưng giá hơn cao so với những quán khác'
                                date='2022-05-05 20:14'
                                images={['https://res.cloudinary.com/drk3oaeza/image/upload/v1700104620/pbl6/efcpqocfqyuom9pt6iwi.jpg',
                                    'https://res.cloudinary.com/drk3oaeza/image/upload/v1700223615/pbl6/magkhfbnncrk1rmo1cvx.jpg'
                                ]}
                                renderStars={renderStars}
                            />
                            <CommentItem
                            like={23}
                                avatar='https://down-vn.img.susercontent.com/file/b20d232fc0ce2a222384f7f3f8071790_tn'
                                userName='huynhnhu'
                                rating={4}
                                comment={`
    Trước hết, đó là sự tươi ngon và chất lượng của nguyên liệu. Tôi đặt một bữa trưa với một món sushi combo và mỗi miếng sushi đều cho thấy sự chăm sóc đặc biệt trong cách chế biến. Cảm giác tươi mới của các nguyên liệu như cá hồi, tôm và cơm sushi đã tạo nên một trải nghiệm ẩm thực đích thực ngay tại nhà.

    Thứ hai, là cách nhà hàng đóng gói sản phẩm. Mọi thứ đều được đóng gói cẩn thận, giữ cho thực phẩm không bị biến dạng hay rơi rớt trong quá trình vận chuyển. Đặc biệt, gói đựng số lượng đúng của các loại sốt và gia vị, tạo điều kiện cho khách hàng thưởng thức món ăn theo cách tốt nhất có thể.

    Cuối cùng, tôi phải khen ngợi sự chính xác của dịch vụ giao hàng. Bữa trưa của tôi đến đúng giờ đã được cam kết, và nhân viên giao hàng rất thân thiện và chu đáo. Họ giữ nguyên tình trạng nóng hổi của đồ ăn và đảm bảo rằng tôi nhận được mọi thứ trong tình trạng tốt nhất.

    Tổng cảm nhận, trải nghiệm đặt hàng online từ nhà hàng này không chỉ đáp ứng mong đợi về chất lượng mà còn mở ra một cách tiện lợi và an toàn để thưởng thức ẩm thực ngon miệng mà không cần phải rời khỏi nhà.
  `}
                                date='2022-05-11 18:56'
                                images={[
                                    'https://res.cloudinary.com/drk3oaeza/image/upload/v1700471930/pbl6/jgjzksciqaxhvkfa5w7g.jpg',
                                    'https://res.cloudinary.com/drk3oaeza/image/upload/v1700104620/pbl6/efcpqocfqyuom9pt6iwi.jpg',
                                ]}
                                renderStars={renderStars}
                            />
                        </div>
                        {/* <div className="shopee-page-controller product-ratings__page-controller" style={{ margin: '20px 0 15px 0' }}>
                            <button className="shopee-icon-button shopee-icon-button--left" onClick={() => handlePageClick('prev')}>
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
                            <button className={`${page === 1 ? 'shopee-button-solid shopee-button-solid--primary' : 'shopee-button-no-outline'}`}
                                onClick={() => setPage(1)}
                            >
                            1</button>
                            <button className={`${page === 2 ? 'shopee-button-solid shopee-button-solid--primary' : 'shopee-button-no-outline'}`}
                                onClick={() => setPage(2)}
                            >
                                2
                            </button>
                            <button className={`${page === 3 ? 'shopee-button-solid shopee-button-solid--primary' : 'shopee-button-no-outline'}`}
                                onClick={() => setPage(3)}
                            >3</button>
                            <button className={`${page === 4 ? 'shopee-button-solid shopee-button-solid--primary' : 'shopee-button-no-outline'}`}
                                onClick={() => setPage(4)}
                            >4</button>
                            <button className={`${page === 5 ? 'shopee-button-solid shopee-button-solid--primary' : 'shopee-button-no-outline'}`}
                                onClick={() => setPage(5)}
                            >5</button>
                            <button className="shopee-button-no-outline shopee-button-no-outline--non-click">
                                ...
                            </button>
                            <button className="shopee-icon-button shopee-icon-button--right" onClick={() => handlePageClick('next')}>
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
                        </div> */}
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
            <button class="no_hover"><i class="fa-solid fa-circle-chevron-right " style={{ color: 'red', fontSize: '18px', verticalAlign: 'middle' }}></i></button>
          </li>
        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Comment