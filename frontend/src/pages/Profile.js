import React, { useEffect, useState } from "react";
import { Container, Typography, Paper, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // ✅ Get user details from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/login"); // Redirect to login if user not found
    }
  }, [navigate]);

  return (
    <Container maxWidth="sm">
      <Paper elevation={6} sx={{ p: 4, mt: 6, textAlign: "center" }}>
        <Typography variant="h4" fontWeight="bold">
          Profile Page
        </Typography>

        {user ? (
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
            Loading user data...
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default Profile;
