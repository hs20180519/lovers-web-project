const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class DiaryService {
  async createDiaryPost(title, content, loverId, userId, postDate) {
    await prisma.diary_posts.create({
      data: {
        title,
        content,
        lover_id: loverId,
        post_date: postDate,
        user_id: userId,
      },
    });
  }

  async updateDiaryPost(title, content, diaryPostId, postDate) {
    await prisma.diary_posts.update({
      where: {
        diary_post_id: diaryPostId,
      },
      data: {
        title,
        content,
        post_date: postDate,
      },
    });
  }

  async deleteDiaryPost(diaryPostId) {
    await prisma.diary_posts.delete({
      where: { diary_post_id: diaryPostId },
    });
  }
  async getMonthlyDiaryPosts(loverId, year, month) {
    await prisma.diary_posts.findMany({
      where: {
        lover_id: loverId,
        post_date: {
          gte: new Date(year, month - 1, 1),
          lt: new Date(year, month, 1),
        },
      },
    });
  }
}
module.exports = new DiaryService();
