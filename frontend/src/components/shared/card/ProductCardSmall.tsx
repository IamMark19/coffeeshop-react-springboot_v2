import { PlusIcon } from '@heroicons/react/24/solid';
import { useShoppingCart } from '@/hooks/useShoppingCart';
import { useModal } from '@/hooks/useModal';
import { classNames, priceWithSign } from '@/utils/helper';
import { ProductCardProps } from './type';

export default function ProductCardSmall({ coffee }: ProductCardProps) {
  // Modal Provider
  const { showProductModal } = useModal();

  const handleClick = () => {
    showProductModal(coffee);
  };

  return (
    <button
      onClick={handleClick}
      className="relative w-full h-56 bg-white hover:bg-primary-50 border rounded-2xl p-2 ease-in"
    >
      <img
        src={coffee.image}
        alt={coffee.name}
        className="w-full h-32 object-cover bg-gray-300 rounded-xl"
      />
      <div className="flex flex-col justify-between h-20 text-left py-1">
        <p className="font-bold text-neutral-800 line-clamp-2">
          {coffee.name}
        </p>
        <p className="font-semibold text-teal-900">
          {priceWithSign(coffee.variants[0].price)}
        </p>
      </div>
      <div className="absolute bottom-2 right-2">
        <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary text-white">
          <PlusIcon className="h-5 w-5" />
        </div>
      </div>
    </button>
  );
}
