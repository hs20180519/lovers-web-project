const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class AccountBookService {
  async createAccountBook(userId, loverId, category, amount, useDate, content) {
    const newAccountBook = await prisma.account_book_posts.create({
      data: {
        lover_id: loverId,
        user_id: userId,
        category,
        amount,
        use_date: useDate,
        content,
      },
    });
    if (!newAccountBook) {
      throw new Error("Failed to create account book");
    }
  }

  async deleteAccountBookById(accountBookPostId) {
    await prisma.account_book_posts
      .delete({
        where: { account_book_post_id: accountBookPostId },
      })
      .catch(() => {
        throw new Error("Failed to delete account book");
      });
  }

  async getAccountBooksByDate(loverId, year, month) {
    const accountBookInformation = await prisma.account_book_posts.findMany({
      where: {
        lover_id: loverId,
        use_date: {
          // 요청받은 년도, 월의 1일부터 마지막 날까지의 데이터 조회
          gte: new Date(year, month - 1, 1),
          lt: new Date(year, month, 1),
        },
      },
    });
    if (!accountBookInformation) {
      throw new Error("Failed to get account book");
    }
    return accountBookInformation;
  }

  async updateAccountBookPost(accountBookPostId, category, amount, useDate, content) {
    const updateAccountBook = await prisma.account_book_posts.update({
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
    if (!updateAccountBook) {
      throw new Error("Failed to update account book");
    }
  }

  async findLoverIdByUserId(userId) {
    const lover = await prisma.lovers.findFirst({
      where: {
        OR: [{ user_a_id: userId }, { user_b_id: userId }],
      },
    });
    if (!lover) {
      throw new Error("Failed to find lover id");
    }
    return lover.lover_id;
  }
}

module.exports = new AccountBookService();
