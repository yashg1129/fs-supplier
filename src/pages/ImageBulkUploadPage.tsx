import { useMemo, useRef, useState } from "react";
import {
  AddCircle,
  Block,
  Cancel,
  CheckCircle,
  ContentCopy,
  DeleteOutlined,
  InsertDriveFileOutlined,
} from "@mui/icons-material";

import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

interface UploadedImage {
  id: number;
  file: File;
  previewUrl: string;
  generatedUrl: string;
}

interface InvalidImageRule {
  title: string;
  imageUrl: string;
}

const invalidImageRules: InvalidImageRule[] = [
  {
    title: "Watermark image",
    imageUrl: "https://via.placeholder.com/55x45?text=WM",
  },
  {
    title: "Fake branded/1st copy",
    imageUrl: "https://via.placeholder.com/55x45?text=Fake",
  },
  {
    title: "Image with price",
    imageUrl: "https://via.placeholder.com/55x45?text=%E2%82%B999",
  },
  {
    title: "Pixelated image",
    imageUrl: "https://via.placeholder.com/55x45?text=Pixel",
  },
  {
    title: "Inverted image",
    imageUrl: "https://via.placeholder.com/55x45?text=Invert",
  },
  {
    title: "Blur/unclear image",
    imageUrl: "https://via.placeholder.com/55x45?text=Blur",
  },
  {
    title: "Incomplete image",
    imageUrl: "https://via.placeholder.com/55x45?text=Cut",
  },
  {
    title: "Stretched/shrunk image",
    imageUrl: "https://via.placeholder.com/55x45?text=Stretch",
  },
  {
    title: "Image with props",
    imageUrl: "https://via.placeholder.com/55x45?text=Props",
  },
  {
    title: "Image with text",
    imageUrl: "https://via.placeholder.com/55x45?text=abcd",
  },
];

