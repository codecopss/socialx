import React, { useEffect, useState } from "react";
import { Container, Typography, Paper, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await fetch(
          "https://socialx-1.onrender.com/api/auth/me", // ✅ Your backend API URL
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user:", error);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={6}
        sx={{
          p: 4,
          mt: 6,
          textAlign: "center",
          backgroundColor: "#1e1e1e",
          color: "#fff",
          borderRadius: "12px",
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          Profile Page
        </Typography>

        {loading ? (
          <Typography variant="h6" sx={{ mt: 3 }}>
            Loading user data...
          </Typography>
        ) : user ? (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h5">Welcome, {user.name}!</Typography>
            <Typography variant="body1" sx={{ mt: 1, opacity: 0.8 }}>
              Email: {user.email}
            </Typography>

            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 3, mr: 2 }}
              onClick={() => navigate("/home")}
            >
              Back to Home
            </Button>

            <Button
              variant="contained"
              color="error"
              sx={{ mt: 3 }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>
        ) : (
          <Typography variant="h6" color="error" sx={{ mt: 3 }}>
            Failed to load user data.
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default Profile;
