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
}
module.exports = new GalleryController();
