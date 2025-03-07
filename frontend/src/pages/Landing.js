import React from "react";
import { Container, Typography, Button, Box, Grid } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import GroupIcon from "@mui/icons-material/Group";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        background: "linear-gradient(135deg, #1a237e, #0d47a1)",
        color: "#fff",
        p: 4,
      }}
    >
      {/* Hero Section */}
      <Container maxWidth="md">
        <Typography variant="h2" fontWeight="bold" gutterBottom>
          Welcome to SocialX
        </Typography>
        <Typography variant="h5" sx={{ opacity: 0.8, mb: 3 }}>
          More than just a social media platform – we're a growing community.
          Connect, share, and grow together.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ fontSize: "18px", px: 4, py: 1 }}
          onClick={() => navigate("/signup")}
        >
          Join the Community
        </Button>
      </Container>

      {/* Features Section */}
      <Box sx={{ mt: 6, width: "100%" }}>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={4}>
            <FeatureCard
              icon={<PeopleIcon fontSize="large" />}
              title="Global Connectivity"
              description="Meet new people and connect with like-minded individuals from around the world."
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FeatureCard
              icon={<GroupIcon fontSize="large" />}
              title="Community Growth"
              description="Engage in meaningful discussions, groups, and events tailored to your interests."
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FeatureCard
              icon={<ConnectWithoutContactIcon fontSize="large" />}
              title="Seamless Interaction"
              description="Share thoughts, images, and videos effortlessly with your network."
            />
          </Grid>
        </Grid>
      </Box>

      {/* Call to Action */}
      <Box sx={{ mt: 6 }}>
        <Button
          variant="outlined"
          sx={{ color: "#fff", borderColor: "#fff", fontSize: "18px", px: 4, py: 1 }}
          onClick={() => navigate("/login")}
        >
          Already a Member? Login
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

export default Landing;
