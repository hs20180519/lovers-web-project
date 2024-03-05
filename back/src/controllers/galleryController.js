const galleryService = require("../services/galleryService");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "gallery/"); // 파일이 업로드될 디렉토리를 설정합니다.
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // 파일 이름을 설정합니다.
  },
});
const upload = multer({ storage: storage }).single("image");

class GalleryController {
  async createGalleryPhoto(req, res, next) {
    upload(req, res, async () => {
      // multer 미들웨어를 호출하여 파일 업로드를 처리합니다.
      try {
        const loverId = parseInt(req.body.loverId);
        const imagePath = req.file.path;
        const photo = await galleryService.createGalleryPhoto(loverId, imagePath);
        res.status(201).json({ photo });
      } catch (error) {
        next(error);
      }
    });
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
