import { useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../useLocalStorage';
import { AuthUser } from '@/types';
import AuthContext from '../context/AuthContext';

const userKeyName = 'coffee-shop-auth-user';
const tokenKeyName = 'coffee-shop-auth-token';

type AuthProviderProps = {
  children: JSX.Element | JSX.Element[];
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useLocalStorage<AuthUser>(userKeyName, null);
  const [token, setToken] = useLocalStorage<string>(tokenKeyName, null);
  // Router
  const navigate = useNavigate();

  const login = useCallback(
    async (data: AuthUser, accessToken: string, redirectUrl?: string) => {
      setUser(data);
      setToken(accessToken);
      navigate(redirectUrl || '/', { replace: true });
    },
    [navigate, setUser, setToken]
  );

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    navigate('/login', { replace: true });
  }, [navigate, setUser, setToken]);

  // Event Listener for localstorage changes
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onStorageUpdate = (e: any) => {
      const { key, newValue } = e;

      if (key === null) {
        logout();
      }

      if (key === keyName) {
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
