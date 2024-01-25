const express = require("express");
const commentController = require("../controllers/commentController");
const { authenticateJwt } = require("../middlewares/passportJwt");

const commentRouter = express.Router();

commentRouter.post("/comments", authenticateJwt, commentController.createComment);
commentRouter.get("/comments/:diaryPostId", authenticateJwt, commentController.getComments);
commentRouter.patch("/comments", authenticateJwt, commentController.updateComment);

module.exports = commentRouter;
