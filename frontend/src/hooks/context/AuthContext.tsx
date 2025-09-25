import { AuthUser } from '@/types';
import { createContext } from 'react';

type AuthContextType = {
  user: AuthUser | null;
  loading: boolean;
  login: (user: AuthUser, redirectUrl?: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export default AuthContext;