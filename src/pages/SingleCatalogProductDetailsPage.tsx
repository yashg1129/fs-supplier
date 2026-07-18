import { useState } from "react";
import {
    Add,
    ArrowBackIosNew,
    Check,
    DeleteOutlined,
    HeadsetMicOutlined,
    InfoOutlined,
    YouTube,
} from "@mui/icons-material";

import {
    Box,
    Button,
    Checkbox,
    Divider,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

interface ProductTab {
    id: number;
    name: string;
    imageUrl: string;
}

const products: ProductTab[] = [
    {
        id: 1,
        name: "Product 1",
        imageUrl:
            "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=120&q=80",
    },
    {
        id: 2,
        name: "Product 2",
        imageUrl:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
    },
];

export default function SingleCatalogProductDetailsPage() {
    const navigate = useNavigate();

    const [activeProductId, setActiveProductId] = useState(1);
    const [copyToAll, setCopyToAll] = useState(true);

    return (
        <Box
            sx={{
                minHeight: "100vh",
                bgcolor: "#f4f6fb",
                pb: 11,
            }}
        >
            <PageHeader navigateBack={() => navigate(-1)} />

            <Box
                sx={{
                    px: { xs: 2, md: 3 },
                    py: 1.5,
                    bgcolor: "#ffffff",
                    borderBottom: "1px solid #e5e7eb",
                }}
            >
                <StepNavigation />

                <ProductTabs
                    products={products}
                    activeProductId={activeProductId}
                    onSelect={setActiveProductId}
                />
            </Box>

            <Box
                sx={{
                    px: { xs: 2, md: 3 },
                    py: 1.5,
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        lg: "minmax(0, 2fr) minmax(330px, 0.9fr)",
                    },
                    gap: 1.5,
                    alignItems: "start",
                }}
            >
                <ProductDetailsCard
                    copyToAll={copyToAll}
                    onCopyChange={setCopyToAll}
                />

                <Stack spacing={1.5}>
                    <ImageGuidelinesCard />
                    <RequiredImagesCard />
                </Stack>
            </Box>

            <BottomActionBar
                onDiscard={() => navigate("/supplier/catalog-uploads")}
                onSave={() => console.log("Save and go back")}
                onSubmit={() => console.log("Submit catalog")}
            />
        </Box>
    );
}

interface PageHeaderProps {
    navigateBack: () => void;
}

