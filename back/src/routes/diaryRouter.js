const express = require("express");
const diaryController = require("../controllers/diaryController");
const { authenticateJwt } = require("../middlewares/passportJwt");

const diaryRouter = express.Router();

diaryRouter.post("/posts", authenticateJwt, diaryController.createDiaryPost);
diaryRouter.patch("/posts", authenticateJwt, diaryController.updateDiaryPost);
diaryRouter.delete("/posts/:diary_post_id", authenticateJwt, diaryController.deleteDiaryPost);
diaryRouter.get("/posts/:lover_id", authenticateJwt, diaryController.getMonthlyDiaryPosts);

module.exports = diaryRouter;
