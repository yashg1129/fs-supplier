import { useState } from "react";
import { loginSeller } from "../../services/authService";

import {
  VisibilityOutlined,
  VisibilityOffOutlined,
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
import axios from "axios";

interface LoginForm {
  username: string;
  password: string;
}

export default function SupplierLoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState<LoginForm>({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
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
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (!form.username.trim()) {
      setError("Email ID or mobile number is required.");
      return;
    }

    if (!form.password) {
      setError("Password is required.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      console.log("Login request:", form);

      await loginSeller({
        email: form.username,
        password: form.password,
      });

      await new Promise((resolve) => setTimeout(resolve, 700));

      navigate("/supplier/dashboard");
    } catch (loginError) {
      console.error(loginError);
      setError("Invalid email/mobile number or password.");
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
            mb: 5,
            letterSpacing: "-2px",
          }}
        >
          FS Mart
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
              mb: 5,
            }}
          >
            Login to your supplier panel
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2.5 }}>
              {error}
            </Alert>
          )}

          <TextField
            name="username"
            value={form.username}
            onChange={handleChange}
            label="Email Id or mobile number"
            placeholder="Enter email ID or mobile number"
            autoComplete="username"
            fullWidth
            sx={{
              mb: 4,
              "& .MuiOutlinedInput-root": {
                borderRadius: 1,
                bgcolor: "#fffcca",
                minHeight: 68,
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#f3ef99",
              },
              "& .MuiInputLabel-root": {
                color: "#8a8f98",
              },
              "& .MuiInputBase-input": {
                fontSize: 20,
              },
            }}
          />

          <TextField
            name="password"
            value={form.password}
            onChange={handleChange}
            label="Password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 1,
                bgcolor: "#fffcca",
                minHeight: 68,
                pr: 0,
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#c8ced8",
              },
              "& .MuiInputLabel-root": {
                color: "#8a8f98",
              },
              "& .MuiInputBase-input": {
                fontSize: 20,
              },
            }}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment
                    position="end"
                    sx={{
                      height: 68,
                      maxHeight: "none",
                      m: 0,
                    }}
                  >
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
                      sx={{
                        height: 68,
                        minWidth: 150,
                        px: 2,
                        borderLeft: "1px solid #c8ced8",
                        borderRadius: 0,
                        color: "#3f24c9",
                        textTransform: "none",
                        fontSize: 18,
                        fontWeight: 700,
                      }}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputAdornment>
                ),
              },
            }}
          />

          <Button
            type="button"
            onClick={() => navigate("/forgot-password")}
            sx={{
              mt: 1,
              mb: 5,
              p: 0,
              minWidth: 0,
              color: "#3f24c9",
              textTransform: "none",
              fontSize: 17,
              fontWeight: 600,
            }}
          >
            Forgot password?
          </Button>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{
              minHeight: 66,
              bgcolor: "#4327c6",
              borderRadius: 1,
              textTransform: "none",
              fontSize: 20,
              fontWeight: 700,
              boxShadow: "none",

              "&:hover": {
                bgcolor: "#3620a7",
                boxShadow: "none",
              },
            }}
          >
            {loading ? "Logging in..." : "Log in"}
          </Button>
        </Box>

        <Typography
          sx={{
            textAlign: "center",
            color: "#475569",
            fontSize: 20,
            mt: 4,
            mb: 3,
          }}
        >
          New to FS Mart?
        </Typography>

        <Button
          variant="outlined"
          fullWidth
          onClick={() => navigate("/supplier/register")}
          sx={{
            minHeight: 66,
            borderColor: "#4327c6",
            color: "#4327c6",
            borderRadius: 1,
            textTransform: "none",
            fontSize: 20,
            fontWeight: 700,

            "&:hover": {
              borderColor: "#3620a7",
              bgcolor: "#f8f6ff",
            },
          }}
        >
          Create your supplier account
        </Button>
      </Box>
    </Box>
  );
}