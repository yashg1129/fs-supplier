import { useState } from "react";
import {
  ArrowBackIosNew,
  BookmarkBorder,
  HeadsetMicOutlined,
  InfoOutlined,
  Search,
  Upload,
  YouTube,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface CategoryColumn {
  title?: string;
  items: string[];
}

const categoryColumns: CategoryColumn[] = [
  {
    title: "Your Categories",
    items: [
      "Men Fashion",
      "Women Fashion",
      "Home & Living",
      "Kids & Toys",
      "Personal Care & Wellness",
      "Mobiles & Tablets",
      "Consumer Electronics",
      "Jewellery",
    ],
  },
  {
    items: [
      "Ethnic Wear",
      "Western Wear",
      "Accessories",
      "Footwear",
      "Inner & Sleepwear",
      "Sports & Activewear",
      "Women Ethnic Wear",
    ],
  },
  {
    items: [
      "Kurtis, Sets & Fabrics",
      "Sarees, Blouses & Petticoats",
      "Suits & Dress Material",
      "Ethnic Bottomwear",
      "Dupattas & Shawls",
      "Ethnic Jackets",
    ],
  },
  {
    items: [
      "Kurti With Bottomwear",
      "Kurtis",
      "Kurti Fabrics",
      "Kurti With Dupatta & Bottomwear",
      "Kurti With Dupatta",
    ],
  },
];

const selectedValues = [
  "Women Fashion",
  "Ethnic Wear",
  "Kurtis, Sets & Fabrics",
  "Kurti With Bottomwear",
];

export default function SingleCatalogUploadPage() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");

  function handleUploadImages(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const files = Array.from(event.target.files ?? []);
    console.log("Selected files:", files);
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f4f6fb",
        color: "#111827",
      }}
    >
      <Box
        sx={{
          bgcolor: "#ffffff",
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        <Box
          sx={{
            minHeight: 64,
            px: { xs: 2, md: 3 },
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Stack
            direction="row"
            spacing={1.5}
            sx={{
              alignContent: "center",
            }}
          >
            <Button
              onClick={() => navigate(-1)}
              sx={{
                minWidth: 32,
                color: "#475569",
                p: 0,
              }}
            >
              <ArrowBackIosNew sx={{ fontSize: 18 }} />
            </Button>

            <Typography
              sx={{
                fontSize: 20,
                fontWeight: 800,
              }}
            >
              Add Single Catalog
            </Typography>
          </Stack>

          <Stack
            direction="row"
            spacing={1}
            sx={{
              alignContent: "center",
            }}
          >
            <YouTube
              sx={{
                color: "#ef4444",
                fontSize: 21,
              }}
            />

            <Typography
              sx={{
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              Learn to upload single catalog?
            </Typography>
          </Stack>
        </Box>

        <Box
          sx={{
            px: { xs: 2, md: 3 },
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Stack direction="row" spacing={4}>
            <StepItem number={1} label="Select Category" active />

            <StepItem number={2} label="Add Product Details" />
          </Stack>

          <Button
            variant="outlined"
            startIcon={<HeadsetMicOutlined />}
            sx={{
              textTransform: "none",
              color: "#4f2bd3",
              borderColor: "#d8d2ff",
              borderRadius: 2,
              fontSize: 13,
            }}
          >
            Need Help?
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          px: { xs: 2, md: 3 },
          py: 3,
        }}
      >
        <Typography
          sx={{
            fontSize: 16,
            fontWeight: 700,
            color: "#475569",
            mb: 1,
          }}
        >
          Search Category
        </Typography>

        <TextField
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          placeholder="Try Sarees, Toys, Charger, Mugs and more..."
          size="small"
          sx={{
            width: { xs: "100%", sm: 420 },
            bgcolor: "#ffffff",
            mb: 3,
            "& .MuiOutlinedInput-root": {
              height: 48,
            },
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: "#94a3b8" }} />
                </InputAdornment>
              ),
            },
          }}
        />

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              lg: "minmax(0, 2.1fr) 315px",
            },
            gap: 2.5,
            alignItems: "start",
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(4, minmax(160px, 1fr))",
              },
              gap: 1.5,
              alignItems: "start",
            }}
          >
            {categoryColumns.map((column, index) => (
              <CategoryList
                key={index}
                column={column}
                selectedValue={selectedValues[index]}
                showFooter={index === 0}
              />
            ))}
          </Box>

          <ProductGuideCard onUpload={handleUploadImages} />
        </Box>
      </Box>
    </Box>
  );
}

