const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
class GalleryService {
  async createGalleryPhoto(loverId, imagePath) {
    try {
      return await prisma.gallery_posts.create({
        data: {
          lover_id: loverId,
          image_path: imagePath,
          post_date: new Date(),
        },
      });
    } catch (error) {
      throw error;
    }
  }
  async getAllGalleryPhotos(loverId) {
    try {
      return await prisma.gallery_posts.findMany({
        where: {
          lover_id: loverId,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
module.exports = new GalleryService();
