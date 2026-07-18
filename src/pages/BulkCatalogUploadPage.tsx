import { useMemo, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  ArrowBackIosNew,
  HeadsetMicOutlined,
  PlayCircleFilled,
  Search,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

type CategoryColumnProps = {
  items: string[];
  selectedItem?: string;
  onSelect: (item: string) => void;
  width?: number;
};

const primaryCategories = [
  "Men Fashion",
  "Women Fashion",
  "Home & Living",
  "Kids & Toys",
  "Personal Care & Wellness",
  "Mobiles & Tablets",
  "Consumer Electronics",
];

const womenCategories = [
  "Ethnic Wear",
  "Western Wear",
  "Accessories",
  "Footwear",
  "Inner & Sleepwear",
  "Sports & Activewear",
  "Women Ethnic Wear",
];

const ethnicCategories = [
  "Kurtis, Sets & Fabrics",
  "Sarees, Blouses & Petticoats",
  "Suits & Dress Material",
  "Ethnic Bottomwear",
  "Dupattas & Shawls",
];

const kurtiCategories = [
  "Kurti With Bottomwear",
  "Kurtis",
  "Kurti Fabrics",
  "Kurti With Dupatta & Bottomwear",
  "Kurti With Dupatta",
];

function CategoryColumn({
  items,
  selectedItem,
  onSelect,
  width = 260,
}: CategoryColumnProps) {
  return (
    <Paper
      elevation={0}
      square
      sx={{
        width,
        minWidth: width,
        bgcolor: "#ffffff",
        border: "1px solid #e2e6ee",
        overflow: "visible",
      }}
    >
      {items.map((item) => {
        const selected = item === selectedItem;

        return (
          <Box
            key={item}
            onClick={() => onSelect(item)}
            sx={{
              position: "relative",
              minHeight: 59,
              px: 2,
              py: 1.5,
              display: "flex",
              alignItems: "center",
              borderBottom: "1px solid #e2e6ee",
              bgcolor: selected ? "#4930c3" : "#ffffff",
              color: selected ? "#ffffff" : "#121826",
              cursor: "pointer",
              transition: "background-color 0.15s ease",
              "&:hover": {
                bgcolor: selected ? "#4930c3" : "#f6f4ff",
              },
              ...(selected && {
                "&::after": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  right: -15,
                  width: 0,
                  height: 0,
                  borderTop: "29.5px solid transparent",
                  borderBottom: "29.5px solid transparent",
                  borderLeft: "15px solid #4930c3",
                  zIndex: 3,
                },
              }),
            }}
          >
            <Typography
              sx={{
                fontSize: 17,
                fontWeight: selected ? 600 : 400,
                lineHeight: 1.3,
              }}
            >
              {item}
            </Typography>
          </Box>
        );
      })}
    </Paper>
  );
}

function SizeGuideIllustration() {
  return (
    <Box
      sx={{
        height: 310,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: 185,
          height: 255,
          color: "#a8adb8",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 7,
            left: 72,
            width: 42,
            height: 42,
            border: "2px solid #b8bdc7",
            borderRadius: "50%",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            top: 45,
            left: 55,
            width: 76,
            height: 135,
            border: "2px solid #b8bdc7",
            borderRadius: "45% 45% 32% 32%",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            top: 75,
            left: 61,
            width: 64,
            borderTop: "2px dashed #ec8ac1",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            top: 105,
            left: 61,
            width: 64,
            borderTop: "2px dashed #ec8ac1",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            top: 140,
            left: 61,
            width: 64,
            borderTop: "2px dashed #ec8ac1",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            top: 176,
            left: 69,
            width: 2,
            height: 72,
            bgcolor: "#b8bdc7",
            transform: "rotate(8deg)",
            transformOrigin: "top",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            top: 176,
            right: 69,
            width: 2,
            height: 72,
            bgcolor: "#b8bdc7",
            transform: "rotate(-8deg)",
            transformOrigin: "top",
          }}
        />

        <Typography
          sx={{
            position: "absolute",
            top: 70,
            left: 0,
            fontSize: 9,
          }}
        >
          Shoulder
        </Typography>

        <Typography
          sx={{
            position: "absolute",
            top: 100,
            left: 13,
            fontSize: 9,
          }}
        >
          Bust
        </Typography>

        <Typography
          sx={{
            position: "absolute",
            top: 132,
            left: 10,
            fontSize: 9,
          }}
        >
          Waist
        </Typography>

        <Typography
          sx={{
            position: "absolute",
            top: 162,
            left: 18,
            fontSize: 9,
          }}
        >
          Hip
        </Typography>

        <Typography
          sx={{
            position: "absolute",
            top: 88,
            right: -10,
            fontSize: 9,
          }}
        >
          Top Length
        </Typography>

        <Typography
          sx={{
            position: "absolute",
            top: 190,
            right: -20,
            fontSize: 9,
          }}
        >
          Bottom Length
        </Typography>
      </Box>
    </Box>
  );
}

