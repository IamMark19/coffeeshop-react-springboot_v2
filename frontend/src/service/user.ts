import { AuthUser } from '@/types';
import axios from 'axios';

const API_URL = '/api/v1/users';

export type TLoginPayload = Omit<AuthUser, 'id' | 'image'> & {
  googleId: string;
  idToken: string;   // 👈 add this
};

export async function loginUser(
  payload: TLoginPayload
): Promise<AuthUser | null> {
  try {
    const response = await axios.post(`${API_URL}/login`, payload);
    return response.data;
  } catch (err) {
    console.log('Error:: loginUser :', err);
    return null;
  }
}
