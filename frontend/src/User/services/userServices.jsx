import axios from "axios";
const moment = require('moment');

//Auth
const loginAPI = (email, password) => {
  return axios.post("https://falth-api.vercel.app/api/auth/login", { email, password });
}

//Info user

const getUserInfo = async (token) => {
  const decodedToken = JSON.parse(atob(token.split(".")[1]));
  const api = `https://falth-api.vercel.app/api/user/${decodedToken.id}`

  const response = await axios.get(api, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
}

const getDefaultContact = async (token) => {
  const decodedToken = JSON.parse(atob(token.split(".")[1]));
  const api = `https://falth-api.vercel.app/api/user/get-default-contact/${decodedToken.id}`
  const response = await axios.get(api, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
}

const addContact = async (e, formData) => {
  e.preventDefault();
  try {
    const token = localStorage.getItem("token");
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    const response = await axios.put(`https://falth-api.vercel.app/api/user/add-contact/${decodedToken.id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data
  } catch (error) {
    console.error('Lỗi khi thêm liên hệ', error);
  }
};

const updateContact = async (e, formData, id) => {
  e.preventDefault();
  try {
    const token = localStorage.getItem("token");
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    const response = await axios.patch(`https://falth-api.vercel.app/api/user/${decodedToken.id}/contact/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data
  } catch (error) {
    console.error('Lỗi khi thêm liên hệ', error);
  }
};

const deleteContact = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    const api = `https://falth-api.vercel.app/api/user/del-contact/${decodedToken.id}/${id}`
    const response = await axios.delete(api, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  } catch (error) {
    console.error('Lỗi khi xóa liên hệ', error);
  }
}

//Info Store
const getStoreById = async (id) => {
  const api = `https://falth-api.vercel.app/api/store/${id}`
  const response = await axios.get(api);
  return response.data;
}

//Category
const getAllCategory = async () => {
  const api = `https://falth-api.vercel.app/api/category`
  const response = await axios.get(api);
  return response.data;
}

const getAllCategoryByStoreId = async (id) => {
  const api = `https://falth-api.vercel.app/api/category/store/${id}`
  const response = await axios.get(api);
  return response.data;
}

//Product
const getProductByStoreId = async (storeId, catName) => {
  const token = localStorage.getItem("token");
  const api = `https://falth-api.vercel.app/api/product/store/${storeId}?category.catName=${catName}&limit=10`
  const response = await axios.get(api, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
}

//cart
const getFeeShip = async (idStore) => {
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  const userData = JSON.parse(user);
  try {
    const response = await axios.get(`https://falth-api.vercel.app/api/user/${userData._id}/store/${idStore}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  } catch (error) {
    console.log('Lỗi khi lấy thông tin phí ship: ', error)
  }
}

//order

const placeOrder = async (totalPrice, shipCost, coordinates) => {
  const token = localStorage.getItem("token");
  const decodedToken = JSON.parse(atob(token.split(".")[1]));
  const cart = JSON.parse(localStorage.getItem("cart"));

  const products = cart.products.map((product) => ({
    quantity: product.amount,
    price: product.price,
    product: product._id,
    notes: product.specialRequest
  }));
  const orderData = {
    cart: products, 
    coordinates: coordinates,
    totalPrice: totalPrice,
    shipCost: shipCost,
  };
  try {
    const response = await axios.post(`https://falth-api.vercel.app/api/order/user/${decodedToken.id}/store/${cart.idStore}`, orderData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data
  } catch (error) {
    console.error("Error placing order:", error);
  }
}

const getAllOderByUserId = async () => {
  const token = localStorage.getItem("token");
  const decodedToken = JSON.parse(atob(token.split(".")[1]));
  const startDate = moment().subtract(1, 'months').format("DD-MM-YYYY");
  const endDate = moment().format("DD-MM-YYYY");
  try {
    const response = await axios.get(`https://falth-api.vercel.app/api/order/user/${decodedToken.id}?sort=-createdAt&start=${startDate}&end=${endDate}&fields=status,dateOrdered,totalPrice`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data
  } catch (error) {
    console.error("Error get order:", error);
  }
}

const getOderByFilter = async (fromDate, toDate, status) => {
  if (status === 'All') {
    status = ''
  }
  const token = localStorage.getItem("token");
  const decodedToken = JSON.parse(atob(token.split(".")[1]));
  const api = `https://falth-api.vercel.app/api/order/user/${decodedToken.id}?status=${status}&fields=status,dateOrdered,totalPrice&sort=-createdAt&limit=10&page=1&start=${fromDate}&end=${toDate}`
  try {
    const response = await axios.get(api, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data
  } catch (error) {
    console.error("Error get order:", error);
  }
}

const viewOrder = async (id) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(`https://falth-api.vercel.app/api/order/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data
  } catch (error) {
    console.error("Error get order:", error);
  }
}

const createPayment = async (query) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(`https://falth-api.vercel.app/api/order/after-checkout/payment?${query}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data
  } catch (error) {
    console.error("Error:", error);
  }
}

//Rating 
const getRatingOfStore = async (storeId) => {
  try {
    const response = await axios.get(`https://falth-api.vercel.app/api/store/${storeId}/rating`);
    return response.data
  } catch (error) {
    console.error("Error:", error);
  }
}

const addRatingForStore = async (id, ratingData) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.post(`https://falth-api.vercel.app/api/store/${id}/rating`, ratingData, {
      headers: {
        Authorization: `Bearer ${token}`,
        ContentType: 'multipart/form-data',
      }
    });
    return response.data
  } catch (error) {
    console.log('đánh giá thất bại:', error)
  }
}

const deleteRating = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const api = `https://falth-api.vercel.app/api/rating/${id}`
    const response = await axios.delete(api, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log('Xóa thành công');
    return response.data
  } catch (error) {
    console.error('Lỗi khi xóa đánh giá', error);
  }
}

export {
  loginAPI,
  getUserInfo,
  addContact,
  deleteContact,
  getStoreById,
  getDefaultContact,
  getAllCategory,
  getAllCategoryByStoreId,
  updateContact,
  getProductByStoreId,
  getFeeShip,
  placeOrder,
  getAllOderByUserId,
  viewOrder,
  createPayment,
  getOderByFilter,
  getRatingOfStore,
  addRatingForStore, 
  deleteRating
}