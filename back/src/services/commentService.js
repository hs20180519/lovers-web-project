const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
class CommentService {
  async createComment(diaryPostId, content) {
    const comment = await prisma.comments.create({
      data: { diary_post_id: diaryPostId, content, create_date: new Date() },
    });
    return comment;
  }

  async getComments(diaryPostId) {
    const comments = await prisma.comments.findMany({
      where: { diary_post_id: diaryPostId },
    });
    return comments;
  }

  async updateComment(commentId, content) {
    const updatedComment = await prisma.comments.update({
      where: { comment_id: commentId },
      data: { content },
    });
    return updatedComment;
  }

  async deleteComment(commentId) {
    await prisma.comments.delete({
      where: { comment_id: commentId },
    });
  }
}
module.exports = new CommentService();
