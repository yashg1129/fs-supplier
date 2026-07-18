import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  AppBar,
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Select,
  Stack,
  Tab,
  Tabs,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  HeadsetMicOutlined,
  MenuBookOutlined,
  PlayCircleFilled,
  Search,
} from "@mui/icons-material";

const statusTabs = [
  "All",
  "Action Required (0)",
  "QC in Progress (0)",
  "QC Error (0)",
  "QC Pass (0)",
];

type OverviewCardProps = {
  label: string;
  value: number;
};

function OverviewCard({ label, value }: OverviewCardProps) {
  return (
    <Box
      sx={{
        flex: "1 1 220px",
        minWidth: 0,
        minHeight: 92,
        p: 2.4,
        borderRight: {
          xs: 0,
          sm: "1px solid #dde2ec",
        },
        borderBottom: {
          xs: "1px solid #dde2ec",
          sm: 0,
        },
        "&:last-of-type": {
          borderRight: 0,
          borderBottom: 0,
        },
      }}
    >
      <Typography sx={{ color: "#8992a5", mb: 1 }}>
        {label}
      </Typography>

      <Typography sx={{ fontSize: 26, fontWeight: 700 }}>
        {value}
      </Typography>
    </Box>
  );
}

export default function CatalogUploadsPage() {
  const [uploadType, setUploadType] = useState(0);
  const [statusTab, setStatusTab] = useState(0);
  const [category, setCategory] = useState("");
  const navigation = useNavigate();

  return (
    <Box
      component="section"
      sx={{
        width: "100%",
        minWidth: 0,
        minHeight: "100%",
        bgcolor: "#ffffff",
        overflowX: "hidden",
      }}
    >
      <AppBar
        position="static"
        elevation={0}
        sx={{
          width: "100%",
          bgcolor: "#ffffff",
          color: "#151b2b",
          borderBottom: "1px solid #edf0f5",
        }}
      >
        <Toolbar
          sx={{
            minHeight: "76px !important",
            px: { xs: 2, md: 3 },
            gap: 1.5,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              flexGrow: 1,
              minWidth: 0,
              fontWeight: 800,
            }}
          >
            Upload Catalog
          </Typography>

          <Button
            startIcon={<PlayCircleFilled sx={{ color: "#ff4040" }} />}
            sx={{
              display: { xs: "none", md: "inline-flex" },
              color: "#344054",
              textTransform: "none",
              fontWeight: 600,
              whiteSpace: "nowrap",
            }}
          >
            Learn how to upload catalogs
          </Button>

          <Button
            variant="outlined"
            startIcon={<HeadsetMicOutlined />}
            sx={{
              borderColor: "#ded8ff",
              color: "#4930dc",
              textTransform: "none",
              borderRadius: 2,
              px: 2,
              whiteSpace: "nowrap",
            }}
          >
            Need Help?
          </Button>
        </Toolbar>
      </AppBar>

      <Paper
        elevation={0}
        square
        sx={{
          width: "100%",
          p: { xs: 2, md: 2.5 },
          minHeight: 132,
          display: "flex",
          alignItems: "center",
          gap: { xs: 1.5, md: 3 },
          background:
            "linear-gradient(100deg, #fff0c8 0%, #ffe8e6 100%)",
        }}
      >
        <Box
          aria-hidden="true"
          sx={{
            flexShrink: 0,
            width: { xs: 64, md: 105 },
            height: 78,
            display: "grid",
            placeItems: "center",
            fontSize: { xs: 40, md: 54 },
          }}
        >
          📚
        </Box>

        <Box sx={{ minWidth: 0 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              mb: 0.8,
              fontSize: { xs: 20, md: 24 },
            }}
          >
            Books will undergo verification before going live
          </Typography>

          <Typography
            sx={{
              color: "#4b5565",
              fontSize: { xs: 15, md: 17 },
            }}
          >
            All Books category catalogs will be verified to ensure quality and
            trust, with an expected go-live time of approx. 1 week.
          </Typography>
        </Box>
      </Paper>

      <Box
        sx={{
          width: "100%",
          height: 45,
          bgcolor: "#f1f4fa",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 0.5,
        }}
      >
        <Box
          sx={{
            width: 11,
            height: 5,
            borderRadius: 4,
            bgcolor: "#dce1ea",
          }}
        />
        <Box
          sx={{
            width: 16,
            height: 5,
            borderRadius: 4,
            bgcolor: "#4a2ec4",
          }}
        />
      </Box>

      <Box sx={{ width: "100%", px: { xs: 2, md: 3 }, pt: 2 }}>
        <Typography sx={{ color: "#536071", mb: 1.5 }}>
          Have unique products to sell? Choose from the options below
        </Typography>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{ mb: 3.5 }}
        >
          <Button
            onClick={() => navigation("/supplier/bulk-catalog-uploads")}
            variant="contained"
            size="large"
            sx={{
              bgcolor: "#4930c3",
              textTransform: "none",
              fontSize: 18,
              fontWeight: 700,
              px: 2.8,
              py: 1.2,
              boxShadow: "none",
              "&:hover": {
                bgcolor: "#3d27ab",
                boxShadow: "none",
              },
            }}
          >
            Add Catalog in Bulk
          </Button>

          <Button
            variant="outlined"
            size="large"
            sx={{
              borderColor: "#4930c3",
              color: "#4930c3",
              textTransform: "none",
              fontSize: 18,
              fontWeight: 600,
              px: 2.8,
              py: 1.2,
            }}
          >
            Add Single Catalog
          </Button>
        </Stack>

        <Typography sx={{ fontWeight: 700, mb: 1.3 }}>
          Overview
        </Typography>

        <Paper
          variant="outlined"
          sx={{
            width: "100%",
            maxWidth: 760,
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            mb: 3.2,
            borderColor: "#dde2ec",
            overflow: "hidden",
          }}
        >
          <OverviewCard label="Total Uploads Done" value={1} />
          <OverviewCard label="Using Bulk Uploads" value={0} />
          <OverviewCard label="Using Single Uploads" value={1} />
        </Paper>
      </Box>

      <Box sx={{ width: "100%", bgcolor: "#f4f6fb", pt: 1.5 }}>
        <Box sx={{ width: "100%", bgcolor: "#ffffff" }}>
          <Tabs
            value={uploadType}
            onChange={(_, value: number) => setUploadType(value)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              px: { xs: 1, md: 2 },
              minHeight: 58,
              borderBottom: "1px solid #dde2ec",
              "& .MuiTab-root": {
                minHeight: 58,
                textTransform: "none",
                fontSize: 18,
                color: "#334155",
              },
              "& .Mui-selected": {
                color: "#4328c5 !important",
                fontWeight: 700,
              },
              "& .MuiTabs-indicator": {
                bgcolor: "#4328c5",
                height: 3,
              },
            }}
          >
            <Tab label="Bulk Uploads (0)" />
            <Tab label="Single Uploads (1)" />
          </Tabs>

          <Tabs
            value={statusTab}
            onChange={(_, value: number) => setStatusTab(value)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              px: { xs: 1, md: 2.5 },
              minHeight: 67,
              borderBottom: "1px solid #e3e7ef",
              "& .MuiTab-root": {
                minHeight: 67,
                textTransform: "none",
                fontSize: 16,
                color: "#455063",
              },
              "& .Mui-selected": {
                color: "#4328c5 !important",
              },
              "& .MuiTabs-indicator": {
                bgcolor: "#4328c5",
              },
            }}
          >
            {statusTabs.map((label) => (
              <Tab key={label} label={label} />
            ))}
          </Tabs>

          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            sx={{
              width: "100%",
              px: { xs: 2, md: 2.5 },
              py: 1.3,
              borderBottom: "1px solid #edf0f5",
              justifyContent: "space-between",
              alignItems: {
                xs: "stretch",
                md: "center",
              },
            }}
          >
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1}
              sx={{
                alignItems: {
                  xs: "stretch",
                  sm: "center",
                },
              }}
            >
              <Typography sx={{ fontWeight: 600 }}>
                Filter by:
              </Typography>

              <FormControl size="small" sx={{ minWidth: 200 }}>
                <Select
                  value={category}
                  displayEmpty
                  onChange={(event) => setCategory(event.target.value)}
                  sx={{
                    bgcolor: "#ffffff",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#cfd6e2",
                    },
                  }}
                >
                  <MenuItem value="">Select Category</MenuItem>
                  <MenuItem value="books">Books</MenuItem>
                  <MenuItem value="fashion">Fashion</MenuItem>
                  <MenuItem value="electronics">Electronics</MenuItem>
                </Select>
              </FormControl>
            </Stack>

            <TextField
              size="small"
              placeholder="Search By File Id"
              sx={{
                width: { xs: "100%", md: 340 },
                "& .MuiOutlinedInput-root": {
                  bgcolor: "#ffffff",
                },
              }}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton size="small" aria-label="search uploads">
                        <Search />
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Stack>

          <Box
            sx={{
              mx: { xs: 2, md: 2.5 },
              mt: 1.5,
              p: 1.3,
              border: "1px solid #f1c848",
              bgcolor: "#fff8d8",
              borderRadius: 1,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography sx={{ fontSize: 20 }}>💡</Typography>
            <Typography sx={{ color: "#4c4c3f" }}>
              QC error products can now be fixed directly. Review errors and
              update your catalog to complete the upload process.
            </Typography>
          </Box>

          <Box
            sx={{
              minHeight: 180,
              display: "grid",
              placeItems: "center",
              color: "#7c8798",
            }}
          >
            <Box sx={{ textAlign: "center" }}>
              <MenuBookOutlined sx={{ fontSize: 48, mb: 1 }} />
              <Typography sx={{ fontWeight: 600 }}>
                No bulk uploads available
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}