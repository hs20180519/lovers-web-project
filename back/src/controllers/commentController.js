const commentService = require("../services/commentService");

class CommentController {
  async createComment(req, res, next) {
    const { diaryPostId, content } = req.body;
    try {
      const comment = await commentService.createComment(diaryPostId, content);
      res.status(200).json({ comment });
    } catch (error) {
      next(error);
    }
  }

  async getComments(req, res, next) {
    const diaryPostId = parseInt(req.params.diary_post_id);
    try {
      const comments = await commentService.getComments(diaryPostId);
      res.status(200).json({ comments });
    } catch (error) {
      next(error);
    }
  }

  async updateComment(req, res, next) {
    const { commentId, content } = req.body;
    try {
      const comment = await commentService.updateComment(commentId, content);
      res.status(200).json({ comment });
    } catch (error) {
      next(error);
    }
  }
  async deleteComment(req, res, next) {
    const commentId = parseInt(req.params.comment_id);
    try {
      await commentService.deleteComment(commentId);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CommentController();
