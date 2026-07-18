import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import MetricCard from "../components/dashboard/MetricCard";
import RecentOrders from "../components/dashboard/RecentOrders";
import SalesChart from "../components/dashboard/SalesChart";

import type { DashboardMetric } from "../types/dashboard.types";

const metrics: DashboardMetric[] = [
  {
    title: "Total Orders",
    value: "1,248",
    subtitle: "+12.5% from last month",
    type: "orders",
  },
  {
    title: "Total Sales",
    value: "₹2,84,650",
    subtitle: "+18.2% from last month",
    type: "sales",
  },
  {
    title: "Active Products",
    value: "486",
    subtitle: "24 products low in stock",
    type: "products",
  },
  {
    title: "Returns",
    value: "32",
    subtitle: "2.6% return rate",
    type: "returns",
  },
];

export default function DashboardPage() {
  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>
          Dashboard
        </Typography>

        <Typography color="text.secondary">
          Here is an overview of your supplier business.
        </Typography>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            lg: "repeat(4, 1fr)",
          },
          gap: 3,
          mb: 3,
        }}
      >
        {metrics.map((metric) => (
          <MetricCard key={metric.title} metric={metric} />
        ))}
      </Box>

      <Box sx={{ mb: 3 }}>
        <SalesChart />
      </Box>

      <RecentOrders />
    </Box>
  );
}