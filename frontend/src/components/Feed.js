import { useState, useEffect } from "react";
import { 
  Card, 
  CardContent, 
  Typography, 
  CircularProgress, 
  Box, 
  Container, 
  Button 
} from "@mui/material";
import { useNavigate } from "react-router-dom";

// Function to decode HTML entities & clean description
const decodeHTML = (html) => {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value.replace(/<\/?p>/g, "").trim(); // Remove <p> tags
};

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/rss`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch RSS feed");
        }
        return response.json();
      })
      .then((data) => {
        setPosts(data.slice(0, 10)); 
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress color="primary" />
      </Box>
    );

  if (error)
    return (
      <Typography color="error" sx={{ mt: 4, textAlign: "center" }}>
        Error: {error}
      </Typography>
    );

  return (
    <Container 
      maxWidth="md"
      sx={{ 
        mt: 2, 
        mb: 4, 
        p: 2, 
        background: "#121212", 
        borderRadius: "12px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)",
        height: "auto",
        minHeight: "90vh"
      }}
    >
      {/* 🔹 Back to Home Button - Always Visible */}
      <Box sx={{ 
        position: "sticky", 
        top: 0, 
        background: "#121212", 
        zIndex: 10, 
        py: 1, 
        textAlign: "center"
      }}>
        <Button 
          variant="contained" 
          color="secondary" 
          onClick={() => navigate("/home")}
          sx={{ fontWeight: "bold", color: "#fff" }}
        >
          Back to Home
        </Button>
      </Box>

      {/* 🔹 Pinned "Latest News & Updates" */}
      <Box sx={{
        position: "sticky",
        top: 50, 
        background: "#121212",
        zIndex: 9, 
        py: 1,
        textAlign: "center"
      }}>
        <Typography 
          variant="h5" 
          fontWeight="bold" 
          sx={{ mb: 2, color: "#fff", textAlign: "center" }}
        >
          🔥 Latest News & Updates
        </Typography>
      </Box>

      {posts.length === 0 ? (
        <Typography color="white" textAlign="center">No feed available.</Typography>
      ) : (
        posts.map((post, index) => (
          <Card 
            key={index} 
            sx={{ 
              p: 2, 
              mb: 2, 
              backgroundColor: "#1e1e1e", 
              borderRadius: "8px",
              boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.2)",
              overflow: "hidden"
            }}
          >
            <CardContent>
              <Typography 
                variant="h6" 
                fontWeight="bold" 
                sx={{ 
                  color: "#4fc3f7", 
                  mb: 1, 
                  whiteSpace: "normal", 
                  wordWrap: "break-word"
                }}
              >
                <a 
                  href={post.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{ 
                    textDecoration: "none", 
                    color: "inherit", 
                    display: "block"
                  }}
                >
                  {decodeHTML(post.title)}
                </a>
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: "#ccc", 
                  whiteSpace: "normal", 
                  wordWrap: "break-word"
                }}
              >
                {decodeHTML(post.description)}
              </Typography>
            </CardContent>
          </Card>
        ))
      )}
    </Container>
  );
};

export default Feed;
