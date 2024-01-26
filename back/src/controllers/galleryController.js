const galleryService = require("../services/galleryService");
const logger = require("../config/logger");

class GalleryController {
  async createGalleryPhoto(req, res) {
    const { loverId, imagePath } = req.body;
    try {
      const photo = await galleryService.createGalleryPhoto(loverId, imagePath);
      res.status(201).json({ photo });
    } catch (error) {
      logger.error("Error during createGalleryPhoto", error);
      res.status(500).json({ error: "Internal server error during photo creation." });
    }
  }
  async getAllGalleryPhotos(req, res) {
    const loverId = parseInt(req.params.lover_id);
    try {
      const photos = await galleryService.getAllGalleryPhotos(loverId);
      res.status(200).json({ photos });
    } catch (error) {
      logger.error("Error during getAllGalleryPhoto", error);
      res.status(500).json({ error: "Internal server error during photo get" });
    }
  }
  async deleteGalleryPhoto(req, res) {
    const galleryPhotoId = parseInt(req.params.gallery_photo_id);
    try {
      await galleryService.deleteGalleryPhoto(galleryPhotoId);
      res.status(204).send();
    } catch (error) {
      logger.error("Error during deleteGalleryPhoto", error);
      res.status(500).json({ error: "Internal server error during photo deleting" });
    }
  }
}
module.exports = new GalleryController();
