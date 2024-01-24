const express = require("express");
const userController = require("../controllers/userController");
const { authenticateJwt } = require("../middlewares/passportJwt");

const userRouter = express.Router();

userRouter.get("/users/:userId", authenticateJwt, userController.getUserProfile);
userRouter.post(
  "/images/:userId/profile-image",
  authenticateJwt,
  userController.uploadProfileImage,
);

module.exports = userRouter;
