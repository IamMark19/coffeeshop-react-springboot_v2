import { AuthUser, LoginRequest, RegisterRequest } from '@/types';
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

export const register = async (data: RegisterRequest): Promise<AuthUser> => {
  return api.post('/users/register', data).then((res) => res.data);
};

export const login = async (data: LoginRequest): Promise<{ token: string }> => {
  return api.post('/users/login', data).then((res) => res.data);
};
