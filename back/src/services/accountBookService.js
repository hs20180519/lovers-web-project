const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class AccountBookService {
  async createAccountBook(loverId, userId, category, amount, useDate, content) {
    try {
      return await prisma.account_book_posts.create({
        data: {
          lover_id: loverId,
          user_id: userId,
          category,
          amount,
          use_date: useDate,
          content,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async deleteAccountBookById(accountBookPostId) {
    try {
      await prisma.account_book_posts.delete({
        where: { account_book_post_id: accountBookPostId },
      });
      return true;
    } catch (error) {
      throw error;
    }
  }

  async getAccountBookByDate(loverId, year, month) {
    try {
      const accountBookPosts = await prisma.account_book_posts.findMany({
        where: {
          lover_id: loverId,
          use_date: {
            gte: new Date(year, month - 1, 1),
            lt: new Date(year, month, 1),
          },
        },
      });
      if (!accountBookPosts) {
        return false;
      }

      return accountBookPosts;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new AccountBookService();
