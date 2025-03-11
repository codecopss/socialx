const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        console.log("User not found");
        return res.status(401).json({ message: "User not found" });
      }

      console.log("User verified:", req.user);
      next();
    } catch (error) {
      console.error("JWT verification failed:", error);
      return res.status(401).json({ message: "Invalid token" });
    }
  } else {
    console.log("No token provided");
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

module.exports = protect;
