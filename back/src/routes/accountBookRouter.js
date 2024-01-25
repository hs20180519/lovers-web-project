const express = require("express");
const accountBookController = require("../controllers/accountBookController");
const { authenticateJwt } = require("../middlewares/passportJwt");

const accountBookRouter = express.Router();

accountBookRouter.post("/posts", authenticateJwt, accountBookController.createAccountBook);
accountBookRouter.delete(
  "/posts/:accountBookPostId",
  authenticateJwt,
  accountBookController.deleteAccountBookById,
);
accountBookRouter.get(
  "/posts/:lover_id",
  authenticateJwt,
  accountBookController.getAccountBookByDate,
);

module.exports = accountBookRouter;
