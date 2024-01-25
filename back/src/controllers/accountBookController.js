const accountBookService = require("../services/accountBookService");
const logger = require("../config/logger");

class AccountBookController {
  async createAccountBook(req, res) {
    const { loverId, userId, category, amount, useDate, content } = req.body;
    try {
      const user = await accountBookService.createAccountBook(
        loverId,
        userId,
        category,
        amount,
        useDate,
        content,
      );
      if (!user) {
        res.status(500).json({ error: "Error during creating accountBook" });
      }
      res.status(200).json({ user });
    } catch (error) {
      logger.error("Error during creatAccountBook", error);
    }
  }

  async deleteAccountBookById(req, res) {
    const { accountBookPostId } = req.params;
    try {
      const result = await accountBookService.deleteAccountBookById(Number(accountBookPostId));
      if (!result) {
        res.status(401).json({
          error: "Invalid accountBookPostId",
        });
      }
      res.status(204).send();
    } catch (error) {
      logger.error("Error during deleteAccountBook", error);
    }
  }

  async getAccountBookByDate(req, res) {
    const { loverId, year, month } = req.body;
    try {
      const accountBookPosts = await accountBookService.getAccountBookByDate(loverId, year, month);

      res.status(201).json(accountBookPosts);
    } catch (error) {
      logger.error("Error during getAccountBook", error);
    }
  }
}

module.exports = new AccountBookController();
