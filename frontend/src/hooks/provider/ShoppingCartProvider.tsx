import React, { ReactNode, useCallback, useMemo, useState } from 'react';
import {
  CartItem,
  CoffeeProduct,
  CoffeeSize,
  DeliOption,
  PaymentMethod,
} from '@/types';
import ShoppingCartContext from '../context/ShoppingCartContext';
import { getSumFromArr } from '@/utils/helper';
import { defaultDeliFee } from '@/constants/constants';

interface ShoppingCartProviderProps {
  children: ReactNode;
}

const ShoppingCartProvider: React.FC<ShoppingCartProviderProps> = ({
  children,
}) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [deliOption, setDeliOption] = useState(DeliOption.DELIVER);
  const [paymentMethod, setPaymentMethod] = useState(PaymentMethod.CASH);

  const itemCount = items.length;
  const subTotal = getSumFromArr(
    items?.map((item) => {
      const variant = item.product.variants.find((v) => v.size === item.size);
      if (variant) {
        return variant.price * item.quantity;
      }
      return 0;
    })
  );
  const deliFee = deliOption === DeliOption.DELIVER ? defaultDeliFee : 0;
  const totalPayment = subTotal + deliFee;

  const addToCart = (
    product: CoffeeProduct,
    quantity: number,
    size: CoffeeSize
  ) => {
    const itemId = `${product.id}-${size}`;
    const existingItem = items.find((item) => item.id === itemId);

    if (!existingItem) {
      const newItem: CartItem = {
        id: itemId,
        product,
        quantity,
        size,
      };
      setItems((prevCart) => [...prevCart, newItem]);
    } else {
      updateQuantity(itemId, existingItem.quantity + quantity);
    }
  };

  const updateQuantity = (itemId: string, newQuantity: number) => {
    setItems((prevCart) =>
      prevCart.map((item) => {
        if (item.id === itemId) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const removeFromCart = (itemId: string) => {
    setItems((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  const updateDeliOption = useCallback((value: DeliOption) => {
    setDeliOption(value);
  }, []);

  const updatePaymentMethod = useCallback((value: PaymentMethod) => {
    setPaymentMethod(value);
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const value = useMemo(
    () => ({
      items,
      itemCount,
      addToCart,
      updateQuantity,
      removeFromCart,
      deliOption,
      updateDeliOption,
      subTotal,
      deliFee,
      totalPayment,
      paymentMethod,
      updatePaymentMethod,
      clearCart,
    }),
    [items, deliOption, paymentMethod]
  );

  return (
    <ShoppingCartContext.Provider value={value}>
      {children}
    </ShoppingCartContext.Provider>
  );
};

export default ShoppingCartProvider;
