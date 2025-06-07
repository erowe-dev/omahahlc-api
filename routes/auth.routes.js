const User = require("../models/user.model");
const express = require("express");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { sendPasswordResetEmail } = require("../managers/mail-manager");
require("dotenv").config();

const router = express.Router();

router.post("/forgot-password", async (req, res, next) => {
  try {
    const email = req.body.email.toLowerCase();

    if (!email) {
      return res.status(400).json({ error: "Email is required." });
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      const error = new Error("An error occurred.");
      return next(error);
    }

    const token = jwt.sign({ email: user.email }, process.env.API_SECRET, {
      expiresIn: "1h",
    });

    var e = await sendPasswordResetEmail(user.email, token);

    if (e) {
      user.passwordResetToken = token;
      await user.save();
    } else {
      const error = new Error("An error occurred while sending the email.");
      return next(error);
    }

    return res.status(200).json({
      message: "Please check your inbox.",
    });
  } catch (error) {
    return next(error);
  }
});

router.post("/reset-password", async (req, res, next) => {
  try {
    const { password, token } = req.body;

    if (!token || !password) {
      return res
        .status(400)
        .json({ error: "Token and new password are required." });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.API_SECRET);
    } catch (err) {
      return res.status(400).json({ error: "Invalid or expired token." });
    }

    const user = await User.findOne({ email: decoded.email }).select(
      "+passwordResetToken"
    );

    if (!user || user.passwordResetToken !== token) {
      return res.status(400).json({ error: "Invalid or expired token." });
    }

    user.password = password;
    user.passwordResetToken = null;
    await user.save();

    return res.status(200).json({ message: "Password reset successful." });
  } catch (error) {
    return next(error);
  }
});

router.post("/sign-in", async (req, res, next) => {
  passport.authenticate("login", async (err, user) => {
    try {
      if (err || !user) {
        const error = new Error("An error occurred.");

        return next(error);
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);
        const body = {
          _id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
        };

        const token = jwt.sign({ user: body }, process.env.API_SECRET, {
          expiresIn: "30d",
        });

        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

module.exports = router;
