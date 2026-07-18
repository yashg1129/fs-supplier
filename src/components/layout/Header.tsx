import {
  AccountCircleOutlined,
  NotificationsNoneOutlined,
  SearchOutlined,
} from "@mui/icons-material";

import {
  AppBar,
  Avatar,
  Badge,
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";

const drawerWidth = 250;

export default function Header() {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        width: `calc(100% - ${drawerWidth}px)`,
        ml: `${drawerWidth}px`,
        backgroundColor: "#ffffff",
        color: "#111827",
        borderBottom: "1px solid #e5e7eb",
      }}
    >
      <Toolbar
        sx={{
          minHeight: "72px !important",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography variant="h6" fontWeight={700}>
            Welcome, Supplier
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Manage your business and track your performance
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <TextField
            size="small"
            placeholder="Search orders or products"
            sx={{
              width: 280,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                backgroundColor: "#f9fafb",
              },
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchOutlined fontSize="small" />
                  </InputAdornment>
                ),
              },
            }}
          />

          <IconButton>
            <Badge badgeContent={3} color="error">
              <NotificationsNoneOutlined />
            </Badge>
          </IconButton>

          <Avatar sx={{ backgroundColor: "#9f2089" }}>
            <AccountCircleOutlined />
          </Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
}