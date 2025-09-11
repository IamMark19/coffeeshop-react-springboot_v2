import { useContext } from 'react';
import ShoppingCartContext from './context/ShoppingCartContext';

/**
 * @description Custom hook for accessing the shopping cart context.
 * It provides the shopping cart context value.
 * @returns The shopping cart context.
 * @throws Will throw an error if not used within a ShoppingCartProvider.
 */
export const useShoppingCart = () => {
  const context = useContext(ShoppingCartContext);
  if (!context) {
    throw new Error(
      'useShoppingCart must be used within a ShoppingCartProvider'
    );
  }
  return context;
};
