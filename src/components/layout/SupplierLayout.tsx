import { Box, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";

import Header from "./Header";
import Sidebar from "./Sidebar";

const drawerWidth = 250;

export default function SupplierLayout() {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <Header />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: `${drawerWidth}px`,
          backgroundColor: "#f7f7f9",
          minHeight: "100vh",
          p: 3,
        }}
      >
        <Toolbar sx={{ minHeight: "72px !important" }} />
        <Outlet />
      </Box>
    </Box>
  );
}