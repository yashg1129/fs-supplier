export interface DashboardMetric {
  title: string;
  value: string;
  subtitle: string;
  type: "orders" | "sales" | "products" | "returns";
}

export interface Order {
  id: string;
  customerName: string;
  productName: string;
  amount: number;
  status: "Pending" | "Shipped" | "Delivered" | "Cancelled";
  orderDate: string;
}

export interface SalesData {
  day: string;
  sales: number;
}