const commentService = require("../services/commentService");
const logger = require("../config/logger");

class CommentController {
  async createComment(req, res) {
    const { postDiaryId, content } = req.body;
    try {
      const comment = await commentService.createComment(postDiaryId, content);
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
    const postDiaryId = parseInt(req.params.postDiaryId);
    try {
      const comments = await commentService.getComments(postDiaryId);
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
}

module.exports = new CommentController();
