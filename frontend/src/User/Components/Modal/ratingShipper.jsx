import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import ava from '../../assets/img/images.jpg'
import { useTranslation } from "react-i18next";
const RatingShipper = ({ show, handleClose, handleShowRatingStore }) => {
    const {t} = useTranslation();
    const [formData, setFormData] = useState({
        rating: '',
        reviewText: '',
        selectedImages: null,
    });


    const handleChangeImg = (e) => {
        const name = e.target.name;
        const files = e.target.files;

        // Convert fileList to array
        const imagesArray = Array.from(files);

        setFormData({
            ...formData,
            [name]: (formData.selectedImages || []).concat(imagesArray),
        });
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = () => {
        console.log(formData);
        setFormData({
            rating: '',
            reviewText: '',
            selectedImages: null,
        })
        handleShowRatingStore()
    };
    return (
        <div>
            <Modal className="modal fade modal-customer-feeback" show={show} handleClose={handleClose} size="lg">
                <Modal.Header>
                    <span class="close" style={{ fontSize: '24px' }} onClick={handleClose}
                    >x</span>
                    <div class="modal-header" style={{ color: 'white' }}>Đánh giá Tài xế</div>
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
                                                            <div class="shipper-name">Tôn Long Tiến</div>
                                                            <div class="rating-star-container">
                                                                <i class="fas fa-star icon-star active disabled" data-rate="101"></i>
                                                                <i class="fas fa-star icon-star active disabled" data-rate="102"></i>
                                                                <i class="fas fa-star icon-star active disabled" data-rate="103"></i>
                                                                <i class="fas fa-star icon-star active disabled" data-rate="104"></i>
                                                                <i class="fas fa-star icon-star active disabled" data-rate="105"></i>
                                                            </div>
                                                            <div >
                                                                <select defaultValue="" className="custom-select" name='rating' value={formData.rating} onChange={handleChange}>
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
                                                                name="reviewText"
                                                                id=""
                                                                placeholder="Chia sẻ đánh giá của bạn. Đánh giá và bình luận của bạn sẽ được giữ dưới chế độ ẩn danh."
                                                                maxlength="300"
                                                                value={formData.reviewText} onChange={handleChange}
                                                            ></textarea>
                                                            <div class="upload-image">
                                                                <div style={{ display: 'flex' }}>
                                                                    {/* Hiển thị các ảnh đã chọn */}
                                                                    {formData.selectedImages && formData.selectedImages.map((image, index) => (
                                                                        <img
                                                                            key={index}
                                                                            src={URL.createObjectURL(image)}
                                                                            alt={`selected-${index}`}
                                                                            style={{ width: '50px', height: '50px', margin: '10px' }}
                                                                        />
                                                                    ))}
                                                                </div>
                                                                <div class="item-upload btn-up" style={{ marginTop: '10px' }}>
                                                                    <label
                                                                    ><span class="fa-solid fa-upload" style={{ fontSize: '50px' }}></span>
                                                                        <input
                                                                            type="file"
                                                                            multiple=""
                                                                            name="selectedImages"
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
                                                            <button type="button" class="btn btn-submit" variant="primary" onClick={handleSubmit}>
                                                                {t('next')}
                                                            </button>
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
        </div>

    )
}
export default RatingShipper