const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// ✅ Configure CORS to allow requests from your frontend URL
const allowedOrigins = ["https://socialx-1.onrender.com"];
app.use(
  cors({
    origin: allowedOrigins,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

// ✅ Define API Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/posts", require("./routes/postRoutes"));
app.use("/api/rss", require("./routes/rssRoutes"));

// ✅ Serve static files from frontend (React)
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/frontend/build")));

// ✅ Catch-all route to serve React frontend (Fixes 404 on refresh)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
});

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
