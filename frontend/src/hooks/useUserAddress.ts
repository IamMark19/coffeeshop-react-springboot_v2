import { useContext } from 'react';
import UserAddressContext from './context/UserAddressContext';

/**
 * @description Custom hook for accessing the user address context.
 * It provides the user address context value.
 * @returns The user address context.
 * @throws Will throw an error if not used within a UserAddressProvider.
 */
export const useUserAddress = () => {
  const context = useContext(UserAddressContext);
  if (!context) {
    throw new Error('useUserAddress must be used within a UserAddressContext');
  }
  return context;
};
