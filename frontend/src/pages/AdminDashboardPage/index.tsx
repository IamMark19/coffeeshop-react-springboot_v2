import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import OrdersTab from "./components/OrdersTab";
import SalesTab from "./components/SalesTab";
import InventoryTab from "./components/InventoryTab";

export default function AdminDashboardPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <Tabs defaultValue="orders">
        <TabsList>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
        </TabsList>
        <TabsContent value="orders">
          <OrdersTab />
        </TabsContent>
        <TabsContent value="sales">
          <SalesTab />
        </TabsContent>
        <TabsContent value="inventory">
          <InventoryTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
