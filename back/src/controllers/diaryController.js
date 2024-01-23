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
      return res.status(201).json({ post });
    } catch (error) {
      logger.error("Error during createPost", error);
      res.status(500).json({ error: "Internal server error during post creation." });
    }
  }
}
module.exports = new diaryController();
