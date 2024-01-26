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
      return await prisma.account_book_posts.delete({
        where: { account_book_post_id: accountBookPostId },
      });
    } catch (error) {
      throw error;
    }
  }

  async getAccountBooksByDate(loverId, year, month) {
    try {
      return await prisma.account_book_posts.findMany({
        where: {
          lover_id: loverId,
          use_date: {
            // 요청받은 년도, 월의 1일부터 마지막 날까지의 데이터 조회
            gte: new Date(year, month - 1, 1),
            lt: new Date(year, month, 1),
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async updateAccountBookPost(accountBookPostId, category, amount, useDate, content) {
    try {
      return await prisma.account_book_posts.update({
        where: {
          account_book_post_id: accountBookPostId,
        },
        data: {
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
}

module.exports = new AccountBookService();
