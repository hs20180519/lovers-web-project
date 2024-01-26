const express = require("express");
const { authenticateJwt } = require("../middlewares/passportJwt");
const galleryController = require("../controllers/galleryController");

const galleryRouter = express.Router();

galleryRouter.post("/posts", authenticateJwt, galleryController.createGalleryPhoto);
galleryRouter.get("/posts/:lover_id", authenticateJwt, galleryController.getAllGalleryPhotos);
galleryRouter.delete(
  "/posts/:gallery_photo_id",
  authenticateJwt,
  galleryController.deleteGalleryPhoto,
);

module.exports = galleryRouter;
