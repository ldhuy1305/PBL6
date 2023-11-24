import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import ava from '../../assets/img/images.jpg'
import { useTranslation } from "react-i18next";
import Notify from '../Notify.jsx/Notify'
import LoadingModal from "../Loading/Loading";
import axios from "axios";
const RatingStore = ({ show, handleClose, handleReturn, store, rating }) => {
    const { t } = useTranslation();

    const [formData, setFormData] = useState({
        number: rating && rating.number ? rating.number : '',
        content: rating && rating.content ? rating.content : '',
        images: rating && rating.images ? [...rating.images] : [],
    });

    const [openNotify, setOpenNotify] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [notify, setNotify] = useState('')

    const handleCloseRating = () => {
        handleClose()
        setFormData({
            number: rating && rating.number ? rating.number : '',
            content: rating && rating.content ? rating.content : '',
            images: rating && rating.images ? [...rating.images] : [],
        });
    }

    const handleCloseNotify = () => {
        setOpenNotify(false)
        console.log("đóng modal")
    }

    const handleChangeImg = (e) => {
        const name = e.target.name;
        const files = e.target.files;

        // Convert fileList to array
        const imagesArray = Array.from(files);

        setFormData({
            ...formData,
            [name]: (formData.images || []).concat(imagesArray),
        });
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async () => {
        const res = new FormData();
        res.append('number', formData.number);
        res.append('content', formData.content);

        // Append each image to the FormData
        if (formData.images && formData.images.length > 0) {
            formData.images.forEach((image, index) => {
                res.append(`images`, image); // assuming 'images' is an array of files
            });
        }
        if (formData.number === '') {
            setNotify("Mời bạn chọn số sao để đánh giá")
            setOpenNotify(true)
        } else {
            const token = localStorage.getItem("token");
            try {
                setIsLoading(true);
                const response = await axios.post(`https://falth-api.vercel.app/api/store/${store._id}/rating`, res, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        ContentType: 'multipart/form-data',
                    }
                });
                setNotify("Đánh giá thành công!")
                setOpenNotify(true)
                handleClose()
            } catch (error) {
                setNotify("Đánh giá thất bại! Bạn đã đánh giá cho cửa hàng này rồi!")
                setOpenNotify(true)
                handleClose()
            } finally {
                setIsLoading(false);
            }
            setFormData({
                number: '',
                content: '',
                images: [],
            });
        }

    };

    const renderStars = (rating) => {
        return Array(5).fill(0).map((_, index) => {
            const starValue = index + 1;
            const percentFilled = Math.min(100, Math.max(0, rating - index) * 100);
            const isHalfFilled = percentFilled > 0 && percentFilled < 100;

            return (
                <div className="shopee-rating-stars__star-wrapper" key={index}>
                    <div className="shopee-rating-stars__lit" style={{ width: `${isHalfFilled ? percentFilled : percentFilled}%`, color: '#ffb500' }}>
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
    return (
        <div>
            <Modal className="modal fade modal-customer-feeback" show={show} handleClose={handleClose} size="lg">
                <Modal.Header>
                    <span class="close" style={{ fontSize: '24px' }} onClick={handleCloseRating}
                    >x</span>
                    <div class="modal-header" style={{ color: 'white' }}>Đánh giá cửa hàng</div>
                </Modal.Header>
                <Modal.Body>
                    <div class="modal-dialog modal-noti" role="document">
                        <div class="modal-content">

                            <div class="modal-body">
                                <div class="slick-slider slick-initialized" dir="ltr">
                                    <div class="slick-list">
                                        <div
                                            class="slick-track"
                                            style={{
                                                opacity: 1,
                                                transform: 'translate3d(0px, 0px, 0px)',
                                                width: '1620px',
                                            }}


                                        >
                                            <div
                                                data-index="0"
                                                class="slick-slide slick-active slick-current"
                                                tabindex="-1"
                                                aria-hidden="false"
                                                style={{ outline: 'none' }}
                                            >
                                                <div>
                                                    <div style={{ width: '540px' }}>
                                                        <div class="review-section">
                                                            <img
                                                                class="image"
                                                                src={ava}
                                                                alt=""
                                                            />
                                                            <div class="shipper-name" style={{ margin: '0' }}>{store.name}</div>
                                                            <div class="shopee-rating-stars product-rating-overview__stars" style={{ margin: '0' }}>
                                                                <div className="shopee-rating-stars__stars">
                                                                    {renderStars(store.ratingsAverage)}
                                                                </div>
                                                            </div>
                                                            <div >
                                                                <select defaultValue="" className="custom-select" name='number' value={formData.number} onChange={handleChange}>
                                                                    <option value="" selected="selected" disabled>Đánh giá theo số sao</option>
                                                                    <option value={1}>1 sao</option>
                                                                    <option value={2}>2 sao</option>
                                                                    <option value={3}>3 sao</option>
                                                                    <option value={4}>4 sao</option>
                                                                    <option value={5}>5 sao</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div class="block-comment">
                                                            <textarea
                                                                name="content"
                                                                id=""
                                                                placeholder="Chia sẻ đánh giá của bạn. Đánh giá và bình luận của bạn sẽ được giữ dưới chế độ ẩn danh."
                                                                maxlength="300"
                                                                value={formData.content} onChange={handleChange}
                                                            ></textarea>
                                                            <div class="upload-image">
                                                                <div style={{ display: 'flex' }}>
                                                                    {/* Hiển thị các ảnh đã chọn */}
                                                                    {formData.images && formData.images.map((image, index) => (
                                                                        <div key={index} style={{ position: 'relative' }}>
                                                                            {image instanceof File ? (
                                                                                <img
                                                                                    src={URL.createObjectURL(image)}
                                                                                    alt={`selected-${index}`}
                                                                                    style={{ width: '60px', height: '60px', margin: '10px' }}
                                                                                />
                                                                            ) : (
                                                                                <img
                                                                                    src={image} // Đặt nguồn ảnh trực tiếp nếu không phải là đối tượng File
                                                                                    alt={`selected-${index}`}
                                                                                    style={{ width: '60px', height: '60px', margin: '10px' }}
                                                                                />
                                                                            )}
                                                                            <span class="btn-delete-tag" style={{ top: '5px', right: '5px' }}
                                                                                onClick={() => {
                                                                                    const newImages = [...formData.images];
                                                                                    newImages.splice(index, 1);
                                                                                    setFormData({ ...formData, images: newImages });
                                                                                }}>x</span>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                                <div class="item-upload btn-up" style={{ marginTop: '10px' }}>
                                                                    <label
                                                                    ><span class="fa-solid fa-upload" style={{ fontSize: '60px', cursor: 'pointer', marginLeft: '10px' }}></span>
                                                                        <input
                                                                            type="file"
                                                                            multiple=""
                                                                            name="images"
                                                                            accept="image/*"
                                                                            style={{ visibility: 'hidden' }}
                                                                            onChange={handleChangeImg}
                                                                        />
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div></div>
                                                        </div>
                                                        <div class="submit-section">
                                                            {!rating && (<button type="button" class="btn btn-cancel" onClick={handleReturn}>{t('back')}</button>)}
                                                            <button type="button" disabled="" class="btn btn-submit" onClick={handleSubmit}>Gửi đánh giá</button>
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
                    <div class="modal-backdrop fade under-modal"></div>
                </Modal.Body>
            </Modal>
            {openNotify && (<Notify message={notify} setOpenNotify={setOpenNotify} handleClose={handleCloseNotify} />)}
            {isLoading && (<LoadingModal />)}
        </div>

    )
}
export default RatingStore