import {
  Box,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { SalesData } from "../../types/dashboard.types";

const salesData: SalesData[] = [
  { day: "Mon", sales: 12000 },
  { day: "Tue", sales: 18500 },
  { day: "Wed", sales: 15000 },
  { day: "Thu", sales: 24000 },
  { day: "Fri", sales: 21000 },
  { day: "Sat", sales: 31000 },
  { day: "Sun", sales: 28000 },
];

export default function SalesChart() {
  return (
    <Card
      elevation={0}
      sx={{
        border: "1px solid #e5e7eb",
        borderRadius: 3,
      }}
    >
      <CardContent>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" fontWeight={700}>
            Sales Overview
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Sales performance during the last seven days
          </Typography>
        </Box>

        <Box sx={{ width: "100%", height: 320 }}>
          <ResponsiveContainer>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />

              <XAxis dataKey="day" />

              <YAxis />

              <Tooltip
                formatter={(value) => [
                  `₹${Number(value).toLocaleString("en-IN")}`,
                  "Sales",
                ]}
              />

              <Line
                type="monotone"
                dataKey="sales"
                stroke="#9f2089"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
}