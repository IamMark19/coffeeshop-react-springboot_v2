import { DeliveryOrder } from '@/types';
import axios from 'axios';

const API_URL = '/api/v1/orders';
const tokenKeyName = 'coffee-shop-auth-token';

export type TAddOrder = Omit<DeliveryOrder, 'id' | 'date' | 'image'>;

const getAuthHeaders = () => {
    const token = localStorage.getItem(tokenKeyName);
    if (token) {
        // The token from localStorage is a string with quotes, so we need to remove them
        const parsedToken = JSON.parse(token);
        return {
            headers: {
                Authorization: `Bearer ${parsedToken}`,
            },
        };
    }
    return {};
};

export async function addOrder(
  newOrder: TAddOrder
): Promise<DeliveryOrder | null> {
  try {
    const response = await axios.post(API_URL, newOrder, getAuthHeaders());
    return response.data;
  } catch (err) {
    console.log('Error:: addOrder :', err);
    return null;
  }
}

export async function getOrderList(): Promise<DeliveryOrder[]> {
  try {
    const response = await axios.get(API_URL, getAuthHeaders());
    return response.data;
  } catch (err) {
    console.log('Error:: getOrderList :', err);
    return [];
  }
}

export async function getOrderById(
  orderId: string
): Promise<DeliveryOrder | null> {
  try {
    const response = await axios.get(`${API_URL}/${orderId}`, getAuthHeaders());
    return response.data;
  } catch (err) {
    console.log('Error:: getOrderById :', err);
    return null;
  }
}
