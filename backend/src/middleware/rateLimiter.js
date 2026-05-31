import rateLimit from "express-rate-limit";

export const contactRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes

  max: 5,

  standardHeaders: true,

  legacyHeaders: false,

  handler: (req, res) => {
    return res.status(429).json({
      success: false,
      message:
        "Too many enquiries submitted. Please try again after 15 minutes.",
    });
  },
});