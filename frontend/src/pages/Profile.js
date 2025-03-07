import React, { useEffect, useState } from "react";
import { Container, Typography, Paper, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // Default to null instead of undefined
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");

      // ✅ Fix JSON error: Ensure storedUser is valid before parsing
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    } finally {
      setLoading(false); // Stop loading whether parsing succeeds or fails
    }
  }, []);

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

        {loading ? ( // ✅ Prevent disappearing by checking `loading` state
          <Typography variant="h6" color="warning" sx={{ mt: 3 }}>
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
            No user data found. Please{" "}
            <Button color="secondary" onClick={() => navigate("/login")}>
              login
            </Button>
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default Profile;
