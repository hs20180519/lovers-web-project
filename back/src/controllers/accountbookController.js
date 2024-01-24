const accountBookService = require("../services/accountBookService");
const logger = require("../config/logger");

class AccountBookController {
  async uploadAccountBook(req, res) {
    const { lover_id, user_id, category, amount, use_date, content } = req.body;
    try {
      const user = await accountBookService.uploadAccountBook(
        lover_id,
        user_id,
        category,
        amount,
        use_date,
        content,
      );
      if (!user) {
        res.status(500).json({ error: "Error during uploading accountbook" });
      }
      res.status(201).json({ user });
    } catch (error) {
      logger.error("Error during uploadAccountBook", error);
    }
  }

  async deleteAccountBook(req, res) {
    const accountBookPostId = req.body.account_book_post_id;
    try {
      const result = await accountBookService.deleteAccountBook(accountBookPostId);
      if (!result) {
        res.status(401).json({
          error: "Invalid account_book_post_id",
        });
      }
      res.status(204).send();
    } catch (error) {
      logger.error("Error during deleteAccountBook", error);
    }
  }

  async getAccountBook(req, res) {
    const { lover_id, year, month } = req.body;
    try {
      const accountBookPost = await accountBookService.getAccountBook(lover_id, year, month);

      res.status(201).json(accountBookPost);
    } catch (error) {
      logger.error("Error during getAccountBook", error);
    }
  }
}

module.exports = new AccountBookController();
