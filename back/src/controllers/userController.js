const userService = require("../services/userService");
const { extname } = require("path");
const multer = require("multer");
const { diskStorage } = require("multer");

class UserController {
  async getUserProfile(req, res, next) {
    const userId = req.user.user_id;
    try {
      const user = await userService.getUserProfile(userId);
      user.loverId = await userService.getLoverIdByUserId(userId).catch(() => null); // getLoverIdByUserId가 없으면 null 반환
      res.status(201).json({ user });
    } catch (error) {
      next(error);
    }
  }

  async uploadProfileImage(req, res, next) {
    try {
      const userId = req.user.user_id;
      const storage = diskStorage({
        destination: "uploads/", //이미지 저장될 폴더
        filename: (req, file, cb) => {
          const ext = extname(file.originalname);
          const timestamp = new Date().getTime();
          cb(null, userId + "_" + timestamp + ext); //사용자 Id를 파일명에 추가하여 중복 X
        },
      });
      const upload = multer({ storage }).single("profileImage");
      upload(req, res, async () => {
        const filename = req.file.filename;
        const updatedUser = await userService.uploadProfileImage(userId, filename);
        res.status(201).json({ updatedUser });
      });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new UserController();
