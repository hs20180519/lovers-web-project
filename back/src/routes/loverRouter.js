const express = require("express");
const loverController = require("../controllers/loverController");
const { authenticateJwt } = require("../middlewares/passportJwt");

const loverRouter = express.Router();

loverRouter.post("/make", loverController.makeLoverId);
loverRouter.get("/search", loverController.getUserByEmail);
loverRouter.post("/apply", loverController.applyLoverByEmail);

module.exports = loverRouter;
