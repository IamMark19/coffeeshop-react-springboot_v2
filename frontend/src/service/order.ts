import { DeliveryOrder } from '@/types';
import api from './api';

export type TAddOrder = Omit<DeliveryOrder, 'id' | 'date' | 'image'>;

export async function addOrder(
  newOrder: TAddOrder
): Promise<DeliveryOrder | null> {
  try {
    const response = await api.post('/orders', newOrder);
    return response.data;
  } catch (err) {
    console.log('Error:: addOrder :', err);
    return null;
  }
}

export async function getOrderList(): Promise<DeliveryOrder[]> {
  try {
    const response = await api.get('/orders');
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
    const response = await api.get(`/orders/${orderId}`);
    return response.data;
  } catch (err) {
    console.log('Error:: getOrderById :', err);
    return null;
  }
}
