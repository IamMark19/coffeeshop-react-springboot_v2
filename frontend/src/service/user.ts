import { AuthUser } from '@/types';
import api from './api';

export async function getMe(): Promise<AuthUser | null> {
  try {
    const response = await api.get('/users/me');
    return response.data;
  } catch (err) {
    console.log('Error:: getMe :', err);
    return null;
  }
}