interface StepItemProps {
  number: number;
  label: string;
  active?: boolean;
}

function StepItem({ number, label, active = false }: StepItemProps) {
  return (
    <Box
      sx={{
        position: "relative",
        pb: 1.5,
        display: "flex",
        alignItems: "center",
        gap: 1,
        color: active ? "#4f2bd3" : "#94a3b8",

        "&::after": active
          ? {
            content: '""',
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 2,
            bgcolor: "#4f2bd3",
          }
          : undefined,
      }}
    >
      <Box
        sx={{
          width: 24,
          height: 24,
          borderRadius: "50%",
          bgcolor: active ? "#eeeaff" : "#f1f5f9",
          color: active ? "#4f2bd3" : "#64748b",
          display: "grid",
          placeItems: "center",
          fontSize: 12,
          fontWeight: 700,
        }}
      >
        {number}
      </Box>

      <Typography
        sx={{
          fontSize: 13,
          fontWeight: active ? 700 : 500,
        }}
      >
        {label}
      </Typography>
    </Box>
  );
}

interface CategoryListProps {
  column: CategoryColumn;
  selectedValue?: string;
  showFooter?: boolean;
}

function CategoryList({
  column,
  selectedValue,
  showFooter = false,
}: CategoryListProps) {
  return (
    <Box
      sx={{
        bgcolor: "#ffffff",
        border: "1px solid #e2e8f0",
      }}
    >
      {column.title && (
        <Box
          sx={{
            px: 1.25,
            py: 1.2,
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            borderBottom: "1px solid #e2e8f0",
          }}
        >
          <BookmarkBorder sx={{ fontSize: 14 }} />

          <Typography sx={{ fontSize: 13 }}>
            {column.title}
          </Typography>
        </Box>
      )}

      {column.items.map((item) => {
        const selected = item === selectedValue;

        return (
          <Box
            key={item}
            sx={{
              position: "relative",
              px: 1.4,
              py: 1.45,
              minHeight: 42,
              borderBottom: "1px solid #e2e8f0",
              bgcolor: selected ? "#4d2bc7" : "#ffffff",
              color: selected ? "#ffffff" : "#111827",
              cursor: "pointer",

              "&:hover": {
                bgcolor: selected ? "#4d2bc7" : "#f8fafc",
              },

              ...(selected && {
                "&::after": {
                  content: '""',
                  position: "absolute",
                  right: -10,
                  top: "50%",
                  transform: "translateY(-50%)",
                  borderTop: "10px solid transparent",
                  borderBottom: "10px solid transparent",
                  borderLeft: "10px solid #4d2bc7",
                  zIndex: 2,
                },
              }),
            }}
          >
            <Typography
              sx={{
                fontSize: 14,
                lineHeight: 1.25,
                fontWeight: selected ? 700 : 500,
              }}
            >
              {item}
            </Typography>
          </Box>
        );
      })}

      {showFooter && (
        <Box sx={{ px: 1.4, py: 1.4 }}>
          <Typography sx={{ fontSize: 12, mb: 0.5 }}>
            Can't find the category?
          </Typography>

          <Typography
            sx={{
              fontSize: 12,
              color: "#4f2bd3",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Search Category
          </Typography>
        </Box>
      )}
    </Box>
  );
}

interface ProductGuideCardProps {
  onUpload: (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
}

function ProductGuideCard({ onUpload }: ProductGuideCardProps) {
  return (
    <Box
      sx={{
        bgcolor: "#ffffff",
        border: "1px solid #e2e8f0",
      }}
    >
      <Box
        sx={{
          bgcolor: "#e9edf5",
          px: 2,
          py: 1.5,
          textAlign: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: 12,
            color: "#475569",
          }}
        >
          Women Fashion / Ethnic Wear / Kurtis, Sets & Fabrics /
          Kurti With Bottomwear
        </Typography>
      </Box>

      <Box
        sx={{
          minHeight: 300,
          px: 2,
          py: 3,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <BodyMeasurementIllustration />

        <Typography
          sx={{
            mt: 2,
            mb: 2,
            fontSize: 14,
            fontWeight: 600,
            color: "#475569",
            maxWidth: 240,
          }}
        >
          Please provide only front image for each product
        </Typography>

        <Button
          component="label"
          variant="contained"
          startIcon={<Upload />}
          sx={{
            bgcolor: "#4f2bd3",
            textTransform: "none",
            fontWeight: 700,
            fontSize: 14,
            boxShadow: "none",

            "&:hover": {
              bgcolor: "#3f21b3",
              boxShadow: "none",
            },
          }}
        >
          Add Product Images

          <input
            hidden
            multiple
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={onUpload}
          />
        </Button>
      </Box>

      <Divider />

      <Box sx={{ p: 1.5 }}>
        <Box
          sx={{
            border: "1px solid #facc15",
            bgcolor: "#fffbea",
            px: 1.2,
            py: 1,
            borderRadius: 1,
            display: "flex",
            alignItems: "center",
            gap: 1,
            mb: 2,
          }}
        >
          <InfoOutlined
            sx={{
              color: "#eab308",
              fontSize: 18,
            }}
          />

          <Typography sx={{ fontSize: 11 }}>
            Follow guidelines to reduce quality check failure
          </Typography>
        </Box>

        <Typography sx={{ fontSize: 12, fontWeight: 700, mb: 1 }}>
          General Guidelines
        </Typography>

        <GuidelineItem
          number={1}
          text="You can add minimum 1 and maximum 9 products to create a catalog"
        />

        <GuidelineItem
          number={2}
          text="Upload the products from the same category that you have chosen."
        />

        <Box
          sx={{
            mt: 2,
            mb: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ fontSize: 12, fontWeight: 700 }}>
            Image Guidelines
          </Typography>

          <Typography
            sx={{
              fontSize: 11,
              color: "#4f2bd3",
              fontWeight: 700,
            }}
          >
            View Full Image Guidelines
          </Typography>
        </Box>

        <GuidelineItem
          number={1}
          text="Images with text/Watermark are not acceptable in primary images."
        />

        <GuidelineItem
          number={2}
          text="Product image should not have any text"
        />

        <GuidelineItem
          number={3}
          text="Please add solo product image without any props."
        />
      </Box>
    </Box>
  );
}

interface GuidelineItemProps {
  number: number;
  text: string;
}

function GuidelineItem({ number, text }: GuidelineItemProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        gap: 1,
        mb: 1,
      }}
    >
      <Box
        sx={{
          width: 20,
          height: 20,
          flexShrink: 0,
          borderRadius: "50%",
          bgcolor: "#eeeaff",
          color: "#4f2bd3",
          display: "grid",
          placeItems: "center",
          fontSize: 11,
          fontWeight: 700,
        }}
      >
        {number}
      </Box>

      <Typography
        sx={{
          fontSize: 11,
          color: "#475569",
          lineHeight: 1.5,
        }}
      >
        {text}
      </Typography>
    </Box>
  );
}

function BodyMeasurementIllustration() {
  return (
    <Box
      sx={{
        width: 130,
        height: 165,
        position: "relative",
        color: "#cbd5e1",
      }}
    >
      <Box
        sx={{
          width: 34,
          height: 34,
          border: "2px solid",
          borderColor: "currentColor",
          borderRadius: "50%",
          mx: "auto",
        }}
      />

      <Box
        sx={{
          width: 58,
          height: 82,
          border: "2px solid",
          borderColor: "currentColor",
          borderRadius: "38% 38% 28% 28%",
          mx: "auto",
          mt: 0.5,
          position: "relative",
        }}
      >
        {[22, 42, 63].map((top) => (
          <Box
            key={top}
            sx={{
              position: "absolute",
              left: 7,
              right: 7,
              top,
              borderTop: "1px dashed #f472b6",
            }}
          />
        ))}
      </Box>

      <Box
        sx={{
          position: "absolute",
          left: 48,
          top: 116,
          width: 2,
          height: 48,
          bgcolor: "#cbd5e1",
          transform: "rotate(8deg)",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          right: 48,
          top: 116,
          width: 2,
          height: 48,
          bgcolor: "#cbd5e1",
          transform: "rotate(-8deg)",
        }}
      />
    </Box>
  );
}