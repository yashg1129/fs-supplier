import {
  AddBoxOutlined,
  AssessmentOutlined,
  AssignmentReturnOutlined,
  DashboardOutlined,
  Inventory2Outlined,
  LocalShippingOutlined,
  PaymentsOutlined,
  PersonOutlined,
  StorefrontOutlined,
} from "@mui/icons-material";

import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import { NavLink } from "react-router-dom";

const drawerWidth = 250;

const menuItems = [
  {
    label: "Dashboard",
    path: "/supplier/dashboard",
    icon: <DashboardOutlined />,
  },
  {
    label: "Catalogs",
    path: "/supplier/catalogs",
    icon: <StorefrontOutlined />,
  },
  {
    label: "Add Product",
    path: "/supplier/add-product",
    icon: <AddBoxOutlined />,
  },
  {
    label: "Orders",
    path: "/supplier/orders",
    icon: <LocalShippingOutlined />,
  },
  {
    label: "Inventory",
    path: "/supplier/inventory",
    icon: <Inventory2Outlined />,
  },
  {
    label: "Payments",
    path: "/supplier/payments",
    icon: <PaymentsOutlined />,
  },
  {
    label: "Returns",
    path: "/supplier/returns",
    icon: <AssignmentReturnOutlined />,
  },
  {
    label: "Reports",
    path: "/supplier/reports",
    icon: <AssessmentOutlined />,
  },
  {
    label: "Profile",
    path: "/supplier/profile",
    icon: <PersonOutlined />,
  },
];

export default function Sidebar() {
  return (
    <Box
      sx={{
        width: drawerWidth,
        minHeight: "100vh",
        backgroundColor: "#ffffff",
        borderRight: "1px solid #e5e7eb",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1200,
      }}
    >
      <Box sx={{ px: 3, py: 2.5 }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: 800, color: "#9f2089" }}
        >
          Supplier Hub
        </Typography>

        <Typography variant="caption" color="text.secondary">
          Seller Dashboard
        </Typography>
      </Box>

      <Divider />

      <List sx={{ px: 1.5, pt: 2 }}>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.path}
            component={NavLink}
            to={item.path}
            sx={{
              borderRadius: 2,
              mb: 0.5,
              color: "#4b5563",

              "&.active": {
                backgroundColor: "#fce7f7",
                color: "#9f2089",
              },

              "&:hover": {
                backgroundColor: "#f9f5f8",
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 42,
                color: "inherit",
              }}
            >
              {item.icon}
            </ListItemIcon>

            <ListItemText
              primary={item.label}
              slotProps={{
                primary: {
                  sx: {
                    fontWeight: 600,
                    fontSize: 14,
                  },
                },
              }}
            />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}