export default function BulkCatalogUploadPage() {
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");
  const [level1, setLevel1] = useState("Women Fashion");
  const [level2, setLevel2] = useState("Ethnic Wear");
  const [level3, setLevel3] = useState("Kurtis, Sets & Fabrics");
  const [level4, setLevel4] = useState("Kurti With Bottomwear");

  const breadcrumb = useMemo(
    () => [level1, level2, level3, level4].filter(Boolean).join(" / "),
    [level1, level2, level3, level4]
  );

  const handlePrimarySelection = (item: string) => {
    setLevel1(item);

    if (item !== "Women Fashion") {
      setLevel2("");
      setLevel3("");
      setLevel4("");
    }
  };

  const handleSearch = () => {
    const value = searchText.trim().toLowerCase();

    if (!value) {
      return;
    }

    const kurtiMatch = kurtiCategories.find((item) =>
      item.toLowerCase().includes(value)
    );

    if (kurtiMatch) {
      setLevel1("Women Fashion");
      setLevel2("Ethnic Wear");
      setLevel3("Kurtis, Sets & Fabrics");
      setLevel4(kurtiMatch);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        minWidth: 0,
        minHeight: "calc(100vh - 76px)",
        bgcolor: "#f3f6fc",
        overflowX: "hidden",
        pb: 10,
      }}
    >
      <Box
        sx={{
          height: 78,
          px: { xs: 2, md: 3.5 },
          bgcolor: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid #e4e8ef",
        }}
      >
        <Stack
          direction="row"
          spacing={1.5}
          sx={{ alignItems: "center" }}
        >
          <IconButton
            onClick={() => navigate(-1)}
            size="small"
            aria-label="go back"
          >
            <ArrowBackIosNew fontSize="small" />
          </IconButton>

          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              color: "#101828",
            }}
          >
            Bulk Catalog Upload
          </Typography>
        </Stack>

        <Button
          startIcon={<PlayCircleFilled sx={{ color: "#ff4040" }} />}
          sx={{
            display: { xs: "none", md: "inline-flex" },
            color: "#344054",
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          How to upload catalogs in Bulk?
        </Button>
      </Box>

      <Box sx={{ p: { xs: 2, md: 3.5 } }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          sx={{
            mb: 3,
            justifyContent: "space-between",
            alignItems: {
              xs: "stretch",
              md: "flex-end",
            },
          }}
        >
          <Box sx={{ width: { xs: "100%", md: 640 } }}>
            <Typography
              sx={{
                mb: 1.2,
                color: "#475467",
                fontSize: 19,
                fontWeight: 700,
              }}
            >
              Search Category
            </Typography>

            <TextField
              fullWidth
              placeholder="Try Sarees, Toys, Charger, Mugs and more..."
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleSearch();
                }
              }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ color: "#8992a5", fontSize: 30 }} />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                bgcolor: "#ffffff",
                "& .MuiOutlinedInput-root": {
                  minHeight: 62,
                },
              }}
            />
          </Box>

          <Button
            variant="outlined"
            startIcon={<HeadsetMicOutlined />}
            sx={{
              borderColor: "#ded8ff",
              color: "#4930dc",
              bgcolor: "#ffffff",
              textTransform: "none",
              borderRadius: 2,
              px: 2,
              py: 1.1,
            }}
          >
            Need Help?
          </Button>
        </Stack>

        <Box
          sx={{
            display: "flex",
            gap: 2.5,
            alignItems: "flex-start",
            overflowX: "auto",
            pb: 2,
          }}
        >
          <CategoryColumn
            items={primaryCategories}
            selectedItem={level1}
            onSelect={handlePrimarySelection}
            width={245}
          />

          {level1 === "Women Fashion" && (
            <CategoryColumn
              items={womenCategories}
              selectedItem={level2}
              onSelect={(item) => {
                setLevel2(item);

                if (item !== "Ethnic Wear") {
                  setLevel3("");
                  setLevel4("");
                }
              }}
              width={250}
            />
          )}

          {level2 === "Ethnic Wear" && (
            <CategoryColumn
              items={ethnicCategories}
              selectedItem={level3}
              onSelect={(item) => {
                setLevel3(item);

                if (item !== "Kurtis, Sets & Fabrics") {
                  setLevel4("");
                }
              }}
              width={250}
            />
          )}

          {level3 === "Kurtis, Sets & Fabrics" && (
            <CategoryColumn
              items={kurtiCategories}
              selectedItem={level4}
              onSelect={setLevel4}
              width={270}
            />
          )}

          {level4 && (
            <Paper
              elevation={0}
              sx={{
                minWidth: 500,
                maxWidth: 520,
                bgcolor: "#ffffff",
                borderRadius: 0,
                border: "1px solid #e2e6ee",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  minHeight: 85,
                  px: 3,
                  py: 2,
                  bgcolor: "#e7ebf2",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    color: "#344054",
                    fontSize: 16,
                    lineHeight: 1.5,
                  }}
                >
                  {breadcrumb}
                </Typography>
              </Box>

              <SizeGuideIllustration />

              <Box sx={{ px: 3, pb: 3, textAlign: "center" }}>
                <Typography sx={{ color: "#101828", mb: 1 }}>
                  Already have your {level4} template filled?
                </Typography>

                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "#4930c3",
                    textTransform: "none",
                    fontWeight: 700,
                    px: 3,
                    "&:hover": {
                      bgcolor: "#3e28aa",
                    },
                  }}
                >
                  Upload Template
                </Button>
              </Box>
            </Paper>
          )}
        </Box>
      </Box>

      <Paper
        elevation={8}
        sx={{
          position: "fixed",
          left: {
            xs: 16,
            md: "calc(50% - 285px)",
          },
          bottom: 75,
          width: { xs: "calc(100% - 32px)", md: 570 },
          p: 3,
          borderRadius: 2,
          zIndex: 20,
        }}
      >
        <Box
          sx={{
            display: "inline-flex",
            px: 1.5,
            py: 0.4,
            mb: 1.2,
            borderRadius: 1,
            bgcolor: "#ff2f92",
            color: "#ffffff",
            fontSize: 13,
            fontWeight: 700,
          }}
        >
          NEW
        </Box>

        <Typography
          sx={{
            fontSize: 20,
            fontWeight: 800,
            color: "#101828",
            mb: 1,
          }}
        >
          Introducing Prefilled Templates
        </Typography>

        <Typography sx={{ color: "#667085" }}>
          Download prefilled templates and complete your bulk catalog upload
          faster.
        </Typography>
      </Paper>

      <Box
        sx={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          minHeight: 66,
          px: 3,
          bgcolor: "#ffffff",
          borderTop: "1px solid #dfe3ea",
          display: "flex",
          alignItems: "center",
          zIndex: 15,
        }}
      >
        <Button
          variant="outlined"
          onClick={() => navigate(-1)}
          sx={{
            borderColor: "#4930c3",
            color: "#4930c3",
            textTransform: "none",
            fontWeight: 700,
            px: 3,
            py: 1,
          }}
        >
          Discard Catalog
        </Button>
      </Box>
    </Box>
  );
}