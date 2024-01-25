const commentService = require("../services/commentService");
const logger = require("../config/logger");

class CommentController {
  async createComment(req, res) {
    const { diaryPostId, content } = req.body;
    try {
      const comment = await commentService.createComment(diaryPostId, content);
      if (!comment) {
        res.status(500).json({
          error: "Error creating comments",
        });
      }
      res.status(200).json({ comment });
    } catch (error) {
      logger.error("Error during createComment");
      res.status(500).json({ error: "Internal server creating comments" });
    }
  }

  async getComments(req, res) {
    const diaryPostId = parseInt(req.params.diaryPostId);
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
    const { diaryPostId, commentId, content } = req.body;
    const comment = await commentService.updateComment(diaryPostId, commentId, content);
    try {
      if (!comment) {
        res.status(500).json({
          error: "Error updating comments",
        });
      }

      res.status(200).json({ comment });
    } catch (error) {
      logger.error("Error during updateComment");
      res.status(500).json({ error: "Internal server updating comments" });
    }
  }
}

module.exports = new CommentController();
