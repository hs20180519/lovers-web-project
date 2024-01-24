const express = require("express");
const diaryController = require("../controllers/diaryController");
const { authenticateJwt } = require("../middlewares/passportJwt");

const diaryRouter = express.Router();

diaryRouter.post("/posts", authenticateJwt, diaryController.createPost);
diaryRouter.patch("/posts", authenticateJwt, diaryController.updatePost);
diaryRouter.delete("/posts/:id", authenticateJwt, diaryController.deletePost);

module.exports = diaryRouter;
