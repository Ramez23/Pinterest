const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User already exists with that email.");
    }

    const user = new User({ username, email, password });
    await user.save();

    res.status(201).send("User registered successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send("Authentication failed. User not found.");
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).send("Authentication failed. Wrong password.");
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ message: "Logged in successfully", token, user });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.protect = async (req, res, next) => {
  try {
    // Ensure the token is correctly extracted
    const token = req.header("Authorization").replace("Bearer ", "");

    if (!token) {
      return res.status(401).send("No token provided. Authorization denied.");
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token received:", token);
    console.log("Decoded token:", decoded);

    req.user = await User.findById(decoded.userId); // Find user from decoded token
    if (!req.user) {
      return res.status(401).send("User not found. Authorization denied.");
    }

    // Proceed to next middleware or route handler
    next();
  } catch (error) {
    console.error("Token verification error:", error.message); // Log token error
    res.status(401).send("Invalid token. Authorization denied.");
  }
};
