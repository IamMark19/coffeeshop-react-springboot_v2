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

export const login = async (data: LoginRequest): Promise<AuthUser> => {
  const params = new URLSearchParams();
  params.append('username', data.email);
  params.append('password', data.password);

  return api
    .post('/users/login', params, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
    .then((res) => res.data);
};

export const logout = async (): Promise<void> => {
  return api.post('/users/logout').then((res) => res.data);
};