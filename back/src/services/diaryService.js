const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
class DiaryService {
  //월별 조회
  async getMonthlyPosts(loverId, year, month) {
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

  async getPostByPostId(diaryPostId) {
    try {
      return await prisma.diary_posts.findUnique({
        where: {
          diary_post_id: diaryPostId,
        },
      });
    } catch (error) {
      throw error;
    }
  }
  async createPost(title, content, loverId, userId, postDate) {
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

  async updatePost(title, content, diaryPostId) {
    //비워있을 경우 기존의 title, content 유지
    title = title ?? undefined;
    content = content ?? undefined;
    try {
      return await prisma.diary_posts.update({
        where: {
          diary_post_id: diaryPostId,
        },
        data: {
          title,
          content,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async deletePost(diaryPostId) {
    try {
      return await prisma.diary_posts.delete({
        where: { diary_post_id: diaryPostId },
      });
    } catch (error) {
      throw error;
    }
  }
}
module.exports = new DiaryService();
