import { getOrderList } from '@/service/order';
import { useEffect, useState } from 'react';

export function useOrderCount() {
  const [orderCount, setOrderCount] = useState(0);

  useEffect(() => {
    async function fetchOrderCount() {
      const orders = await getOrderList();
      setOrderCount(orders.length);
    }

    fetchOrderCount();
  }, []);

  return orderCount;
}
