const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
class CommentService {
  async createComments(diaryPostId, content) {
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
      return await prisma.diary_posts.findUnique({
        where: { diary_post_id: diaryPostId },
      });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new CommentService();
