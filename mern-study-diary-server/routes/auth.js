const express = require("express");
const router = express.Router();
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

// @route Post api/auth/register
// @desc Register user
// @access public
// // @access Public
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  // Validation
  if (!username || !password)
    return res
      .status(400)
      .json({ success: false, message: "Missing username or password!" });

  try {
    // Check existing username in DB
    const user = await User.findOne({ username: username });

    if (user)
      return res
        .status(400)
        .json({ success: true, message: "Username already exists" });

    // All good
    const hashedPassword = await argon2.hash(password);
    const newUser = new User({
      username,
      password: hashedPassword,
    });

    await newUser.save();

    // Return token
    const accessToken = jwt.sign(
      { userId: newUser._id },
      process.env.ACCESS_TOKEN_SECRET
    );
    return res.status(200).json({
      success: true,
      message: "Registration successfully",
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route Post api/auth/login
// @desc Login user
// @access public
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Validation
  if (!username || !password)
    return res
      .status(400)
      .json({ success: false, message: "Missing username or password!" });

  try {
    // Check Existing user
    const user = await User.findOne({ username: username });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Incorrect username or password" });

    // Username found
    const passwordValid = await argon2.verify(user.password, password);
    if (!passwordValid)
      return res
        .status(400)
        .json({ success: false, message: "Incorrect password" });

    // All good
    // Return token
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET
    );
    return res
      .status(200)
      .json({ success: true, message: "Logged successfully", accessToken });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
