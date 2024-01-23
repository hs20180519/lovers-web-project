const accountbookService = require("../services/accountbookService");
const logger = require("../config/logger");

class AccountbookController {
  async uploadAccountbook(req, res) {
    const { lover_id, user_id, category, amount, use_date, content } = req.body;
    try {
      const user = await accountbookService.uploadAccountbook(
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
      logger.error("Error during uploadAccountbook", error);
    }
  }

  async deleteAccountbook(req, res) {
    const accountbookPostId = req.body.account_book_post_id;
    try {
      const result = await accountbookService.deleteAccountbook(accountbookPostId);
      if (!result) {
        res.status(401).json({
          error: "Invalid account_book_post_id",
        });
      }
      res.status(201).json({ message: "가계부 글 삭제 성공!" });
    } catch (error) {
      logger.error("Error during deleteAccountbook", error);
    }
  }

  async getAccountbook(req, res) {
    const { account_book_post_id } = req.body;
    try {
      const accountbookPost = await accountbookService.getAccountbook(account_book_post_id);
      if (!accountbookPost) {
        res.status(401).json({
          error: "Invalid account_book_post_id",
        });
      }
      res.status(201).json(accountbookPost);
    } catch (error) {
      logger.error("Error during getAccountbook", error);
    }
  }
}

module.exports = new AccountbookController();
