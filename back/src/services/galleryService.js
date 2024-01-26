const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
class GalleryService {
  async createGalleryPhoto(loverId, imagePath) {
    try {
      return await prisma.gallery_photos.create({
        data: {
          lover_id: loverId,
          image_path: imagePath,
          photo_date: new Date(),
        },
      });
    } catch (error) {
      throw error;
    }
  }
  async getAllGalleryPhotos(loverId) {
    try {
      return await prisma.gallery_photos.findMany({
        where: {
          lover_id: loverId,
        },
      });
    } catch (error) {
      throw error;
    }
  }
  async deleteGalleryPhoto(galleryPhotoId) {
    try {
      await prisma.gallery_photos.delete({
        where: {
          gallery_photo_id: galleryPhotoId,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
module.exports = new GalleryService();
