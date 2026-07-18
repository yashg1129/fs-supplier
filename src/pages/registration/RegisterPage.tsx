import { useState } from "react";
import axios from "axios";

import {
  VisibilityOffOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";

import {
  Alert,
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SupplierRegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState<RegisterForm>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
    setSuccessMessage("");
  }

  function isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (!form.name.trim()) {
      setError("Name is required.");
      return;
    }

    if (form.name.trim().length < 3) {
      setError("Name must contain at least 3 characters.");
      return;
    }

    if (!form.email.trim()) {
      setError("Email is required.");
      return;
    }

    if (!isValidEmail(form.email)) {
      setError("Enter a valid email address.");
      return;
    }

    if (!form.password) {
      setError("Password is required.");
      return;
    }

    if (form.password.length < 4) {
      setError("Password must contain at least 4 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Password and confirm password do not match.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const requestBody = {
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
      };

      console.log("Registration request:", requestBody);

    
    //  Replace this section with your backend API:

      const response = await axios.post(
        "http://localhost:8081/auth/register",
        requestBody,
      );

      console.log(response.data);
      

      await new Promise((resolve) => setTimeout(resolve, 800));

      setSuccessMessage(
        "Supplier account created successfully. Redirecting to login...",
      );

      setTimeout(() => {
        navigate("/supplier/login");
      }, 1200);
    } catch (registrationError) {
      console.error(registrationError);
      setError("Unable to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f0edff",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        px: 2,
        py: { xs: 3, md: 4 },
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 610,
        }}
      >
        <Typography
          sx={{
            textAlign: "center",
            color: "#f13ba1",
            fontSize: { xs: 42, md: 50 },
            fontWeight: 700,
            lineHeight: 1,
            mb: 4,
            letterSpacing: "-2px",
          }}
        >
          meesho
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            bgcolor: "#ffffff",
            borderRadius: 1.5,
            px: { xs: 3, md: 4.5 },
            py: { xs: 4, md: 5 },
          }}
        >
          <Typography
            component="h1"
            sx={{
              fontSize: { xs: 26, md: 31 },
              fontWeight: 800,
              color: "#101828",
              mb: 4,
            }}
          >
            Create your supplier account
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2.5 }}>
              {error}
            </Alert>
          )}

          {successMessage && (
            <Alert severity="success" sx={{ mb: 2.5 }}>
              {successMessage}
            </Alert>
          )}

          <TextField
            name="name"
            value={form.name}
            onChange={handleChange}
            label="Full name"
            placeholder="Enter your full name"
            autoComplete="name"
            fullWidth
            sx={fieldStyles}
          />

          <TextField
            name="email"
            value={form.email}
            onChange={handleChange}
            label="Email address"
            placeholder="Enter your email address"
            type="email"
            autoComplete="email"
            fullWidth
            sx={fieldStyles}
          />

          <TextField
            name="password"
            value={form.password}
            onChange={handleChange}
            label="Password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            fullWidth
            sx={passwordFieldStyles}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <Button
                      type="button"
                      onClick={() =>
                        setShowPassword((previous) => !previous)
                      }
                      startIcon={
                        showPassword ? (
                          <VisibilityOffOutlined />
                        ) : (
                          <VisibilityOutlined />
                        )
                      }
                      sx={showButtonStyles}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputAdornment>
                ),
              },
            }}
          />

          <TextField
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            label="Confirm password"
            type={showConfirmPassword ? "text" : "password"}
            autoComplete="new-password"
            fullWidth
            sx={passwordFieldStyles}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <Button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(
                          (previous) => !previous,
                        )
                      }
                      startIcon={
                        showConfirmPassword ? (
                          <VisibilityOffOutlined />
                        ) : (
                          <VisibilityOutlined />
                        )
                      }
                      sx={showButtonStyles}
                    >
                      {showConfirmPassword ? "Hide" : "Show"}
                    </Button>
                  </InputAdornment>
                ),
              },
            }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{
              minHeight: 62,
              mt: 2,
              bgcolor: "#4327c6",
              borderRadius: 1,
              textTransform: "none",
              fontSize: 19,
              fontWeight: 700,
              boxShadow: "none",

              "&:hover": {
                bgcolor: "#3620a7",
                boxShadow: "none",
              },
            }}
          >
            {loading ? "Creating account..." : "Create account"}
          </Button>
        </Box>

        <Typography
          sx={{
            textAlign: "center",
            color: "#475569",
            fontSize: 18,
            mt: 3.5,
            mb: 2,
          }}
        >
          Already have a supplier account?
        </Typography>

        <Button
          variant="outlined"
          fullWidth
          onClick={() => navigate("/supplier/login")}
          sx={{
            minHeight: 62,
            borderColor: "#4327c6",
            color: "#4327c6",
            borderRadius: 1,
            textTransform: "none",
            fontSize: 18,
            fontWeight: 700,

            "&:hover": {
              borderColor: "#3620a7",
              bgcolor: "#f8f6ff",
            },
          }}
        >
          Log in
        </Button>
      </Box>
    </Box>
  );
}

const fieldStyles = {
  mb: 3,
  "& .MuiOutlinedInput-root": {
    borderRadius: 1,
    bgcolor: "#fffcca",
    minHeight: 64,
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#e4df99",
  },
  "& .MuiInputLabel-root": {
    color: "#8a8f98",
  },
  "& .MuiInputBase-input": {
    fontSize: 18,
  },
};

const passwordFieldStyles = {
  mb: 3,
  "& .MuiOutlinedInput-root": {
    borderRadius: 1,
    bgcolor: "#fffcca",
    minHeight: 64,
    pr: 0,
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#c8ced8",
  },
  "& .MuiInputLabel-root": {
    color: "#8a8f98",
  },
  "& .MuiInputBase-input": {
    fontSize: 18,
  },
};

const showButtonStyles = {
  height: 64,
  minWidth: 125,
  px: 2,
  borderLeft: "1px solid #c8ced8",
  borderRadius: 0,
  color: "#3f24c9",
  textTransform: "none",
  fontSize: 16,
  fontWeight: 700,
};