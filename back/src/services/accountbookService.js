const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class AccountbookService {
  async uploadAccountbook(lover_id, user_id, category, amount, use_date, content) {
    try {
      return await prisma.account_book_posts.create({
        data: {
          lover_id,
          user_id,
          category,
          amount,
          use_date,
          content,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async deleteAccountbook(accountbookPostId) {
    try {
      await prisma.account_book_posts.delete({
        where: { account_book_post_id: accountbookPostId },
      });
      return true;
    } catch (error) {
      throw error;
    }
  }

  async getAccountbook(lover_id, year, month) {
    try {
      const accountbookPost = await prisma.account_book_posts.findMany({
        where: {
          lover_id,
          AND: [
            { use_date: { gte: new Date(`${year}-${month}-01`) } },
            { use_date: { lt: new Date(`${year}-${month + 1}-01`) } },
          ],
        },
      });
      if (!accountbookPost) {
        return false;
      }

      return accountbookPost;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new AccountbookService();
