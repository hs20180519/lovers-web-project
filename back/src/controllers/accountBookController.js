const accountBookService = require("../services/accountBookService");
const logger = require("../config/logger");
const { use } = require("passport");

class AccountBookController {
  async createAccountBook(req, res, next) {
    const userId = req.user.user_id;
    const { loverId, category, amount, useDate, content } = req.body;
    try {
      await accountBookService.createAccountBook(
        loverId,
        userId,
        category,
        amount,
        useDate,
        content,
      );
      res.status(201).json({ message: "Account book successfully created!" });
    } catch (error) {
      next(error);
    }
  }

  async deleteAccountBookById(req, res, next) {
    const { accountBookPostId } = req.params;
    try {
      await accountBookService.deleteAccountBookById(Number(accountBookPostId));
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  async getAccountBooksByDate(req, res, next) {
    const loverId = req.params.lover_id;
    const { year, month } = req.query;
    try {
      const accountBookPosts = await accountBookService.getAccountBooksByDate(
        Number(loverId),
        year,
        month,
      );
      res.status(200).json(accountBookPosts);
    } catch (error) {
      next(error);
    }
  }

  async updateAccountBookPost(req, res) {
    const { accountBookPostId, category, amount, useDate, content } = req.body;
    try {
      await accountBookService.updateAccountBookPost(
        accountBookPostId,
        category,
        amount,
        useDate,
        content,
      );
      res.status(200).json({ message: "Account book successfully updated!" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AccountBookController();
