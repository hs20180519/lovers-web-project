const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
class DiaryService {
  //월별 조회
  async getMonthlyDiaryPosts(loverId, year, month) {
    try {
      return await prisma.diary_posts.findMany({
        where: {
          lover_id: loverId,
          post_date: {
            gte: new Date(year, month - 1, 1),
            lt: new Date(year, month, 1),
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async createDiaryPost(title, content, loverId, userId, postDate) {
    try {
      return await prisma.diary_posts.create({
        data: {
          title,
          content,
          lover_id: loverId,
          post_date: postDate,
          user_id: userId,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async updateDiaryPost(title, content, diaryPostId, postDate) {
    try {
      return await prisma.diary_posts.update({
        where: {
          diary_post_id: diaryPostId,
        },
        data: {
          title,
          content,
          post_date: postDate,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async deleteDiaryPost(diaryPostId) {
    try {
      await prisma.diary_posts.delete({
        where: { diary_post_id: diaryPostId },
      });
    } catch (error) {
      throw error;
    }
  }
}
module.exports = new DiaryService();
