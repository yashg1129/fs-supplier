import { useMemo, useState } from "react";
import {
  AddPhotoAlternateOutlined,
  ArrowBackOutlined,
  DeleteOutlined,
  SaveOutlined,
} from "@mui/icons-material";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import type { ProductFormData } from "../types/product";


const schema: yup.ObjectSchema<ProductFormData> = yup.object({
  productName: yup
    .string()
    .trim()
    .required("Product name is required")
    .min(3, "Product name must contain at least 3 characters"),

  sku: yup
    .string()
    .trim()
    .required("SKU is required")
    .matches(
      /^[a-zA-Z0-9-_]+$/,
      "SKU can contain letters, numbers, hyphen and underscore only",
    ),

  categoryId: yup.string().required("Category is required"),

  brand: yup.string().trim().required("Brand is required"),

  description: yup
    .string()
    .trim()
    .required("Description is required")
    .min(20, "Description must contain at least 20 characters"),

  mrp: yup
    .number()
    .typeError("MRP is required")
    .positive("MRP must be greater than zero")
    .required("MRP is required"),

  sellingPrice: yup
    .number()
    .typeError("Selling price is required")
    .positive("Selling price must be greater than zero")
    .required("Selling price is required")
    .test(
      "selling-price",
      "Selling price cannot be greater than MRP",
      function (value) {
        const { mrp } = this.parent;

        if (!value || !mrp) {
          return true;
        }

        return value <= mrp;
      },
    ),

  stockQuantity: yup
    .number()
    .typeError("Stock quantity is required")
    .integer("Stock quantity must be a whole number")
    .min(0, "Stock quantity cannot be negative")
    .required("Stock quantity is required"),

  size: yup.string().required("Size is required"),
  color: yup.string().trim().required("Color is required"),
  material: yup.string().trim().required("Material is required"),
  active: yup.boolean().required(),
});

const categories = [
  {
    id: "women-kurtis",
    name: "Women > Kurtis",
  },
  {
    id: "women-sarees",
    name: "Women > Sarees",
  },
  {
    id: "women-dresses",
    name: "Women > Dresses",
  },
  {
    id: "men-shirts",
    name: "Men > Shirts",
  },
  {
    id: "men-tshirts",
    name: "Men > T-Shirts",
  },
];

const sizes = ["S", "M", "L", "XL", "XXL", "Free Size"];

const defaultValues: ProductFormData = {
  productName: "",
  sku: "",
  categoryId: "",
  brand: "",
  description: "",

  mrp: 0,
  sellingPrice: 0,
  stockQuantity: 0,

  size: "",
  color: "",
  material: "",

  active: true,
};

