import axios from "axios";

export const createOrder = async order => {
  try {
    const { data } = await axios.post('/api/orders/create', order);
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create order');
  }
};

export const getNewOrderForCurrentUser = async () => {
  try {
    const { data } = await axios.get('/api/orders/newOrderForCurrentUser');
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch order');
  }
};

export const pay = async paymentId => {
  try {
    const { data } = await axios.put('/api/orders/pay', { paymentId });
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Payment failed');
  }
};

export const trackOrderById = async orderId => {
  try {
    const { data } = await axios.get('/api/orders/track/' + orderId);
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to track order');
  }
};

export const getAll = async state => {
  try {
    const { data } = await axios.get(`/api/orders/${state ?? ''}`);
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch orders');
  }
};

export const getAllStatus = async () => {
  try {
    const { data } = await axios.get(`/api/orders/allstatus`);
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch order statuses');
  }
};
    