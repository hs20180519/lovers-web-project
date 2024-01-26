const express = require("express");
const authController = require("../controllers/authController");
const { authenticateLocal } = require("../middlewares/passportLocal");
const { authenticateJwt } = require("../middlewares/passportJwt");
const {
  authenticateGoogleLogin,
  handleGoogleLoginCallback,
} = require("../middlewares/passportGoogleLogin");
const authRouter = express.Router();

authRouter.post("/send-email", authController.sendVerificationEmail);
authRouter.post("/verify-code", authController.confirmEmailCode);
authRouter.post("/register", authController.createUser);
authRouter.post("/login", authenticateLocal, authController.loginUser);
authRouter.delete("/", authenticateJwt, authController.deleteUser);

authRouter.post("/google/login", authenticateGoogleLogin);
authRouter.post("/google/callback", handleGoogleLoginCallback);
authRouter.get("/nickname", authController.findUserNickname);
authRouter.patch("/password", authController.findUserPassword);

module.exports = authRouter;