export default function AddProductPage() {
  const [productImages, setProductImages] = useState<File[]>([]);
  const [submitMessage, setSubmitMessage] = useState("");

  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const imagePreviews = useMemo(
    () =>
      productImages.map((file) => ({
        file,
        url: URL.createObjectURL(file),
      })),
    [productImages],
  );

  function handleImageChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const files = Array.from(event.target.files ?? []);

    if (files.length === 0) {
      return;
    }

    const imageFiles = files.filter((file) =>
      file.type.startsWith("image/"),
    );

    setProductImages((previousImages) =>
      [...previousImages, ...imageFiles].slice(0, 5),
    );

    event.target.value = "";
  }

  function removeImage(index: number) {
    setProductImages((previousImages) =>
      previousImages.filter((_, imageIndex) => imageIndex !== index),
    );
  }

  async function onSubmit(data: ProductFormData) {
    setSubmitMessage("");

    if (productImages.length === 0) {
      setSubmitMessage("Please upload at least one product image.");
      return;
    }

    try {
      const formData = new FormData();

      formData.append(
        "product",
        new Blob([JSON.stringify(data)], {
          type: "application/json",
        }),
      );

      productImages.forEach((image) => {
        formData.append("images", image);
      });

      console.log("Product data:", data);
      console.log("Product images:", productImages);

      /*
       * Replace this section with your actual backend API.
       *
       * await axios.post(
       *   "http://localhost:8080/api/supplier/products",
       *   formData,
       *   {
       *     headers: {
       *       "Content-Type": "multipart/form-data"
       *     }
       *   }
       * );
       */

      await new Promise((resolve) => setTimeout(resolve, 800));

      setSubmitMessage("Product added successfully.");

      reset(defaultValues);
      setProductImages([]);
    } catch (error) {
      console.error("Unable to add product:", error);
      setSubmitMessage("Unable to add product. Please try again.");
    }
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{
          mb: 3,
          justifyContent: "space-between",
          alignItems: {
            xs: "stretch",
            sm: "center",
          },
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>
            Add Product
          </Typography>

          <Typography color="text.secondary">
            Add product information, pricing, inventory and images.
          </Typography>
        </Box>

        <Stack direction="row" spacing={1.5}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackOutlined />}
            onClick={() => window.history.back()}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="contained"
            startIcon={<SaveOutlined />}
            disabled={isSubmitting}
            sx={{
              backgroundColor: "#9f2089",
              "&:hover": {
                backgroundColor: "#80176e",
              },
            }}
          >
            {isSubmitting ? "Saving..." : "Save Product"}
          </Button>
        </Stack>
      </Stack>

      {submitMessage && (
        <Alert
          severity={
            submitMessage.includes("successfully")
              ? "success"
              : "error"
          }
          sx={{ mb: 3 }}
        >
          {submitMessage}
        </Alert>
      )}

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            lg: "minmax(0, 2fr) minmax(300px, 1fr)",
          },
          gap: 3,
        }}
      >
        <Stack spacing={3}>
          <Card
            elevation={0}
            sx={{
              border: "1px solid #e5e7eb",
              borderRadius: 3,
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Basic Information
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 3 }}
              >
                Enter the basic details of your product.
              </Typography>

              <Stack spacing={2.5}>
                <TextField
                  label="Product Name"
                  placeholder="For example: Women's Printed Cotton Kurti"
                  fullWidth
                  error={Boolean(errors.productName)}
                  helperText={errors.productName?.message}
                  {...register("productName")}
                />

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "1fr",
                      sm: "1fr 1fr",
                    },
                    gap: 2,
                  }}
                >
                  <TextField
                    label="SKU"
                    placeholder="KURTI-WOMEN-001"
                    fullWidth
                    error={Boolean(errors.sku)}
                    helperText={errors.sku?.message}
                    {...register("sku")}
                  />

                  <TextField
                    label="Brand"
                    placeholder="Enter brand name"
                    fullWidth
                    error={Boolean(errors.brand)}
                    helperText={errors.brand?.message}
                    {...register("brand")}
                  />
                </Box>

                <Controller
                  name="categoryId"
                  control={control}
                  render={({ field }) => (
                    <FormControl
                      fullWidth
                      error={Boolean(errors.categoryId)}
                    >
                      <InputLabel>Category</InputLabel>

                      <Select
                        {...field}
                        label="Category"
                      >
                        {categories.map((category) => (
                          <MenuItem
                            key={category.id}
                            value={category.id}
                          >
                            {category.name}
                          </MenuItem>
                        ))}
                      </Select>

                      <FormHelperText>
                        {errors.categoryId?.message}
                      </FormHelperText>
                    </FormControl>
                  )}
                />

                <TextField
                  label="Product Description"
                  placeholder="Describe the product, design, fit and important features"
                  fullWidth
                  multiline
                  minRows={5}
                  error={Boolean(errors.description)}
                  helperText={errors.description?.message}
                  {...register("description")}
                />
              </Stack>
            </CardContent>
          </Card>

          <Card
            elevation={0}
            sx={{
              border: "1px solid #e5e7eb",
              borderRadius: 3,
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Pricing and Inventory
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 3 }}
              >
                Enter product pricing and available stock.
              </Typography>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "repeat(3, 1fr)",
                  },
                  gap: 2,
                }}
              >
                <TextField
                  label="MRP"
                  type="number"
                  fullWidth
                  slotProps={{
                    htmlInput: {
                      min: 0,
                    },
                  }}
                  error={Boolean(errors.mrp)}
                  helperText={errors.mrp?.message}
                  {...register("mrp")}
                />

                <TextField
                  label="Selling Price"
                  type="number"
                  fullWidth
                  slotProps={{
                    htmlInput: {
                      min: 0,
                    },
                  }}
                  error={Boolean(errors.sellingPrice)}
                  helperText={errors.sellingPrice?.message}
                  {...register("sellingPrice")}
                />

                <TextField
                  label="Stock Quantity"
                  type="number"
                  fullWidth
                  slotProps={{
                    htmlInput: {
                      min: 0,
                    },
                  }}
                  error={Boolean(errors.stockQuantity)}
                  helperText={errors.stockQuantity?.message}
                  {...register("stockQuantity")}
                />
              </Box>
            </CardContent>
          </Card>

          <Card
            elevation={0}
            sx={{
              border: "1px solid #e5e7eb",
              borderRadius: 3,
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Product Attributes
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 3 }}
              >
                Add variant and material information.
              </Typography>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "repeat(3, 1fr)",
                  },
                  gap: 2,
                }}
              >
                <Controller
                  name="size"
                  control={control}
                  render={({ field }) => (
                    <FormControl
                      fullWidth
                      error={Boolean(errors.size)}
                    >
                      <InputLabel>Size</InputLabel>

                      <Select {...field} label="Size">
                        {sizes.map((size) => (
                          <MenuItem key={size} value={size}>
                            {size}
                          </MenuItem>
                        ))}
                      </Select>

                      <FormHelperText>
                        {errors.size?.message}
                      </FormHelperText>
                    </FormControl>
                  )}
                />

                <TextField
                  label="Color"
                  placeholder="For example: Pink"
                  fullWidth
                  error={Boolean(errors.color)}
                  helperText={errors.color?.message}
                  {...register("color")}
                />

                <TextField
                  label="Material"
                  placeholder="For example: Cotton"
                  fullWidth
                  error={Boolean(errors.material)}
                  helperText={errors.material?.message}
                  {...register("material")}
                />
              </Box>

              <Divider sx={{ my: 3 }} />

              <Controller
                name="active"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={field.value}
                        onChange={field.onChange}
                        sx={{
                          color: "#9f2089",
                          "&.Mui-checked": {
                            color: "#9f2089",
                          },
                        }}
                      />
                    }
                    label="Make this product active immediately"
                  />
                )}
              />
            </CardContent>
          </Card>
        </Stack>

        <Stack spacing={3}>
          <Card
            elevation={0}
            sx={{
              border: "1px solid #e5e7eb",
              borderRadius: 3,
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Product Images
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 3 }}
              >
                Upload up to five product images.
              </Typography>

              <Button
                component="label"
                variant="outlined"
                fullWidth
                startIcon={<AddPhotoAlternateOutlined />}
                sx={{
                  minHeight: 120,
                  borderStyle: "dashed",
                  borderWidth: 2,
                  color: "#9f2089",
                  borderColor: "#d8a4cf",
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                Upload product images

                <Typography
                  component="span"
                  variant="caption"
                  color="text.secondary"
                >
                  PNG, JPG or WEBP
                </Typography>

                <input
                  hidden
                  multiple
                  accept="image/png,image/jpeg,image/webp"
                  type="file"
                  onChange={handleImageChange}
                />
              </Button>

              {imagePreviews.length > 0 && (
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: 1.5,
                    mt: 2,
                  }}
                >
                  {imagePreviews.map((preview, index) => (
                    <Box
                      key={`${preview.file.name}-${index}`}
                      sx={{
                        position: "relative",
                        overflow: "hidden",
                        borderRadius: 2,
                        border: "1px solid #e5e7eb",
                        aspectRatio: "1 / 1",
                      }}
                    >
                      <Box
                        component="img"
                        src={preview.url}
                        alt={`Product preview ${index + 1}`}
                        sx={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />

                      <Button
                        size="small"
                        color="error"
                        variant="contained"
                        onClick={() => removeImage(index)}
                        sx={{
                          position: "absolute",
                          top: 6,
                          right: 6,
                          minWidth: 34,
                          width: 34,
                          height: 34,
                          borderRadius: "50%",
                          p: 0,
                        }}
                      >
                        <DeleteOutlined fontSize="small" />
                      </Button>

                      {index === 0 && (
                        <Box
                          sx={{
                            position: "absolute",
                            bottom: 6,
                            left: 6,
                            px: 1,
                            py: 0.5,
                            borderRadius: 1,
                            backgroundColor: "rgba(0,0,0,0.7)",
                            color: "#ffffff",
                            fontSize: 11,
                          }}
                        >
                          Main image
                        </Box>
                      )}
                    </Box>
                  ))}
                </Box>
              )}
            </CardContent>
          </Card>

          <Card
            elevation={0}
            sx={{
              border: "1px solid #e5e7eb",
              borderRadius: 3,
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Product Guidelines
              </Typography>

              <Stack
                component="ul"
                spacing={1}
                sx={{
                  pl: 2.5,
                  mb: 0,
                  color: "text.secondary",
                }}
              >
                <Typography component="li" variant="body2">
                  Use clear images with a plain background.
                </Typography>

                <Typography component="li" variant="body2">
                  The first image will be used as the main image.
                </Typography>

                <Typography component="li" variant="body2">
                  Do not include phone numbers or promotional text.
                </Typography>

                <Typography component="li" variant="body2">
                  Enter an accurate selling price and inventory quantity.
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </Box>
    </Box>
  );
}