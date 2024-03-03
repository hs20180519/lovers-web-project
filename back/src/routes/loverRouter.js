const express = require("express");
const loverController = require("../controllers/loverController");
const { authenticateJwt } = require("../middlewares/passportJwt");

const loverRouter = express.Router();

loverRouter.post("/make", loverController.temporalMakeLoverId);
loverRouter.get("/accept", authenticateJwt, loverController.getAcceptUserProfile);
loverRouter.post("/apply", authenticateJwt, loverController.applyLoverByEmail);
loverRouter.patch(
  "/accept",
  authenticateJwt,
  loverController.acceptLoverByEmail,
  loverController.makeLoverId,
);
loverRouter.delete("/", authenticateJwt, loverController.deleteLoverByUserId);
loverRouter.patch("/alias", authenticateJwt, loverController.makeLoverNickname);

module.exports = loverRouter;
