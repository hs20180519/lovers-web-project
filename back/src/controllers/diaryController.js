const diaryService = require("../services/diaryService");
const logger = require("../config/logger");

class diaryController {
  async createPost(req, res) {
    const { title, content } = req.body;
    const loverId = req.body.lover_id;
    const userId = req.body.user_id;

    try {
      const post = await diaryService.createPost(title, content, loverId, userId);
      if (!post) {
        res.status(500).json({
          error: "Error creating post",
        });
      }
      res.status(201).json({ post });
    } catch (error) {
      logger.error("Error during createPost", error);
      res.status(500).json({ error: "Internal server error during post creation." });
    }
  }

  async updatePost(req, res) {
    const { title, content } = req.body;
    const diaryPostId = req.body.diary_post_id;
    try {
      const post = await diaryService.updatePost(title, content, diaryPostId);
      if (!post) {
        res.status(500).json({
          error: "Error updating post",
        });
      }
      res.status(200).json({ post });
    } catch (error) {
      logger.error("Error during updatePost", error);
      res.status(500).json({ error: "Internal server error during post update." });
    }
  }
  async deletePost(req, res) {
    const diaryPostId = req.body.diary_post_id;
    try {
      const post = await diaryService.deletePost(diaryPostId);
      if (!post) {
        res.status(500).json({
          error: "Error deleting post",
        });
      }
      res.status(204).send();
    } catch (error) {
      logger.error("Error during deletePost", error);
      res.status(500).json({ error: "Internal server error during post delete." });
    }
  }
}
module.exports = new diaryController();
