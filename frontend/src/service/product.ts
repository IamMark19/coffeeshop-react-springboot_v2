import { CoffeeProduct } from '@/types';
import axios from 'axios';

const API_URL = '/api/v1/products';

export async function getAllCoffee(): Promise<CoffeeProduct[]> {
  try {
    const response = await axios.get(API_URL);
    if (Array.isArray(response.data)) {
      return response.data;
    } else if (response.data && Array.isArray(response.data.data)) {
      return response.data.data;
    } else {
      console.error("Unexpected API response structure for getAllCoffee:", response.data);
      return [];
    }
  } catch (error) {
    console.error("Error fetching coffee list:", error);
    return [];
  }
}

export async function getCoffeeById(id: string): Promise<CoffeeProduct> {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
}
