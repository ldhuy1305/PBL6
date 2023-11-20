import axios from "axios";


//Auth
const loginAPI = (email, password) => {
  return axios.post("https://falth.vercel.app/api/auth/login", { email, password });
}

//Info user

const getUserInfo = async (token) => {
  const decodedToken = JSON.parse(atob(token.split(".")[1]));
  const api = `https://falth.vercel.app/api/user/${decodedToken.id}`

  const response = await axios.get(api, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
}

const getDefaultContact = async (token) => {
  const decodedToken = JSON.parse(atob(token.split(".")[1]));
  const api = `https://falth.vercel.app/api/user/get-default-contact/${decodedToken.id}`
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
    const response = await axios.put(`https://falth.vercel.app/api/user/add-contact/${decodedToken.id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log('Liên hệ đã được thêm', response.data);
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
    const response = await axios.patch(`https://falth.vercel.app/api/user/${decodedToken.id}/contact/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log('Liên hệ đã được chỉnh sửa', response.data);
    return response.data
  } catch (error) {
    console.error('Lỗi khi thêm liên hệ', error);
  }
};

const deleteContact = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    const api = `https://falth.vercel.app/api/user/del-contact/${decodedToken.id}/${id}`
    const response = await axios.delete(api, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log('Liên hệ đã được xóa', response.data);
  } catch (error) {
    console.error('Lỗi khi xóa liên hệ', error);
  }
}

//Info Store
const getStoreById = async (id) => {
  const api = `https://falth.vercel.app/api/store/${id}`
  const response = await axios.get(api);
  return response.data;
}

//Category
const getAllCategory = async () => {
  const api = `https://falth.vercel.app/api/category`
  const response = await axios.get(api);
  return response.data;
}

const getAllCategoryByStoreId = async (id) => {
  const api = `https://falth.vercel.app/api/category/store/${id}`
  const response = await axios.get(api);
  return response.data;
}

//Product
const getProductByStoreId = async (storeId, catName) => {
  const token = localStorage.getItem("token");
  const api = `https://falth.vercel.app/api/product/store/${storeId}?category.catName=${catName}&limit=10`
  const response = await axios.get(api, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
}

//cart

//order

const placeOrder = async (totalPrice, shipCost, coordinates) => {
  const token = localStorage.getItem("token");
  const decodedToken = JSON.parse(atob(token.split(".")[1]));
  const cart = JSON.parse(localStorage.getItem("cart"));

  // Tạo đối tượng dữ liệu để truyền vào API
  const products = cart.products.map((product) => ({
    quantity: product.amount,
    price: product.price,
    product: product._id,
    notes: product.specialRequest
  }));
  console.log(products)
  const orderData = {
    cart: products, // Lấy thông tin giỏ hàng từ đối tượng cart
    coordinates: coordinates,
    totalPrice: totalPrice,
    shipCost: shipCost,
  };
  console.log(orderData)
  try {
    const response = await axios.post(`https://falth.vercel.app/api/order/user/${decodedToken.id}/store/${cart.idStore}`, orderData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log("Order placed successfully:");
    return response.data
  } catch (error) {
    console.error("Error placing order:", error);
  }
}

const getAllOderByUserId = async () => {
  const token = localStorage.getItem("token");
  const decodedToken = JSON.parse(atob(token.split(".")[1]));
  try {
    const response = await axios.get(`https://falth.vercel.app/api/order/user/${decodedToken.id}?fields=status,dateOrdered&sort=-createdAt`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log("Order placed successfully:");
    return response.data
  } catch (error) {
    console.error("Error get order:", error);
  }
}

const viewOrder = async (id) => {
  const token = localStorage.getItem("token");
  const decodedToken = JSON.parse(atob(token.split(".")[1]));
  try {
    const response = await axios.get(`https://falth.vercel.app/api/order/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log("Order placed successfully:");
    return response.data
  } catch (error) {
    console.error("Error get order:", error);
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
  placeOrder,
  getAllOderByUserId, 
  viewOrder
}