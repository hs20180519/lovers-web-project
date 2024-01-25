const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
class CommentService {
  async createComment(diaryPostId, content) {
    console.log(diaryPostId, content);
    try {
      return await prisma.comments.create({
        data: { diary_post_id: diaryPostId, content, create_date: new Date() },
      });
    } catch (error) {
      throw error;
    }
  }
  async getComments(diaryPostId) {
    try {
      return await prisma.comments.findMany({
        where: { diary_post_id: diaryPostId },
      });
    } catch (error) {
      throw error;
    }
  }
  async updateComment(commentId, content) {
    try {
      return await prisma.comments.update({
        where: { comment_id: commentId },
        data: { content },
      });
    } catch (error) {
      throw error;
    }
  }

  async deleteComment(commentId) {
    try {
      return await prisma.comments.delete({
        where: { comment_id: commentId },
      });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new CommentService();