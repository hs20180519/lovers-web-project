const express = require("express");
const authController = require("../controllers/authController");
const logger = require("../config/logger");
const { authenticateLocal } = require("../middlewares/passportLocal");

const authRouter = express.Router();

authRouter.post("/register", authController.register);

authRouter.post("/login", authenticateLocal, authController.login);

module.exports = authRouter;
