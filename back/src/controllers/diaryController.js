const diaryService = require("../services/diaryService");
const logger = require("../config/logger");

class DiaryController {
  async createDiaryPost(req, res) {
    const userId = req.user.user_id;
    const { title, content, postDate, loverId } = req.body;
    try {
      const post = await diaryService.createDiaryPost(title, content, loverId, userId, postDate);
      res.status(201).json({ post });
    } catch (error) {
      logger.error("Error during createPost", error);
      res.status(500).json({ error: "Internal server error during post creation." });
    }
  }

  async updateDiaryPost(req, res) {
    const { title, content, diaryPostId, postDate } = req.body;
    try {
      const post = await diaryService.updateDiaryPost(title, content, diaryPostId, postDate);
      res.status(200).json({ post });
    } catch (error) {
      logger.error("Error during updatePost", error);
      res.status(500).json({ error: "Internal server error during post update." });
    }
  }
  async deleteDiaryPost(req, res) {
    const diaryPostId = parseInt(req.params.diary_post_id);
    try {
      await diaryService.deleteDiaryPost(diaryPostId);
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
      res.status(200).json({ posts });
    } catch (error) {
      logger.error("Error during getPosts", error);
      res.status(500).json({ error: "Internal server error during posts get." });
    }
  }
}
module.exports = new DiaryController();
