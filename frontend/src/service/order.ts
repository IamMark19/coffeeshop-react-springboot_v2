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
