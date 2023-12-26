import React, { useState } from "react";
import cutlery from '../../assets/img/cutlery.png'

const ModalVoucher = ({handleclose, discounts, selectedVoucher, setSelectedVoucher}) => {
    const [temp, setTemp] = useState({...selectedVoucher})
    const handleRadioChange = (discount) => {
        setTemp({ ...discount });
    };
    const handleSumbmit = () => {
        setSelectedVoucher({ ...temp });
        handleclose();
    };
    return (
        <div class="stardust-popup">
            <div class="stardust-popup__dialog--wrapper">
                <div
                    class="stardust-popup__dialog"
                    role="dialog"
                    aria-labelledby="undefined_stardust-popup-title_1703471828964"
                    aria-describedby=""
                    aria-modal="true"
                >
                    <div class="stardust-popup__dialog--wrapper-top">
                        <div
                            class="stardust-popup-content"
                            id="undefined_stardust-popup-content_1703471828964"
                        >
                            <div class="Rn4RMZ">
                                <div style={{ display: 'contents' }}>
                                    <div>
                                        <div class="shopee-popup-form oS7fgU">
                                            <div class="shopee-popup-form__header">
                                                <div class="shopee-popup-form__title">
                                                    <span tabindex="0">Chọn Voucher</span>
                                                </div>
                                                <div
                                                    class="stardust-popover"
                                                    id="stardust-popover0"
                                                    tabindex="0"
                                                >
                                                </div>
                                            </div>
                                            <div class="shopee-popup-form__main">
                                                <div class="y5uClx shopee-popup-form__main-container">
                                                    <div class="u6HdhE d9WDAK">
                                                        <div class="iF8vqN BzObne A3W8C5">
                                                            <span tabindex="0">Có thể chọn 1 Voucher</span>
                                                        </div>
                                                        {discounts.map((discount) => (
                                                            <div
                                                                data-testid="vcCard"
                                                                class="vc_Card_container vc_Card_fsv vc_Card_inapplicable vc_VoucherStandardTemplate_fsv vc_VoucherStandardTemplate_inapplicable vc_free-shipping-voucher_pc"
                                                            >
                                                                <div class="vc_Card_card" style={{ marginBottom: '10px' }}>
                                                                    <div class="vc_Card_left">
                                                                        <div class="vc_Card_sawtooth"></div>
                                                                    </div>
                                                                    <div class="vc_Card_right"></div>
                                                                    <div
                                                                        class="vc_VoucherStandardTemplate_hideOverflow"
                                                                    ></div>
                                                                    <div
                                                                        data-testid="voucher-card"
                                                                        class="vc_VoucherStandardTemplate_template"
                                                                        role="presentation"
                                                                    >
                                                                        <div
                                                                            class="vc_VoucherStandardTemplate_left"
                                                                            role="presentation"
                                                                        >
                                                                            <img
                                                                                style={{ width: '100%', height: '80%' }}
                                                                                // src="https://res.cloudinary.com/drk3oaeza/image/upload/v1700623073/pbl6/iamqe4otehj5ei5xooxk.jpg"
                                                                                alt="Logo"
                                                                                src={cutlery}
                                                                            />
                                                                        </div>
                                                                        <div
                                                                            class="vc_VoucherStandardTemplate_middle"
                                                                            role="presentation"
                                                                            tabindex="0"
                                                                        >
                                                                            {/* <div class="vc_A11yAriaText_A11yContent">
                                                                                <span aria-label="voucher #"></span><span
                                                                                    aria-label=" Vui lòng mua hàng trên ứng dụng Shopee để sử dụng ưu đãi."></span>
                                                                            </div> */}
                                                                            <div
                                                                                data-testid="vcMainTitle"
                                                                                class="vc_MainTitle_mainTitle"
                                                                            >
                                                                                <div
                                                                                    class="vc_MainTitle_text vc_MainTitle_fsvLine"
                                                                                >
                                                                                    Giảm {discount.content1.toLocaleString('vi-VN')}₫
                                                                                </div>
                                                                            </div>
                                                                            <div
                                                                                data-testid="vcSubtitle"
                                                                                class="vc_Subtitle_subTitle vc_Subtitle_oneLine"
                                                                            >
                                                                                Đơn Tối Thiểu {discount.content2.toLocaleString('vi-VN')}₫
                                                                            </div>
                                                                            <div
                                                                                data-testid="vcLabel"
                                                                                class="vc_Label_label"
                                                                            >
                                                                                <div
                                                                                    class="vc_Label_shopeeWalletLabel"
                                                                                    data-cy="voucher_card_label"
                                                                                >
                                                                                    <div
                                                                                        class="vc_Label_shopeeWalletLabelContent"
                                                                                        data-cy="voucher_card_label_content"
                                                                                        aria-label="Dành riêng cho bạn"
                                                                                        style={{ color: 'red' }}
                                                                                    >
                                                                                        {discount.content3}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div
                                                                                data-testid="vcProgressBarExpiry"
                                                                                class="vc_ProgressBarExpiry_progressBarExpiry"
                                                                            >
                                                                                <div
                                                                                    class="vc_ProgressBarExpiry_usageLimitedText vc_ProgressBarExpiry_twoRowsLimitText"
                                                                                >
                                                                                    <span
                                                                                        class="vc_ProgressBarExpiry_isEndingSoon vc_ProgressBarExpiry_capitalize"
                                                                                    >Sắp hết hạn: Còn {discount.content4} giờ</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            class="vc_VoucherStandardTemplate_right"
                                                                            role="presentation"
                                                                        >
                                                                            <div></div>
                                                                            <div class="vc_VoucherStandardTemplate_center" style={{width:'20px', height:'20px'}}>
                                                                                {/* <div
                                                                                    // data-testid="vcRadioButton"
                                                                                    class="vc_RadioButton_radio vc_RadioButton_radioDisabled"
                                                                                    // data-cy="voucher_card_radiobutton"
                                                                                    aria-label=""
                                                                                    role="radio"
                                                                                    aria-checked="true"
                                                                                    tabindex="0"
                                                                                ></div> */}
                                                                                <input

                                                        type="radio"
                                                        id={`discounts-radio-${discount._id}`}
                                                        name="discounts-radio-group"
                                                        value={discount._id}
                                                        checked={temp && temp._id === discount._id}
                                                        
                                                        onChange={() => handleRadioChange(discount)}
                                                    />
                                                                            </div>
                                                                            <div>
                                                                                <div
                                                                                    data-testid="vcTNCLink"
                                                                                    class="vc_TNCLink_tncLink"
                                                                                    role="navigation"
                                                                                >
                                                                                    <a
                                                                                        href="/voucher/details?action=okay&amp;evcode=RlNWLTc3NTAwNjIyOTM4MTEyMA%3D%3D&amp;from_source=opc-voucher-drawer&amp;promotionId=775006229381120&amp;signature=200b209254895cdfbb12bfade6afbd37e04729f68af58ddbde2d27826fa226cb"
                                                                                    ><span>Điều Kiện</span></a>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}



                                                        <div class="JbRfQk"></div>
                                                    </div>
                                                    <div role="status" aria-label=""></div>
                                                </div>
                                            </div>
                                            <div class="shopee-popup-form__footer">
                                                <div class="asfDVE"></div>
                                                <button class="cancel-btn" onClick={handleclose}>
                                                    <span tabindex="-1" aria-label=" Trở Lại"
                                                    >Trở Lại</span></button>
                                                    <button
                                                        type="button"
                                                        class="btn--voucher btn-solid-primary btn--s btn--inline e5P6KA"
                                                        aria-disabled="false"
                                                        onClick={handleSumbmit}
                                                    >
                                                    <span tabindex="-1" aria-label=" OK">OK</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="stardust-popup-buttons"></div>
                </div>
            </div>
            <div class="stardust-popup__overlay" style={{ zIndex: '-1' }}></div>
        </div>
    )
}

export default ModalVoucher;