function PageHeader({ navigateBack }: PageHeaderProps) {
    return (
        <Box
            sx={{
                minHeight: 74,
                px: { xs: 2, md: 3 },
                bgcolor: "#ffffff",
                borderBottom: "1px solid #e5e7eb",
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
                    onClick={navigateBack}
                    sx={{
                        minWidth: 28,
                        color: "#475569",
                        p: 0,
                    }}
                >
                    <ArrowBackIosNew sx={{ fontSize: 18 }} />
                </Button>

                <Typography
                    sx={{
                        fontSize: 22,
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
                        fontSize: 22,
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
    );
}

function StepNavigation() {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            <Stack direction="row" spacing={4}>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        color: "#94a3b8",
                    }}
                >
                    <Box
                        sx={{
                            width: 25,
                            height: 25,
                            borderRadius: "50%",
                            bgcolor: "#34a853",
                            color: "#ffffff",
                            display: "grid",
                            placeItems: "center",
                        }}
                    >
                        <Check sx={{ fontSize: 16 }} />
                    </Box>

                    <Typography sx={{ fontSize: 14 }}>
                        Select Category
                    </Typography>
                </Box>

                <Box
                    sx={{
                        pb: 1.4,
                        borderBottom: "2px solid #4f2bd3",
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        color: "#4f2bd3",
                    }}
                >
                    <Box
                        sx={{
                            width: 34,
                            height: 34,
                            borderRadius: "50%",
                            bgcolor: "#eeeaff",
                            display: "grid",
                            placeItems: "center",
                            fontWeight: 700,
                        }}
                    >
                        2
                    </Box>

                    <Typography
                        sx={{
                            fontSize: 14,
                            fontWeight: 600,
                        }}
                    >
                        Add Product Details
                    </Typography>
                </Box>
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
    );
}

interface ProductTabsProps {
    products: ProductTab[];
    activeProductId: number;
    onSelect: (id: number) => void;
}

function ProductTabs({
    products,
    activeProductId,
    onSelect,
}: ProductTabsProps) {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "stretch",
                gap: 1,
                mt: 1.5,
            }}
        >
            {products.map((product) => {
                const selected = product.id === activeProductId;

                return (
                    <Box
                        key={product.id}
                        onClick={() => onSelect(product.id)}
                        sx={{
                            minWidth: 218,
                            px: 2,
                            py: 1.5,
                            borderRadius: "10px 10px 0 0",
                            bgcolor: selected ? "#f3f4fb" : "#ffffff",
                            border: "1px solid #e2e8f0",
                            borderBottom: selected
                                ? "4px solid #4f2bd3"
                                : "1px solid #e2e8f0",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                        }}
                    >
                        <Box
                            component="img"
                            src={product.imageUrl}
                            alt={product.name}
                            sx={{
                                width: 62,
                                height: 62,
                                borderRadius: 1,
                                objectFit: "cover",
                                border: "1px solid #d1d5db",
                            }}
                        />

                        <Typography
                            sx={{
                                fontSize: 15,
                                color: selected ? "#4f2bd3" : "#334155",
                                fontWeight: selected ? 600 : 500,
                            }}
                        >
                            {product.name}
                        </Typography>
                    </Box>
                );
            })}

            <Box
                sx={{
                    minWidth: 190,
                    px: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    color: "#4f2bd3",
                    cursor: "pointer",
                }}
            >
                <Box
                    sx={{
                        width: 56,
                        height: 56,
                        borderRadius: 1.5,
                        border: "1px dashed #bcb3ff",
                        display: "grid",
                        placeItems: "center",
                    }}
                >
                    <Add />
                </Box>

                <Typography
                    sx={{
                        fontSize: 15,
                        fontWeight: 600,
                    }}
                >
                    Add Product
                </Typography>
            </Box>
        </Box>
    );
}

interface ProductDetailsCardProps {
    copyToAll: boolean;
    onCopyChange: (checked: boolean) => void;
}

function ProductDetailsCard({
    copyToAll,
    onCopyChange,
}: ProductDetailsCardProps) {
    return (
        <Box
            sx={{
                bgcolor: "#ffffff",
                borderRadius: 1,
                p: 3,
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                }}
            >
                <Typography
                    sx={{
                        fontSize: 20,
                        fontWeight: 800,
                    }}
                >
                    Add Product Details
                </Typography>

                <Button
                    startIcon={<DeleteOutlined />}
                    sx={{
                        textTransform: "none",
                        color: "#4f2bd3",
                        fontSize: 14,
                    }}
                >
                    Delete this product from catalog
                </Button>
            </Box>

            <Box
                sx={{
                    bgcolor: "#f0f3f9",
                    borderRadius: 1,
                    px: 2,
                    py: 1.5,
                    mb: 3,
                }}
            >
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={copyToAll}
                            onChange={(event) =>
                                onCopyChange(event.target.checked)
                            }
                            sx={{
                                color: "#4f2bd3",
                                "&.Mui-checked": {
                                    color: "#4f2bd3",
                                },
                            }}
                        />
                    }
                    label={
                        <Box>
                            <Typography
                                sx={{
                                    fontSize: 15,
                                    color: "#475569",
                                }}
                            >
                                Copy input details to all product
                            </Typography>

                            <Typography
                                sx={{
                                    fontSize: 13,
                                    color: "#64748b",
                                }}
                            >
                                If you want to change specific fields for particular
                                product like Color, Fabric etc, you can change it by
                                selecting that product.
                            </Typography>
                        </Box>
                    }
                />
            </Box>

            <Typography
                sx={{
                    fontSize: 16,
                    fontWeight: 600,
                    color: "#475569",
                    mb: 1.5,
                }}
            >
                Product, Size and Inventory
            </Typography>

            <Divider sx={{ mb: 3 }} />

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        md: "1fr 1fr",
                    },
                    gap: 3,
                }}
            >
                <LabeledSelect
                    label="GST"
                    required
                    options={["0%", "5%", "12%", "18%"]}
                />

                <Box>
                    <LabeledSelect
                        label="HSN Code"
                        required
                        options={["6104", "6106", "6204"]}
                    />

                    <Typography
                        sx={{
                            mt: 0.6,
                            ml: "145px",
                            color: "#4f2bd3",
                            fontSize: 13,
                            fontWeight: 600,
                            cursor: "pointer",
                        }}
                    >
                        Find Relevant HSN Code ›
                    </Typography>
                </Box>

                <LabeledTextField
                    label="Net Weight"
                    required
                    placeholder="Enter net weight"
                />

                <LabeledTextField
                    label="Style code/SKU"
                    placeholder="Enter style code"
                />

                <LabeledSelect
                    label="Size"
                    required
                    options={["XS", "S", "M", "L", "XL", "XXL"]}
                />

                <LabeledTextField
                    label="Inventory"
                    required
                    placeholder="Enter quantity"
                    type="number"
                />

                <LabeledTextField
                    label="MRP"
                    required
                    placeholder="Enter MRP"
                    type="number"
                />

                <LabeledTextField
                    label="Selling Price"
                    required
                    placeholder="Enter selling price"
                    type="number"
                />

                <LabeledTextField
                    label="Color"
                    required
                    placeholder="Enter color"
                />

                <LabeledTextField
                    label="Fabric"
                    required
                    placeholder="Enter fabric"
                />
            </Box>
        </Box>
    );
}

