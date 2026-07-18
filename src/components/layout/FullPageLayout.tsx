import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function BulkCatalogLayout() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f4f6fb",
      }}
    >
      <Outlet />
    </Box>
  );
}