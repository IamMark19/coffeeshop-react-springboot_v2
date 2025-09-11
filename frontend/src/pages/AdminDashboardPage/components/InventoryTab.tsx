import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import StockAdjustmentModal from "./StockAdjustmentModal";
import { getInventory } from "@/service/admin";

export default function InventoryTab() {
  const [inventory, setInventory] = React.useState([]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState(null);

  React.useEffect(() => {
    const fetchInventory = async () => {
      const data = await getInventory();
      setInventory(data);
    };
    fetchInventory();
  }, []);

  const handleAdjustStock = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inventory.map((item) => (
            <TableRow key={item.product}>
              <TableCell>{item.product}</TableCell>
              <TableCell>{item.stock}</TableCell>
              <TableCell>
                {item.stock < 5 ? (
                  <Badge variant="destructive">Low Stock</Badge>
                ) : (
                  <Badge>In Stock</Badge>
                )}
              </TableCell>
              <TableCell>
                <Button variant="outline" size="sm" onClick={() => handleAdjustStock(item)}>
                  Adjust Stock
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <StockAdjustmentModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        product={selectedProduct}
      />
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <ul>
          <li className="border-b py-2">
            <span className="font-semibold">Espresso</span> stock increased by 10.
          </li>
          <li className="border-b py-2">
            <span className="font-semibold">Latte</span> stock decreased by 5.
          </li>
          <li className="border-b py-2">
            <span className="font-semibold">Cappuccino</span> stock increased by 20.
          </li>
        </ul>
      </div>
    </div>
  );
}
