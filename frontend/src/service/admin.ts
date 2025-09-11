import axios from "axios";

const API_URL = "/api/v1/admin";

export const getOrders = async () => {
  // Mock data for now
  return [
    {
      orderId: "ORD001",
      customer: "John Doe",
      total: 150.0,
      status: "Delivered",
      date: "2023-10-25",
    },
    {
      orderId: "ORD002",
      customer: "Jane Smith",
      total: 200.5,
      status: "Processing",
      date: "2023-10-26",
    },
  ];
};

export const getSalesData = async () => {
  // Mock data for now
  return {
    summary: {
      totalRevenue: 45231.89,
      totalOrders: 2350,
      averageOrderValue: 19.25,
    },
    trends: [
      { name: "Jan", total: Math.floor(Math.random() * 5000) + 1000 },
      { name: "Feb", total: Math.floor(Math.random() * 5000) + 1000 },
      { name: "Mar", total: Math.floor(Math.random() * 5000) + 1000 },
      { name: "Apr", total: Math.floor(Math.random() * 5000) + 1000 },
      { name: "May", total: Math.floor(Math.random() * 5000) + 1000 },
      { name: "Jun", total: Math.floor(Math.random() * 5000) + 1000 },
      { name: "Jul", total: Math.floor(Math.random() * 5000) + 1000 },
      { name: "Aug", total: Math.floor(Math.random() * 5000) + 1000 },
      { name: "Sep", total: Math.floor(Math.random() * 5000) + 1000 },
      { name: "Oct", total: Math.floor(Math.random() * 5000) + 1000 },
      { name: "Nov", total: Math.floor(Math.random() * 5000) + 1000 },
      { name: "Dec", total: Math.floor(Math.random() * 5000) + 1000 },
    ],
  };
};

export const getInventory = async () => {
  // Mock data for now
  return [
    {
      product: "Espresso",
      stock: 20,
    },
    {
      product: "Latte",
      stock: 3,
    },
    {
      product: "Cappuccino",
      stock: 15,
    },
    {
      product: "Americano",
      stock: 4,
    },
  ];
};
