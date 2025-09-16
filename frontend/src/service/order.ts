import { DeliveryOrder } from '@/types';
import axios from 'axios';

const API_URL = '/api/v1/orders';

export type TAddOrder = Omit<DeliveryOrder, 'id' | 'date' | 'image'>;

export async function addOrder(
  newOrder: TAddOrder
): Promise<DeliveryOrder | null> {
  try {
    const response = await axios.post(API_URL, newOrder);
    return response.data;
  } catch (err) {
    console.log('Error:: addOrder :', err);
    return null;
  }
}

export async function getOrderList(): Promise<DeliveryOrder[]> {
  try {
    const response = await axios.get(API_URL);
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
    const response = await axios.get(`${API_URL}/${orderId}`);
    return response.data;
  } catch (err) {
    console.log('Error:: getOrderById :', err);
    return null;
  }
}
