import { useState } from 'react';
import BaseModal from '@/components/shared/modal/BaseModal';
import { CoffeeProduct, CoffeeSize } from '@/types';
import Footer from './Footer';
import ProductSizeSwitch from './ProductSizeSwitch';
import ProductInfo from './ProductInfo';
import ProductImage from './ProductImage';

interface ProductDetailModalProps {
  product: CoffeeProduct | null;
  onClose: () => void;
}

export default function ProductDetailModal({
  product,
  onClose,
}: ProductDetailModalProps) {
  const [size, setSize] = useState<CoffeeSize>(CoffeeSize.SMALL);
  return (
    <BaseModal show={!!product} onClose={onClose}>
      {product && (
        <>
          <ProductImage product={product} onClose={onClose} />
          <div className="p-4 pb-8">
            <ProductInfo product={product} />
            <hr className="my-4" />
            <ProductSizeSwitch size={size} onSizeChange={setSize} />
          </div>
          <Footer product={product} size={size} onClose={onClose} />
        </>
      )}
    </BaseModal>
  );
}
