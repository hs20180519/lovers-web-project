const express = require("express");
const userController = require("../controllers/userController");
const { authenticateJwt } = require("../middlewares/passportJwt");

const userRouter = express.Router();

userRouter.get("/users/:user_id", authenticateJwt, userController.getUserProfile);
userRouter.post(
  "/images/:user_id/profile-image",
  authenticateJwt,
  userController.uploadProfileImage,
);

module.exports = userRouter;
