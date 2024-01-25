const express = require("express");
const accountBookController = require("../controllers/accountBookController");
const { authenticateJwt } = require("../middlewares/passportJwt");

const accountBookRouter = express.Router();

accountBookRouter.post("/posts", accountBookController.createAccountBook);
accountBookRouter.delete("/posts/:accountBookPostId", accountBookController.deleteAccountBookById);
accountBookRouter.get("/posts/:lover_id", accountBookController.getAccountBookByDate);

module.exports = accountBookRouter;
