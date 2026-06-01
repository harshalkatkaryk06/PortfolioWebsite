import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import Admin from "../models/Admin.js";
import { sendMail } from "../services/mailService.js";

export const forgotPassword = async (
  req,
  res
) => {
  try {
    const { email } = req.body; 

    if (!email?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const admin = await Admin.findOne({
      email: email.trim(),
    });

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    // Generate token
    const resetToken = crypto
      .randomBytes(32)
      .toString("hex");

    // Hash token before storing
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    admin.resetPasswordToken =
      hashedToken;

    admin.resetPasswordExpire =
      Date.now() + 15 * 60 * 1000;

    await admin.save();

    const resetUrl =
      `${
        process.env.NODE_ENV ===
        "production"
          ? process.env.PROD_FRONTEND_URI
          : process.env.DEV_FRONTEND_URI
      }/reset-password/${resetToken}`;

    await sendMail({
      to: admin.email,

      subject: "Password Reset Request",

      htmlContent: `
        <div style="font-family: Arial;">
          <h2>Password Reset</h2>

          <p>You requested a password reset.</p>

          <p>
            <a href="${resetUrl}">
              Reset Password
            </a>
          </p>

          <p>
            This link expires in 15 minutes.
          </p>
        </div>
      `,

      textContent: `
Password Reset

Open this link:

${resetUrl}

This link expires in 15 minutes.
      `,
    });

    return res.status(200).json({
      success: true,
      message:
        "Password reset email sent",
    });
  } catch (error) {
    console.error(
      "Forgot Password Error:",
      error.message
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to send reset email",
    });
  }
};

export const resetPassword = async (
  req,
  res
) => {
  try {
    const { token } = req.params;

    const { password } = req.body;

    if (!password?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Password required",
      });
    }

    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const admin = await Admin.findOne({
      resetPasswordToken:
        hashedToken,

      resetPasswordExpire: {
        $gt: Date.now(),
      },
    });

    if (!admin) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid or expired token",
      });
    }

    const salt =
      await bcrypt.genSalt(10);

    admin.password =
      await bcrypt.hash(
        password,
        salt
      );

    admin.resetPasswordToken =
      undefined;

    admin.resetPasswordExpire =
      undefined;

    await admin.save();

    return res.status(200).json({
      success: true,
      message:
        "Password reset successful",
    });
  } catch (error) {
    console.error(
      "Reset Password Error:",
      error.message
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to reset password",
    });
  }
};

export const getCurrentAdmin = async (req, res) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        authenticated: false,
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    return res.status(200).json({
      authenticated: true,
      admin: decoded,
    });
  } catch (error) {
    return res.status(401).json({
      authenticated: false,
    });
  }
};

// ---------------- REGISTER ----------------

export const registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existingAdmin = await Admin.findOne({
      email,
    });

    if (existingAdmin) {
      return res.status(400).json({
        message: "Admin already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(
      password,
      salt
    );

    const admin = await Admin.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      message: "Admin registered successfully",
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// ---------------- LOGIN ----------------

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const admin = await Admin.findOne({
      email,
    });

    if (!admin) {
      return res.status(404).json({
        message: "Admin not found",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      admin.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        id: admin._id,
        email: admin.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn:
          process.env.JWT_EXPIRES_IN || "7d",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure:
        process.env.NODE_ENV === "production",
      sameSite:
        process.env.NODE_ENV === "production"
          ? "none"
          : "lax",
      maxAge:
        7 * 24 * 60 * 60 * 1000,
      path: "/",
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// ---------------- LOGOUT ----------------

export const logoutAdmin = async (
  req,
  res
) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure:
        process.env.NODE_ENV === "production",
      sameSite:
        process.env.NODE_ENV === "production"
          ? "none"
          : "lax",
      path: "/",
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};