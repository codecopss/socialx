const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// ✅ Configure CORS to allow requests from your frontend URL
const allowedOrigins = ["https://socialx-1.onrender.com"]; // Change this if needed
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

// ✅ Serve a basic message for root URL (to check if backend is running)
app.get("/", (req, res) => {
  res.send("SocialX Backend is Running 🚀");
});

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
