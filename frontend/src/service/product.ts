import { CoffeeProduct } from '@/types';
import axios from 'axios';

const API_URL = '/api/v1/products';

export async function getAllCoffee(): Promise<CoffeeProduct[]> {
  const response = await axios.get(API_URL);
  return response.data;
}

export async function getCoffeeById(id: string): Promise<CoffeeProduct> {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
}
