const express = require("express");
const accountbookController = require("../controllers/accountbookController");
const { authenticateJwt } = require("../middlewares/passportJwt");

const accountbookRouter = express.Router();

accountbookRouter.post("/posts", accountbookController.uploadAccountbook);
accountbookRouter.delete("/posts", accountbookController.deleteAccountbook);

module.exports = accountbookRouter;
