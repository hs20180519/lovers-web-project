const express = require("express");
const loverController = require("../controllers/loverController");
const { authenticateJwt } = require("../middlewares/passportJwt");

const loverRouter = express.Router();

loverRouter.post("/make", loverController.makeLoverId);
loverRouter.post("/apply", loverController.applyLoverByEmail);
loverRouter.patch("/accept", loverController.acceptLoverByEmail);

module.exports = loverRouter;
