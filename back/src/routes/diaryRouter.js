const express = require("express");
const diaryController = require("../controllers/diaryController");
const { authenticateJwt } = require("../middlewares/passportJwt");

const diaryRouter = express.Router();

diaryRouter.post("/posts", authenticateJwt, diaryController.createPost);
diaryRouter.patch("/posts", authenticateJwt, diaryController.updatePost);
diaryRouter.delete("/posts/:diary_post_id", authenticateJwt, diaryController.deletePost);
diaryRouter.get("/posts", authenticateJwt, diaryController.getPosts);

module.exports = diaryRouter;
