const accountBookService = require("../services/accountBookService");
const logger = require("../config/logger");
const { use } = require("passport");

class AccountBookController {
  async createAccountBook(req, res) {
    const userId = req.user.user_id;
    const { loverId, category, amount, useDate, content } = req.body;
    try {
      const user = await accountBookService.createAccountBook(
        loverId,
        userId,
        category,
        amount,
        useDate,
        content,
      );
      res.status(200).json({ user });
    } catch (error) {
      logger.error("Error during creatAccountBook", error);
    }
  }

  async deleteAccountBookById(req, res) {
    const { accountBookPostId } = req.params;
    try {
      const result = await accountBookService.deleteAccountBookById(Number(accountBookPostId));
      res.status(204).send();
    } catch (error) {
      logger.error("Error during deleteAccountBook", error);
    }
  }

  async getAccountBookByDate(req, res) {
    const loverId = req.params.lover_id;
    const { year, month } = req.query;
    try {
      const accountBookPosts = await accountBookService.getAccountBookByDate(
        Number(loverId),
        year,
        month,
      );
      res.status(201).json(accountBookPosts);
    } catch (error) {
      logger.error("Error during getAccountBook", error);
    }
  }

  async updateAccountBookPost(req, res) {
    const { accountBookPostId, category, amount, useDate, content } = req.body;
    try {
      const post = await accountBookService.updateAccountBookPost(
        accountBookPostId,
        category,
        amount,
        useDate,
        content,
      );
      res.status(200).json({ post });
    } catch (error) {
      logger.error("Error during updateAccountBookPost", error);
      res.status(500).json({ error: "Internal server error during accountBookPost update" });
    }
  }
}

module.exports = new AccountBookController();
