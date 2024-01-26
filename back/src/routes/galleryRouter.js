const express = require("express");
const { authenticateJwt } = require("../middlewares/passportJwt");
const galleryController = require("../controllers/galleryController");

const galleryRouter = express.Router();

galleryRouter.post("/posts", authenticateJwt, galleryController.createGalleryPhoto);

module.exports = galleryRouter;
