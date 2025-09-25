import { useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../useLocalStorage';
import { AuthUser } from '@/types';
import AuthContext from '../context/AuthContext';
import axios from 'axios';

const userKeyName = 'coffee-shop-auth-user';

type AuthProviderProps = {
  children: JSX.Element | JSX.Element[];
};

axios.defaults.withCredentials = true;

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useLocalStorage<AuthUser>(userKeyName, null);
  // Router
  const navigate = useNavigate();

  const login = useCallback(
    async (data: AuthUser, redirectUrl?: string) => {
      setUser(data);
      navigate(redirectUrl || '/', { replace: true });
    },
    [navigate, setUser]
  );

  const logout = useCallback(() => {
    setUser(null);
    navigate('/login', { replace: true });
  }, [navigate, setUser]);

  // Event Listener for localstorage changes
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onStorageUpdate = (e: any) => {
      const { key, newValue } = e;

      if (key === null) {
        logout();
      }

      if (key === userKeyName) {
        if (!newValue) {
          logout();
        }
        const objVal = JSON.parse(newValue as string) as AuthUser | null;
        if (objVal?.id) {
          login(objVal);
        }
      }
    };

    window.addEventListener('storage', onStorageUpdate);
    return () => {
      window.removeEventListener('storage', onStorageUpdate);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [login, logout, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
