const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
class diaryService {
  async findLoverIdByUserId(userId) {
    try {
      const user = await prisma.lovers.findUnique({
        where: {
          user_id: userId,
        },
      });
      if (!user) {
        return false;
      }
      return user.lover_id;
    } catch (error) {
      throw error;
    }
  }
  async createPost(title, content, loverId, userId) {
    try {
      const post = await prisma.diary_posts.create({
        data: {
          title,
          content,
          lover_id: loverId,
          post_date: new Date(),
          user_id: userId,
        },
      });
      if (!post) {
        return false;
      }
      return post;
    } catch (error) {
      throw error;
    }
  }
}
module.exports = new diaryService();
