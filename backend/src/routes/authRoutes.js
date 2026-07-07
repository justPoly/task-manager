const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    registerUser,
    loginUser,
    logoutUser
} = require("../controllers/authController");

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Logout
router.post("/logout", protect, logoutUser);

module.exports = router;