const express = require("express");
const accountBookController = require("../controllers/accountBookController");
const { authenticateJwt } = require("../middlewares/passportJwt");

const accountBookRouter = express.Router();

accountBookRouter.post("/posts", accountBookController.uploadAccountBook);
accountBookRouter.delete("/posts", accountBookController.deleteAccountBook);
accountBookRouter.get("/posts", accountBookController.getAccountBook);

module.exports = accountBookRouter;
