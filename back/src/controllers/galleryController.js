const galleryService = require("../services/galleryService");
const logger = require("../config/logger");

class GalleryController {
  async createGalleryPhoto(req, res) {
    const { loverId, imagePath } = req.body;
    console.log(loverId, imagePath);
    try {
      const photo = await galleryService.createGalleryPhoto(loverId, imagePath);
      res.status(201).json({ photo });
    } catch (error) {
      logger.error("Error during createGalleryPhoto", error);
      res.status(500).json({ error: "Internal server error during photo creation." });
    }
  }
}
module.exports = new GalleryController();
