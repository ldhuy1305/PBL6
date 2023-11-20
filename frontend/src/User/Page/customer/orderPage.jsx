import React, { useState, useEffect } from "react";
import logo from '../../assets/img/logo.png'
import '../../assets/css/b.css'
import PickAddress from "../../Components/Modal/pickAddress";
import { useNavigate, useLocation } from "react-router-dom";
import { useCity } from "../../services/CityContext";
import OrderDishItem from "../../Components/Item/orderedDishItem";
import LoadingModal from "../../Components/Loading/Loading";
import { placeOrder } from "../../services/userServices";
const OrderPage = () => {
  const [showModalAddress, setShowModalAddress] = useState(false);
  const { cart, setCart, productsCount } = useCity();
  const location = useLocation()
  const total = location.state.total
  const feeDefault = location.state.feeDefault
  const calArray = location.state.calArray
  const [totalPrice, setTotalPrice] = useState(total)
  const [shipFee, setShipFee] = useState(feeDefault.shipCost)
  const [distance, setDistance] = useState(feeDefault.distance)
  const [deliveryTime, setDeliveryTime] = useState(feeDefault.deliveryTime)
  const [totalPayment, setTotalPayment] = useState(totalPrice + shipFee)
  const [selectedContact, setSelectedContact] = useState({})
  const [array, setArray] = useState(calArray)
  const [userName, setUserName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState()
  const openModalAddress = () => {
    setShowModalAddress(true);
  };

  const closeModalAddress = () => {
    setShowModalAddress(false);
  };

  const navigate = useNavigate();

  const handleOrder = async () => {
    try {
      setIsLoading(true)
      const response = await placeOrder(totalPayment, shipFee, selectedContact.location.coordinates);
      const orderUrl = response.url; // Đặt tên phù hợp với trường cần lấy từ response
      window.open(orderUrl, '_blank'); // '_blank' để mở ở một tab mới
  } catch (error) {
      console.error("Error placing order:", error);
  }
  setIsLoading(false)

  };
  useEffect(() => {
    let tempTotal = 0;
    cart.products.forEach(product => {
      const productTotal = product.amount * product.price;
      tempTotal += productTotal;
    });

    setTotalPrice(tempTotal);
  }, [cart]);

  useEffect(() => {
    setTotalPayment(totalPrice + shipFee);
  }, [totalPrice, shipFee]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const user = localStorage.getItem("user");
        const userData = JSON.parse(user);
        const defaultContactId = userData.defaultContact;
        const defaultContact = userData.contact.find(contact => contact._id === defaultContactId);
        setUser(userData);
        setSelectedContact(defaultContact)
        setUserName(userData.firstName + " " + userData.lastName)
      } catch (error) {
        console.error("Lỗi khi lấy thông tin phí vận chuyển:", error);
      }
      setIsLoading(false)
    }
    fetchData();
  }, []);

  useEffect(() => {
      try {
        const feeShipElement = array.find(element => element.contact._id === selectedContact._id);
        setShipFee(feeShipElement.shipCost)
        setDistance(feeShipElement.distance)
        setDeliveryTime(feeShipElement.deliveryTime)
      } catch (error) {
        console.error("Lỗi khi lấy thông tin phí vận chuyển:", error);
      }
      console.log(selectedContact)
  }, [selectedContact]);

  return (
    <div>
      <div class="eqkueT">
        <div class="YqIqug">
          <div class="container_od">
            <div class="jb8bh0">
              <a class="_4+lJqn" href="/">
                <img src={logo} alt="" style={{ height: '80px', width: '100px' }} />
                <h1 class="eSRYBr">Thanh toán</h1></a>
            </div>
          </div>
        </div>
        <div role="main" class="OX-2Lj">
          <div class="-p7ULT">
            <div class="vtrWey"></div>
            <div class="_8jJlG8">
              <div class="nU2ylc">
                <div class="MqmqK4">
                  <div class="Iafoll">
                    <svg
                      height="16"
                      viewBox="0 0 12 16"
                      width="12"
                      class="shopee-svg-icon icon-location-marker"
                    >
                      <path
                        d="M6 3.2c1.506 0 2.727 1.195 2.727 2.667 0 1.473-1.22 2.666-2.727 2.666S3.273 7.34 3.273 5.867C3.273 4.395 4.493 3.2 6 3.2zM0 6c0-3.315 2.686-6 6-6s6 2.685 6 6c0 2.498-1.964 5.742-6 9.933C1.613 11.743 0 8.498 0 6z"
                        fill-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <h2>Địa chỉ nhận hàng</h2>
                </div>
              </div>
              <div class="Jw2Sc-">
                <div>
                  <div class="NYnMjH">
                    <div class="FVWWQy">{userName} | {selectedContact.phoneNumber}</div>
                    <div class="QsWYfx">
                      {selectedContact.address}
                    </div>
                    <div class="uk7Wpm">Mặc định</div>
                  </div>
                </div>
                <button onClick={openModalAddress} class="_3WkjWD div-style">Thay đổi</button>
              </div>
            </div>
          </div>
          <div class="sqxwIi">
            <div class="_3cPNXP">
              <div class="V-sVj2">
                <div class="jNp+ZB ktatB-"><h2 class="_6HCfS6">Sản phẩm</h2></div>
                <div class="jNp+ZB _04sLFc" style={{ textAlign: 'left', paddingLeft: '20px' }}>Yêu cầu đặc biệt</div>
                <div class="jNp+ZB">Đơn giá</div>
                <div class="jNp+ZB">Số lượng</div>
                <div class="jNp+ZB LBqTli">Thành tiền</div>
              </div>
            </div>
            <div>
              <div class="o6P-mw">
                <div>
                  <div class="Z7qspM">
                    <div class="vYrpLx">
                      <h3 class="YSl9dN">{cart.nameStore}  <i class="fa-regular fa-clock"></i>   {deliveryTime} phút</h3>
                    </div>
                    {cart.products.map((product) => (

                      <OrderDishItem product={product} />
                    ))}
                  </div>
                </div>
                <div class="Nivkv-">
                  <div class="ULZMSb">
                    <div class="z10ZuQ">Tổng số tiền ({productsCount} sản phẩm):</div>
                    <div class="_9F3E9v">{totalPrice}₫</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="DS2ZYY">
            <div class="DQ7t9K">
              <h2 class="a11y-visually-hidden">Phương thức thanh toán</h2>
              <div>
                <div
                  class="checkout-payment-method-view__current checkout-payment-setting"
                >
                  <div class="checkout-payment-method-view__current-title">
                    Phương thức thanh toán
                  </div>
                  <div class="checkout-payment-setting__payment-methods-tab">
                    <div role="radiogroup">
                      <span
                      ><button
                        class="product-variation"
                        tabindex="0"
                        role="radio"
                        aria-label="Thẻ Tín dụng/Ghi nợ"
                        aria-disabled="false"
                        aria-checked="false"
                      >
                          Thanh toán trực tuyến
                        </button></span>
                      <span><button
                        class="product-variation"
                        tabindex="0"
                        role="radio"
                        aria-label="Thanh toán khi nhận hàng"
                        aria-disabled="false"
                        aria-checked="false"
                      >
                        Thanh toán khi nhận hàng
                      </button></span>
                    </div>
                    <div aria-live="polite"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="KQyCj0" aria-live="polite">
              <h2 class="a11y-visually-hidden">Tổng thanh toán:</h2>
              <h3 class="Tc17Ac XIEGGF BcITa9">Tổng tiền hàng</h3>
              <div class="Tc17Ac mCEcIy BcITa9">{totalPrice}₫</div>
              <h3 class="Tc17Ac XIEGGF RY9Grr">Phí vận chuyển ({distance}km)</h3>
              <div class="Tc17Ac mCEcIy RY9Grr">{shipFee}₫</div>
              <h3 class="Tc17Ac XIEGGF n3vdfL">Tổng thanh toán:</h3>
              <div class="Tc17Ac kC0GSn mCEcIy n3vdfL">{totalPayment}₫</div>
              <div class="uTFqRt">
                <div class="k4VpYA">
                  <div class="C-NSr-">
                    Nhấn "Đặt hàng" đồng nghĩa với việc bạn đồng ý tuân theo
                    <a
                      // href="https://help.shopee.vn/portal/article/77242"
                      target="_blank"
                      rel="noopener noreferrer"
                    > Điều khoản FALTH</a>
                  </div>
                </div>
                <button
                  class="stardust-button stardust-button--primary stardust-button--large apLZEG N7Du4X"
                  onClick={handleOrder}
                >
                  Đặt hàng
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModalAddress && (
        <PickAddress show={showModalAddress} handleClose={closeModalAddress} user={user} selectedContact={selectedContact} setSelectedContact={setSelectedContact}/>
      )}
      {isLoading && (<LoadingModal/>)}

    </div>
  )
}
export default OrderPage;