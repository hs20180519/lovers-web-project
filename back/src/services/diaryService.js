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

  async updatePost(title, content, diaryPostId) {
    //비워있을 경우 기존의 title, content 유지
    title = title ?? undefined;
    content = content ?? undefined;

    try {
      const updatedPost = await prisma.diary_posts.update({
        where: {
          diary_post_id: diaryPostId,
        },
        data: {
          title,
          content,
        },
      });
      if (!updatedPost) {
        return false;
      }
      return updatedPost;
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
module.exports = new diaryService();
