const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class DiaryService {
  async createDiaryPost(title, content, loverId, userId, postDate) {
    const post = await prisma.diary_posts.create({
      data: {
        title,
        content,
        lover_id: loverId,
        post_date: postDate,
        user_id: userId,
      },
    });
    return post;
  }

  async updateDiaryPost(title, content, diaryPostId, postDate) {
    const post = await prisma.diary_posts.update({
      where: {
        diary_post_id: diaryPostId,
      },
      data: {
        title,
        content,
        post_date: postDate,
      },
    });
    return post;
  }

  async deleteDiaryPost(diaryPostId) {
    await prisma.diary_posts.delete({
      where: { diary_post_id: diaryPostId },
    });
  }
  async getMonthlyDiaryPosts(loverId, year, month, day) {
    const posts = await prisma.diary_posts.findMany({
      where: {
        lover_id: loverId,
        post_date: {
          gte: new Date(year, month - 1), // 주어진 날짜의 시작
          lt: new Date(year, month), // 다음 날의 시작
        },
      },
    });
    return posts;
  }
}
module.exports = new DiaryService();
