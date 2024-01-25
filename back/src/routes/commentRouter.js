const express = require("express");
const commentController = require("../controllers/commentController");
const { authenticateJwt } = require("../middlewares/passportJwt");

const commentRouter = express.Router();

commentRouter.post("/comments", authenticateJwt, commentController.createComment);
commentRouter.get("/comments/:diary_post_id", authenticateJwt, commentController.getComments);
commentRouter.patch("/comments", authenticateJwt, commentController.updateComment);
commentRouter.delete("/comments/:comment_id", authenticateJwt, commentController.deleteComment);

module.exports = commentRouter;
