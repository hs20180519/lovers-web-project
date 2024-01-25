const diaryService = require("../services/diaryService");
const logger = require("../config/logger");

class DiaryController {
  async createDiaryPost(req, res) {
    const { title, content, loverId, userId, postDate } = req.body;
    try {
      const post = await diaryService.createDiaryPost(title, content, loverId, userId, postDate);
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

  async updateDiaryPost(req, res) {
    const { title, content, diaryPostId } = req.body;
    try {
      const post = await diaryService.updateDiaryPost(title, content, diaryPostId);
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
  async deleteDiaryPost(req, res) {
    const diaryPostId = parseInt(req.params.diary_post_id);
    try {
      const post = await diaryService.deleteDiaryPost(diaryPostId);
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
  async getMonthlyDiaryPosts(req, res) {
    const loverId = parseInt(req.params.lover_id);
    const { year, month } = req.query;
    try {
      const posts = await diaryService.getMonthlyDiaryPosts(loverId, year, month);
      if (!posts) {
        res.status(500).json({
          error: "Error getting monthly posts",
        });
      }
      res.status(200).json({ posts });
    } catch (error) {
      logger.error("Error during getPosts", error);
      res.status(500).json({ error: "Internal server error during posts get." });
    }
  }
}
module.exports = new DiaryController();
