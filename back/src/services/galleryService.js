const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
class GalleryService {
  async createGalleryPhoto(loverId, imagePath) {
    const photo = await prisma.gallery_photos.create({
      data: {
        lover_id: loverId,
        image_path: imagePath,
        photo_date: new Date(),
      },
    });
    return photo;
  }
  async getAllGalleryPhotos(loverId) {
    const photos = await prisma.gallery_photos.findMany({
      where: {
        lover_id: loverId,
      },
    });
    return photos;
  }
  async deleteGalleryPhoto(galleryPhotoId) {
    await prisma.gallery_photos.delete({
      where: {
        gallery_photo_id: galleryPhotoId,
      },
    });
  }
}
module.exports = new GalleryService();
