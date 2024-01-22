const express = require("express");
const authController = require("../controllers/authController");
const { authenticateLocal } = require("../middlewares/passportLocal");
const { authenticateJwt } = require("../middlewares/passportJwt");

const authRouter = express.Router();

authRouter.post("/send-email", authController.sendVerificationEmail);
authRouter.post("/verify-code", authController.confirmEmailCode);
authRouter.post("/register", authController.register);
authRouter.post("/login", authenticateLocal, authController.login);

authRouter.delete("/:userId", authenticateJwt, authController.deleteUser);

module.exports = authRouter;
