import React, { useEffect, useState } from "react";
import { Container, Typography, Paper, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // ✅ Safely fetch user data from localStorage
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser && parsedUser.name && parsedUser.email) {
          setUser(parsedUser);
        } else {
          localStorage.removeItem("user"); // Remove corrupted data
          navigate("/login");
        }
      } else {
        navigate("/login"); // Redirect if no user
      }
    } catch (error) {
      console.error("Error loading user data:", error);
      localStorage.removeItem("user"); // Clear bad data
      navigate("/login");
    }
  }, [navigate]);

  // ✅ Logout function
  const handleLogout = () => {
    localStorage.removeItem("user");
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

        {user ? (
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
            Loading user data...
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default Profile;
