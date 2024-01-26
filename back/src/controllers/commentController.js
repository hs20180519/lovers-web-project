const commentService = require("../services/commentService");
const logger = require("../config/logger");

class CommentController {
  async createComment(req, res) {
    const { diaryPostId, content } = req.body;
    try {
      const comment = await commentService.createComment(diaryPostId, content);
      res.status(200).json({ comment });
    } catch (error) {
      logger.error("Error during createComment");
      res.status(500).json({ error: "Internal server creating comment" });
    }
  }

  async getComments(req, res) {
    const diaryPostId = parseInt(req.params.diary_post_id);
    try {
      const comments = await commentService.getComments(diaryPostId);
      res.status(200).json({ comments });
    } catch (error) {
      logger.error("Error during getComments");
      res.status(500).json({ error: "Internal server getting comments" });
    }
  }

  async updateComment(req, res) {
    const { commentId, content } = req.body;
    try {
      const comment = await commentService.updateComment(commentId, content);
      res.status(200).json({ comment });
    } catch (error) {
      logger.error("Error during updateComment");
      res.status(500).json({ error: "Internal server updating comment" });
    }
  }
  async deleteComment(req, res) {
    const commentId = parseInt(req.params.comment_id);
    try {
      await commentService.deleteComment(commentId);
      res.status(204).send();
    } catch (error) {
      logger.error("Error during deleteComment");
      res.status(500).json({ error: "Internal server deleting comment" });
    }
  }
}

module.exports = new CommentController();
