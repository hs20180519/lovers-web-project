const express = require("express");
const authController = require("../controllers/authController");
const {
  authenticateLocal,
} = require("../middlewares/passportLocal");

const authRouter = express.Router();

authRouter.post(
  "/send-email",
  authController.sendVerificationEmail,
);
authRouter.post(
  "/verify-code",
  authController.verifyEmailCode,
);
authRouter.post(
  "/register",
  authController.register,
);
authRouter.post(
  "/login",
  authenticateLocal,
  authController.login,
);

module.exports = authRouter;
