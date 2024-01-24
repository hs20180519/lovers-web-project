const userService = require("../services/userService");
const logger = require("../config/logger");

class userController {
  async getUserProfile(req, res) {
    const userId = parseInt(req.params.userId);
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
}
module.exports = new userController();
