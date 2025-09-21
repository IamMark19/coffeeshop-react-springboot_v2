import { AuthUser } from '@/types';
import { apiClient } from './apiClient';

export type TLoginPayload = Omit<AuthUser, 'id' | 'image'>;

export async function loginUser(
  payload: TLoginPayload
): Promise<AuthUser | null> {
  try {
    const response = await apiClient.post('/users/login', payload);
    return response.data;
  } catch (err) {
    console.log('Error:: loginUser :', err);
    return null;
  }
}
