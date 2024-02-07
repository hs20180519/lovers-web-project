const diaryService = require("../services/DiaryService");

class DiaryController {
  async createDiaryPost(req, res, next) {
    const userId = req.user.user_id;
    const { title, content, postDate, loverId } = req.body;
    try {
      const post = await diaryService.createDiaryPost(title, content, loverId, userId, postDate);
      res.status(201).json({ post });
    } catch (error) {
      next(error);
    }
  }
  async updateDiaryPost(req, res, next) {
    const { title, content, diaryPostId, postDate } = req.body;
    try {
      const updatedPost = await diaryService.updateDiaryPost(title, content, diaryPostId, postDate);
      res.status(200).json({ updatedPost });
    } catch (error) {
      next(error);
    }
  }
  async deleteDiaryPost(req, res, next) {
    const diaryPostId = parseInt(req.params.diary_post_id);
    try {
      await diaryService.deleteDiaryPost(diaryPostId);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
  async getMonthlyDiaryPosts(req, res, next) {
    const loverId = parseInt(req.params.lover_id);
    const { year, month } = req.query;
    try {
      const posts = await diaryService.getMonthlyDiaryPosts(loverId, year, month);
      res.status(200).json({ posts });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new DiaryController();
