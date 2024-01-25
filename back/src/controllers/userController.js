const userService = require("../services/userService");
const logger = require("../config/logger");
const { extname } = require("path");
const multer = require("multer");
const { diskStorage } = require("multer");

class UserController {
  async getUserProfile(req, res) {
    const userId = parseInt(req.params.user_id);
    try {
      const user = await userService.getUserProfile(userId);
      if (!user) {
        res.status(500).json({
          error: "Error getting user",
        });
      }
      const { email, profile_image, lover_id, lover_nickname, nickname } = user;
      res.status(201).json({ email, profile_image, lover_id, lover_nickname, nickname });
    } catch (error) {
      logger.error("Error during getUserProfile", error);
      res.status(500).json({ error: "Internal server error getting user profile." });
    }
  }

  async uploadProfileImage(req, res) {
    try {
      const userId = parseInt(req.params.user_id);

      const storage = diskStorage({
        destination: "uploads/", //이미지 저장될 폴더
        filename: (req, file, cb) => {
          const ext = extname(file.originalname);
          const timestamp = new Date().getTime();
          cb(null, userId + "_" + timestamp + ext); //사용자 Id를 파일명에 추가하여 중복 X
        },
      });
      const upload = multer({ storage }).single("profileImage");

      upload(req, res, async (err) => {
        if (err) {
          logger.error("Error during profile image upload", err);
          res.status(500).json({ error: "Internal server error during profile image upload." });
        } else {
          const filename = req.file.filename;
          const updatedUser = await userService.uploadProfileImage(userId, filename);
          res.status(201).json({ updatedUser });
        }
      });
    } catch (error) {
      logger.error("Error during profile image upload", error);
      res.status(500).json({ error: "Internal server error during profile image upload." });
    }
  }
}
module.exports = new UserController();
