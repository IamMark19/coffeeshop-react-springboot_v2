import * as React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ChartCard from "./ChartCard";
import { getSalesData } from "@/service/admin";

export default function SalesTab() {
  const [salesData, setSalesData] = React.useState({
    summary: { totalRevenue: 0, totalOrders: 0, averageOrderValue: 0 },
    trends: [],
  });

  React.useEffect(() => {
    const fetchSalesData = async () => {
      const data = await getSalesData();
      setSalesData(data);
    };
    fetchSalesData();
  }, []);

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${salesData.summary.totalRevenue.toLocaleString()}
            </div>
          </CardContent>
        </Card>
      <Card>
        <CardHeader>
          <CardTitle>Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              +{salesData.summary.totalOrders.toLocaleString()}
            </div>
          </CardContent>
        </Card>
      <Card>
        <CardHeader>
          <CardTitle>Average Order Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${salesData.summary.averageOrderValue.toFixed(2)}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="mt-8">
        <ChartCard
          title="Revenue Trends"
          data={salesData.trends}
          dataKey="total"
          color="#006241"
        />
      </div>
    </div>
  );
}
