import axios from 'axios';
import { BASE_URL, ENDPOINTS } from './constants';

export async function createOrder(orderData) {
  const response = await axios.post(
    `${BASE_URL}${ENDPOINTS.orders}`,
    orderData
  );

  return response.data;
}
