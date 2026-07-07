const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health Check Route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Task Management API is running 🚀"
    });
});

// Authentication Routes
app.use("/api/auth", authRoutes);

module.exports = app;