import {
  AssignmentReturnOutlined,
  CurrencyRupeeOutlined,
  Inventory2Outlined,
  ShoppingBagOutlined,
} from "@mui/icons-material";

import { Box, Card, CardContent, Typography } from "@mui/material";

import type { DashboardMetric } from "../../types/dashboard.types";

interface MetricCardProps {
  metric: DashboardMetric;
}

const icons = {
  orders: <ShoppingBagOutlined />,
  sales: <CurrencyRupeeOutlined />,
  products: <Inventory2Outlined />,
  returns: <AssignmentReturnOutlined />,
};

export default function MetricCard({ metric }: MetricCardProps) {
  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        border: "1px solid #e5e7eb",
        borderRadius: 3,
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Box>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontWeight: 600 }}
            >
              {metric.title}
            </Typography>

            <Typography variant="h4" sx={{ fontWeight: 800, my: 1 }}>
              {metric.value}
            </Typography>

            <Typography variant="caption" color="success.main">
              {metric.subtitle}
            </Typography>
          </Box>

          <Box
            sx={{
              width: 46,
              height: 46,
              borderRadius: 2,
              backgroundColor: "#fce7f7",
              color: "#9f2089",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {icons[metric.type]}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}