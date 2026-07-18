import {
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import type { Order } from "../../types/dashboard.types";

const orders: Order[] = [
  {
    id: "ORD-1001",
    customerName: "Anjali Sharma",
    productName: "Printed Cotton Kurti",
    amount: 899,
    status: "Pending",
    orderDate: "18 Jul 2026",
  },
  {
    id: "ORD-1002",
    customerName: "Pooja Singh",
    productName: "Women Saree",
    amount: 1299,
    status: "Shipped",
    orderDate: "18 Jul 2026",
  },
  {
    id: "ORD-1003",
    customerName: "Neha Gupta",
    productName: "Handbag Combo",
    amount: 749,
    status: "Delivered",
    orderDate: "17 Jul 2026",
  },
  {
    id: "ORD-1004",
    customerName: "Priya Verma",
    productName: "Women Sandals",
    amount: 599,
    status: "Cancelled",
    orderDate: "17 Jul 2026",
  },
];

function getStatusColor(
  status: Order["status"],
): "warning" | "info" | "success" | "error" {
  switch (status) {
    case "Pending":
      return "warning";
    case "Shipped":
      return "info";
    case "Delivered":
      return "success";
    case "Cancelled":
      return "error";
  }
}

export default function RecentOrders() {
  return (
    <Paper
      elevation={0}
      sx={{
        border: "1px solid #e5e7eb",
        borderRadius: 3,
        overflow: "hidden",
      }}
    >
      <Typography variant="h6" fontWeight={700} sx={{ p: 2.5 }}>
        Recent Orders
      </Typography>

      <TableContainer>
        <Table>
          <TableHead sx={{ backgroundColor: "#f9fafb" }}>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id} hover>
                <TableCell sx={{ fontWeight: 600 }}>
                  {order.id}
                </TableCell>

                <TableCell>{order.customerName}</TableCell>

                <TableCell>{order.productName}</TableCell>

                <TableCell>
                  ₹{order.amount.toLocaleString("en-IN")}
                </TableCell>

                <TableCell>
                  <Chip
                    label={order.status}
                    color={getStatusColor(order.status)}
                    size="small"
                    variant="outlined"
                  />
                </TableCell>

                <TableCell>{order.orderDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}