export default function ImageBulkUploadPage() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [images, setImages] = useState<UploadedImage[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const imageRows = useMemo(() => images, [images]);

  function createUploadedImage(file: File, index: number): UploadedImage {
    const previewUrl = URL.createObjectURL(file);

    return {
      id: Date.now() + index,
      file,
      previewUrl,
      generatedUrl: `https://upload.example.com/cataloging/${Date.now()}/${encodeURIComponent(
        file.name,
      )}`,
    };
  }

  function addFiles(fileList: FileList | null) {
    if (!fileList) {
      return;
    }

    const validFiles = Array.from(fileList).filter((file) =>
      file.type.startsWith("image/"),
    );

    const newImages = validFiles.map(createUploadedImage);

    setImages((previous) => [...previous, ...newImages]);
  }

  function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    addFiles(event.target.files);
    event.target.value = "";
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragActive(false);
    addFiles(event.dataTransfer.files);
  }

  function removeImage(id: number) {
    setImages((previous) => {
      const imageToRemove = previous.find((image) => image.id === id);

      if (imageToRemove) {
        URL.revokeObjectURL(imageToRemove.previewUrl);
      }

      return previous.filter((image) => image.id !== id);
    });
  }

  async function copyLink(link: string) {
    try {
      await navigator.clipboard.writeText(link);
      alert("Link copied");
    } catch {
      alert("Unable to copy link");
    }
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f4f6fb",
        p: { xs: 1.5, md: 2.5 },
      }}
    >
      <Paper
        elevation={0}
        sx={{
          maxWidth: 1220,
          mx: "auto",
          bgcolor: "#ffffff",
        }}
      >
        <Box
          sx={{
            px: 2,
            py: 1.5,
            borderBottom: "6px solid #f4f6fb",
          }}
        >
          <Typography
            sx={{
              fontSize: 18,
              fontWeight: 800,
            }}
          >
            Image Bulk Upload
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              lg: "minmax(0, 1fr) 265px",
            },
          }}
        >
          <Box
            sx={{
              p: 2,
              borderRight: {
                xs: "none",
                lg: "1px solid #e2e8f0",
              },
            }}
          >
            <Box
              sx={{
                border: "1px solid #dbe2ea",
                borderRadius: 1.5,
                px: 2,
                py: 1.5,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 2,
                mb: 2.5,
              }}
            >
              <Box
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
                    borderRadius: "50%",
                    bgcolor: "#e8f5e9",
                    color: "#2e7d32",
                    display: "grid",
                    placeItems: "center",
                    flexShrink: 0,
                  }}
                >
                  <InsertDriveFileOutlined sx={{ fontSize: 17 }} />
                </Box>

                <Box>
                  <Typography
                    sx={{
                      fontSize: 14,
                      fontWeight: 800,
                    }}
                  >
                    Introducing pre-filled templates for faster bulk uploads
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: 12,
                      color: "#475569",
                    }}
                  >
                    Add product front images and get prefilled catalog template
                  </Typography>
                </Box>
              </Box>

              <Button
                variant="outlined"
                sx={{
                  textTransform: "none",
                  color: "#4f2bd3",
                  borderColor: "#4f2bd3",
                  fontWeight: 700,
                  minWidth: 110,
                }}
              >
                Get Started
              </Button>
            </Box>

            <Box
              onClick={() => inputRef.current?.click()}
              onDragEnter={() => setDragActive(true)}
              onDragLeave={() => setDragActive(false)}
              onDragOver={(event) => event.preventDefault()}
              onDrop={handleDrop}
              sx={{
                minHeight: 135,
                border: "1px dashed #b8b0ff",
                bgcolor: dragActive ? "#f0edff" : "#f7f8fc",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                cursor: "pointer",
                mb: 3,
              }}
            >
              <Box>
                <AddCircle
                  sx={{
                    color: "#4f2bd3",
                    fontSize: 28,
                    mb: 0.5,
                  }}
                />

                <Typography
                  sx={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: "#4f2bd3",
                  }}
                >
                  Add Images
                </Typography>

                <Typography
                  sx={{
                    fontSize: 11,
                    color: "#64748b",
                    mt: 0.5,
                  }}
                >
                  You can drop images here
                </Typography>
              </Box>

              <input
                ref={inputRef}
                hidden
                multiple
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={handleFileChange}
              />
            </Box>

            {images.length > 0 && (
              <>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 1.5,
                    mb: 1.5,
                  }}
                >
                  {images.map((image) => (
                    <Box
                      key={image.id}
                      sx={{
                        width: 88,
                        position: "relative",
                      }}
                    >
                      <Box
                        component="img"
                        src={image.previewUrl}
                        alt={image.file.name}
                        sx={{
                          width: 80,
                          height: 80,
                          objectFit: "cover",
                          border: "1px solid #94a3b8",
                          bgcolor: "#ffffff",
                        }}
                      />

                      <Cancel
                        onClick={() => removeImage(image.id)}
                        sx={{
                          position: "absolute",
                          top: -8,
                          right: 0,
                          color: "#94a3b8",
                          bgcolor: "#ffffff",
                          borderRadius: "50%",
                          cursor: "pointer",
                          fontSize: 18,
                        }}
                      />

                      <CheckCircle
                        sx={{
                          position: "absolute",
                          right: 0,
                          bottom: -3,
                          color: "#2eae3d",
                          bgcolor: "#ffffff",
                          borderRadius: "50%",
                          fontSize: 18,
                        }}
                      />
                    </Box>
                  ))}
                </Box>

                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "#4f2bd3",
                    textTransform: "none",
                    fontWeight: 700,
                    boxShadow: "none",
                    mb: 3,

                    "&:hover": {
                      bgcolor: "#3f21b3",
                      boxShadow: "none",
                    },
                  }}
                >
                  Get Image Link
                </Button>
              </>
            )}

            <Typography
              sx={{
                fontSize: 14,
                fontWeight: 800,
                mb: 1,
              }}
            >
              Image Links
            </Typography>

            <TableContainer
              sx={{
                border: "1px solid #dbe2ea",
              }}
            >
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ bgcolor: "#e8edf5" }}>
                    <TableCell sx={{ fontSize: 12, fontWeight: 700 }}>
                      Image
                    </TableCell>

                    <TableCell sx={{ fontSize: 12, fontWeight: 700 }}>
                      Title
                    </TableCell>

                    <TableCell sx={{ fontSize: 12, fontWeight: 700 }}>
                      Link
                    </TableCell>

                    <TableCell sx={{ fontSize: 12, fontWeight: 700 }}>
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {imageRows.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4}>
                        <Typography
                          sx={{
                            py: 2,
                            textAlign: "center",
                            color: "#64748b",
                            fontSize: 12,
                          }}
                        >
                          No images uploaded yet
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    imageRows.map((image) => (
                      <TableRow key={image.id}>
                        <TableCell>
                          <Box
                            component="img"
                            src={image.previewUrl}
                            alt={image.file.name}
                            sx={{
                              width: 52,
                              height: 52,
                              objectFit: "cover",
                              border: "1px solid #d1d5db",
                            }}
                          />
                        </TableCell>

                        <TableCell
                          sx={{
                            fontSize: 12,
                            maxWidth: 190,
                            wordBreak: "break-word",
                          }}
                        >
                          {image.file.name}
                        </TableCell>

                        <TableCell
                          sx={{
                            fontSize: 11,
                            maxWidth: 380,
                            wordBreak: "break-all",
                          }}
                        >
                          {image.generatedUrl}
                        </TableCell>

                        <TableCell>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              gap: 0.7,
                              minWidth: 105,
                            }}
                          >
                            <Button
                              size="small"
                              variant="contained"
                              startIcon={<ContentCopy sx={{ fontSize: 15 }} />}
                              onClick={() => copyLink(image.generatedUrl)}
                              sx={{
                                bgcolor: "#4f2bd3",
                                textTransform: "none",
                                fontSize: 11,
                                boxShadow: "none",

                                "&:hover": {
                                  bgcolor: "#3f21b3",
                                  boxShadow: "none",
                                },
                              }}
                            >
                              Copy Link
                            </Button>

                            <Button
                              size="small"
                              variant="outlined"
                              startIcon={<DeleteOutlined sx={{ fontSize: 15 }} />}
                              onClick={() => removeImage(image.id)}
                              sx={{
                                color: "#4f2bd3",
                                borderColor: "#4f2bd3",
                                textTransform: "none",
                                fontSize: 11,
                              }}
                            >
                              Remove Image
                            </Button>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          <Box
            sx={{
              p: 2,
              bgcolor: "#ffffff",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 2,
                color: "#ef4444",
              }}
            >
              <Block sx={{ fontSize: 18 }} />

              <Typography
                sx={{
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                Image types which are not allowed:
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1.2,
              }}
            >
              {invalidImageRules.map((rule) => (
                <Box
                  key={rule.title}
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "54px minmax(0, 1fr)",
                    gap: 1.2,
                    alignItems: "center",
                  }}
                >
                  <Box
                    component="img"
                    src={rule.imageUrl}
                    alt={rule.title}
                    sx={{
                      width: 54,
                      height: 48,
                      objectFit: "cover",
                      borderRadius: 1,
                      border: "1px solid #e5e7eb",
                    }}
                  />

                  <Box>
                    <Typography
                      sx={{
                        fontSize: 12,
                        fontWeight: 700,
                        lineHeight: 1.25,
                      }}
                    >
                      {rule.title}
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                        mt: 0.3,
                      }}
                    >
                      <Block
                        sx={{
                          fontSize: 13,
                          color: "#64748b",
                        }}
                      />

                      <Typography
                        sx={{
                          fontSize: 9,
                          color: "#64748b",
                          fontWeight: 600,
                        }}
                      >
                        NOT ALLOWED
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}