interface LabeledSelectProps {
    label: string;
    required?: boolean;
    options: string[];
}

function LabeledSelect({
    label,
    required = false,
    options,
}: LabeledSelectProps) {
    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: "145px minmax(0, 1fr)",
                alignItems: "center",
                gap: 1,
            }}
        >
            <Typography
                sx={{
                    fontSize: 14,
                    color: "#475569",
                    textAlign: "right",
                }}
            >
                {label}
                {required && (
                    <Box component="span" sx={{ color: "#ef4444" }}>
                        {" "}*
                    </Box>
                )}
                <InfoOutlined
                    sx={{
                        ml: 0.7,
                        fontSize: 15,
                        color: "#94a3b8",
                        verticalAlign: "middle",
                    }}
                />
            </Typography>

            <FormControl fullWidth size="small">
                <InputLabel>Select</InputLabel>

                <Select label="Select" defaultValue="">
                    {options.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}

interface LabeledTextFieldProps {
    label: string;
    required?: boolean;
    placeholder: string;
    type?: string;
}

function LabeledTextField({
    label,
    required = false,
    placeholder,
    type = "text",
}: LabeledTextFieldProps) {
    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: "145px minmax(0, 1fr)",
                alignItems: "center",
                gap: 1,
            }}
        >
            <Typography
                sx={{
                    fontSize: 14,
                    color: "#475569",
                    textAlign: "right",
                }}
            >
                {label}
                {required && (
                    <Box component="span" sx={{ color: "#ef4444" }}>
                        {" "}*
                    </Box>
                )}
            </Typography>

            <TextField
                fullWidth
                size="small"
                type={type}
                placeholder={placeholder}
            />
        </Box>
    );
}

function ImageGuidelinesCard() {
    const guidelines = [
        "Images with text/Watermark are not acceptable in primary images.",
        "Product image should not have any text",
        "Please add solo product image without any props.",
    ];

    return (
        <Box
            sx={{
                bgcolor: "#ffffff",
                borderRadius: 1,
                p: 2,
            }}
        >
            <Box
                sx={{
                    border: "1px solid #facc15",
                    bgcolor: "#fff8d8",
                    borderRadius: 1.5,
                    px: 1.5,
                    py: 1.2,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mb: 2.5,
                }}
            >
                <InfoOutlined
                    sx={{
                        color: "#eab308",
                        fontSize: 21,
                    }}
                />

                <Typography sx={{ fontSize: 13 }}>
                    Follow guidelines to reduce quality check failure
                </Typography>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                }}
            >
                <Typography
                    sx={{
                        fontSize: 15,
                        fontWeight: 700,
                    }}
                >
                    Image Guidelines
                </Typography>

                <Typography
                    sx={{
                        fontSize: 13,
                        color: "#4f2bd3",
                        fontWeight: 600,
                    }}
                >
                    View Full Image Guidelines
                </Typography>
            </Box>

            <Stack spacing={2}>
                {guidelines.map((guideline, index) => (
                    <Box
                        key={guideline}
                        sx={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 1.5,
                        }}
                    >
                        <Box
                            sx={{
                                width: 28,
                                height: 28,
                                flexShrink: 0,
                                borderRadius: "50%",
                                bgcolor: "#eeeaff",
                                color: "#4f2bd3",
                                display: "grid",
                                placeItems: "center",
                                fontSize: 13,
                            }}
                        >
                            {index + 1}
                        </Box>

                        <Typography
                            sx={{
                                fontSize: 13,
                                color: "#475569",
                                lineHeight: 1.5,
                            }}
                        >
                            {guideline}
                        </Typography>
                    </Box>
                ))}
            </Stack>
        </Box>
    );
}

