import React from 'react';
import CounterInputSm from '@/components/shared/CounterInputSm';
import { CartItem } from '@/types';
import { priceWithSign } from '@/utils/helper';
import { useShoppingCart } from '@/hooks/useShoppingCart';

interface CartItemCardProps {
  cartItem: CartItem;
}

const CartItemCard: React.FC<CartItemCardProps> = ({ cartItem }) => {
  // Shopping Cart
  const { updateQuantity, removeFromCart } = useShoppingCart();
  // Local Variable
  const { id, product, quantity, size } = cartItem;
  const totalAmount = product.prices[size] * quantity;

  const handleQuantityChange = (value: number) => {
    if (value >= 1) {
      updateQuantity(id, value);
    } else {
      removeFromCart(id);
    }
  };

  return (
    <div className="flex justify-between">
      <div className="flex gap-2">
        <img
          src={product.image}
          className="w-16 h-16 bg-gray-100 object-cover rounded-lg"
          alt={product.displayName}
        />
        <div className="flex flex-col justify-between">
          <div className="flex flex-col">
            <p className="text-primary-700 font-semibold ">
              {product.displayName}
            </p>
            <p className="text-gray-400 text-xs capitalize">{size}</p>
          </div>
          <CounterInputSm value={quantity} onChange={handleQuantityChange} />
        </div>
      </div>
      <div className="text-right">
        <p className="text-primary font-semibold">
          {priceWithSign(totalAmount)}
        </p>
        {quantity > 1 && (
          <span className="text-gray-400 text-xs">{`${priceWithSign(
            product.prices[size]
          )} each`}</span>
        )}
      </div>
    </div>
  );
};

export default CartItemCard;
