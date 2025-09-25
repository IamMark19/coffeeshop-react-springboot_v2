import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthUser } from '@/types';
import AuthContext from '../context/AuthContext';
import axios from 'axios';
import { getMe, logout as logoutUser } from '@/service/user';

type AuthProviderProps = {
  children: JSX.Element | JSX.Element[];
};

axios.defaults.withCredentials = true;

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  // Router
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getMe();
      if (currentUser) {
        setUser(currentUser);
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  const login = useCallback(
    async (data: AuthUser, redirectUrl?: string) => {
      setUser(data);
      navigate(redirectUrl || '/', { replace: true });
    },
    [navigate, setUser]
  );

  const logout = useCallback(async () => {
    await logoutUser();
    setUser(null);
    navigate('/login', { replace: true });
  }, [navigate, setUser]);

  const value = useMemo(
    () => ({
      user,
      loading,
      login,
      logout,
    }),
    [login, logout, user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;