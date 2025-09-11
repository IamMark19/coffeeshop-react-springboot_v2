import { useContext } from 'react';
import ProductContext from './context/ProductContext';

/**
 * @description Custom hook for accessing product-related context.
 * It provides the product context value.
 * @returns The product context.
 * @throws Will throw an error if not used within a ProductProvider.
 */
export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProduct must be used within a ProductContext');
  }
  return context;
};
