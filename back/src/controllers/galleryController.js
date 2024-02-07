const galleryService = require("../services/galleryService");

class GalleryController {
  async createGalleryPhoto(req, res, next) {
    const { loverId, imagePath } = req.body;
    try {
      const photo = await galleryService.createGalleryPhoto(loverId, imagePath);
      res.status(201).json({ photo });
    } catch (error) {
      next(error);
    }
  }
  async getAllGalleryPhotos(req, res, next) {
    const loverId = parseInt(req.params.lover_id);
    try {
      const photos = await galleryService.getAllGalleryPhotos(loverId);
      res.status(200).json({ photos });
    } catch (error) {
      next(error);
    }
  }
  async deleteGalleryPhoto(req, res, next) {
    const galleryPhotoId = parseInt(req.params.gallery_photo_id);
    try {
      await galleryService.deleteGalleryPhoto(galleryPhotoId);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new GalleryController();