function RequiredImagesCard() {
    return (
        <Box
            sx={{
                bgcolor: "#ffffff",
                borderRadius: 1,
                p: 2,
                minHeight: 280,
            }}
        >
            <Typography
                sx={{
                    fontSize: 15,
                    fontWeight: 700,
                    mb: 2,
                }}
            >
                Add images with details listed here
            </Typography>

            <Stack spacing={2}>
                <ImageRequirement
                    title="Front View"
                    required
                    imageUrl="https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=100&q=80"
                />

                <ImageRequirement
                    title="Back View"
                    imageUrl="https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=100&q=80"
                />
            </Stack>
        </Box>
    );
}

interface ImageRequirementProps {
    title: string;
    required?: boolean;
    imageUrl: string;
}

function ImageRequirement({
    title,
    required = false,
    imageUrl,
}: ImageRequirementProps) {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
            }}
        >
            <Box
                component="img"
                src={imageUrl}
                alt={title}
                sx={{
                    width: 70,
                    height: 70,
                    objectFit: "cover",
                    borderRadius: 1,
                    border: "1px solid #e2e8f0",
                }}
            />

            <Typography
                sx={{
                    fontSize: 14,
                    color: "#334155",
                }}
            >
                {title}
                {required && (
                    <Box component="span" sx={{ color: "#ef4444" }}>
                        {" "}*
                    </Box>
                )}
            </Typography>
        </Box>
    );
}

interface BottomActionBarProps {
    onDiscard: () => void;
    onSave: () => void;
    onSubmit: () => void;
}

function BottomActionBar({
    onDiscard,
    onSave,
    onSubmit,
}: BottomActionBarProps) {
    return (
        <Box
            sx={{
                position: "fixed",
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 1200,
                minHeight: 86,
                bgcolor: "#ffffff",
                borderTop: "1px solid #e5e7eb",
                boxShadow: "0 -2px 10px rgba(15, 23, 42, 0.08)",
                px: { xs: 2, md: 4 },
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
            }}
        >
            <Button
                variant="outlined"
                onClick={onDiscard}
                sx={{
                    textTransform: "none",
                    color: "#111827",
                    borderColor: "#94a3b8",
                    px: 2.5,
                    py: 1,
                    fontSize: 14,
                    fontWeight: 600,
                }}
            >
                Discard Catalog
            </Button>

            <Stack direction="row" spacing={2}>
                <Button
                    variant="outlined"
                    onClick={onSave}
                    sx={{
                        textTransform: "none",
                        color: "#4f2bd3",
                        borderColor: "#4f2bd3",
                        px: 3,
                        py: 1,
                        fontSize: 14,
                        fontWeight: 700,
                    }}
                >
                    Save and Go Back
                </Button>

                <Button
                    variant="contained"
                    onClick={onSubmit}
                    sx={{
                        textTransform: "none",
                        bgcolor: "#4f2bd3",
                        px: 3,
                        py: 1,
                        fontSize: 14,
                        fontWeight: 700,
                        boxShadow: "none",

                        "&:hover": {
                            bgcolor: "#3f21b3",
                            boxShadow: "none",
                        },
                    }}
                >
                    Submit Catalog
                </Button>
            </Stack>
        </Box>
    );
}