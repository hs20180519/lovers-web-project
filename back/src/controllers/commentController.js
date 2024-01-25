const commentService = require("../services/commentService");
const logger = require("../config/logger");

class CommentController {
  async createComment(req, res) {
    const { diaryPostId, content } = req.body;
    try {
      const comment = await commentService.createComment(diaryPostId, content);
      if (!comment) {
        res.status(500).json({
          error: "Error creating comment",
        });
      }
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
      if (!comments) {
        res.status(500).json({
          error: "Error getting comments",
        });
      }
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
      if (!comment) {
        res.status(500).json({
          error: "Error updating comment",
        });
      }

      res.status(200).json({ comment });
    } catch (error) {
      logger.error("Error during updateComment");
      res.status(500).json({ error: "Internal server updating comment" });
    }
  }
  async deleteComment(req, res) {
    const commentId = parseInt(req.params.comment_id);
    try {
      const result = await commentService.deleteComment(commentId);
      if (!result) {
        res.status(500).json({
          error: "Error deleting comment",
        });
      }
      res.status(204).send();
    } catch (error) {
      logger.error("Error during deleteComment");
      res.status(500).json({ error: "Internal server deleting comment" });
    }
  }
}

module.exports = new CommentController();
