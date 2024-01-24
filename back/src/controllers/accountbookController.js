const accountBookService = require("../services/accountBookService");
const logger = require("../config/logger");

class AccountBookController {
  async uploadAccountBook(req, res) {
    const { loverId, userId, category, amount, useDate, content } = req.body;
    try {
      const user = await accountBookService.uploadAccountBook(
        loverId,
        userId,
        category,
        amount,
        useDate,
        content,
      );
      if (!user) {
        res.status(500).json({ error: "Error during uploading accountBook" });
      }
      res.status(201).json({ user });
    } catch (error) {
      logger.error("Error during uploadAccountBook", error);
    }
  }

  async deleteAccountBook(req, res) {
    const { accountBookPostId } = req.body;
    try {
      const result = await accountBookService.deleteAccountBook(accountBookPostId);
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

  async getAccountBook(req, res) {
    const { loverId, year, month } = req.body;
    try {
      const accountBookPost = await accountBookService.getAccountBook(loverId, year, month);

      res.status(201).json(accountBookPost);
    } catch (error) {
      logger.error("Error during getAccountBook", error);
    }
  }
}

module.exports = new AccountBookController();
