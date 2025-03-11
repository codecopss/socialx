import React, { useEffect, useState } from "react";
import { Container, Typography, Paper, Box, Button, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.get("https://your-backend-url.com/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token in header
          },
        });

        setUser(response.data);
        localStorage.setItem("user", JSON.stringify(response.data)); // Cache user data
      } catch (err) {
        console.error("Error fetching user:", err);
        setError("Failed to load user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  return (
    <Container maxWidth="sm">
      <Paper elevation={6} sx={{ p: 4, mt: 6, textAlign: "center" }}>
        <Typography variant="h4" fontWeight="bold">
          Profile Page
        </Typography>

        {loading ? (
          <Box sx={{ mt: 3 }}>
            <CircularProgress />
            <Typography variant="body1" sx={{ mt: 2 }}>
              Loading user data...
            </Typography>
          </Box>
        ) : error ? (
          <Typography variant="h6" color="error" sx={{ mt: 3 }}>
            {error}
          </Typography>
        ) : user ? (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h5">Welcome, {user.name}!</Typography>
            <Typography variant="body1" sx={{ mt: 1, opacity: 0.7 }}>
              Email: {user.email}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 3 }}
              onClick={() => navigate("/home")}
            >
              Back to Home
            </Button>
          </Box>
        ) : (
          <Typography variant="h6" color="error" sx={{ mt: 3 }}>
            No user data available.
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default Profile;
