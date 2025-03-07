import React from "react";
import { Container, Typography, Button, Box, Grid } from "@mui/material";
import PostAddIcon from "@mui/icons-material/PostAdd";
import ForumIcon from "@mui/icons-material/Forum";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  // ✅ Handle Logout Properly
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove JWT token
    localStorage.removeItem("user"); // Remove user details (if stored)
    sessionStorage.clear(); // Clear session storage (optional)

    navigate("/login"); // Redirect to login page
    window.location.reload(); // Force refresh to reset auth state
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        textAlign: "center",
        background: "linear-gradient(135deg, #1a237e, #0d47a1)",
        color: "#fff",
        p: 4,
      }}
    >
      {/* Header */}
      <Container maxWidth="md">
        <Typography variant="h2" fontWeight="bold" gutterBottom>
          Your SocialX Feed
        </Typography>
        <Typography variant="h5" sx={{ opacity: 0.8, mb: 3 }}>
          Stay connected with your friends, post updates, and engage with the community.
        </Typography>
      </Container>

      {/* Features Section */}
      <Box sx={{ mt: 6, width: "100%" }}>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={4}>
            <FeatureCard
              icon={<PostAddIcon fontSize="large" />}
              title="Create Posts"
              description="Share your thoughts, images, and videos with the community."
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FeatureCard
              icon={<ForumIcon fontSize="large" />}
              title="Engage in Discussions"
              description="Join conversations, comment, and interact with posts."
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FeatureCard
              icon={<NotificationsActiveIcon fontSize="large" />}
              title="Stay Updated"
              description="Get notifications about new posts, likes, and comments."
            />
          </Grid>
        </Grid>
      </Box>

      {/* Actions */}
      <Box sx={{ mt: 6 }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ fontSize: "18px", px: 4, py: 1, mr: 2 }}
          onClick={() => navigate("/profile")}
        >
          Go to Profile
        </Button>

        {/* ✅ Fixed Logout Button */}
        <Button
          variant="outlined"
          sx={{
            color: "#fff",
            borderColor: "#fff",
            fontSize: "18px",
            px: 4,
            py: 1,
          }}
          onClick={handleLogout} // ✅ Calls the handleLogout function
        >
          Logout
        </Button>
      </Box>

      {/* New Button to Navigate to Feed */}
      <Box sx={{ mt: 4 }}>
        <Button
          variant="contained"
          color="secondary"
          sx={{ fontSize: "18px", px: 4, py: 1 }}
          onClick={() => navigate("/feed")}
        >
          View Latest Feed
        </Button>
      </Box>
    </Box>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  return (
    <Box
      sx={{
        p: 3,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderRadius: "10px",
        textAlign: "center",
        backdropFilter: "blur(10px)",
      }}
    >
      <Box sx={{ fontSize: "40px", mb: 2 }}>{icon}</Box>
      <Typography variant="h6" fontWeight="bold">
        {title}
      </Typography>
      <Typography sx={{ opacity: 0.8 }}>{description}</Typography>
    </Box>
  );
};

export default Home;
