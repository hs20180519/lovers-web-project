const express = require("express");
const accountBookController = require("../controllers/accountBookController");
const { authenticateJwt } = require("../middlewares/passportJwt");

const accountBookRouter = express.Router();

accountBookRouter.post("/posts", accountBookController.uploadAccountBook);
accountBookRouter.delete("/posts/:accountBookPostId", accountBookController.deleteAccountBookById);
accountBookRouter.get("/posts", accountBookController.getAccountBookByDate);

module.exports = accountBookRouter;
