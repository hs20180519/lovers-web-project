const loverService = require("../services/loverService");
const logger = require("../config/logger");

class LoverController {
  async makeLoverId(req, res) {
    const { userAId, userBId } = req.body;

    try {
      const user = await loverService.makeLoverId(userAId, userBId);
      res.status(201).json({ user });
    } catch (error) {
      logger.error("Error during makeLoverId", error);
      res.status(500).json({ error: "Internal server error during making lover" });
    }
  }

  async getUserByEmail(req, res) {
    const { email } = req.query;
    try {
      const user = await loverService.getUserByEmail(email);
      const { nickname } = user;
      res.status(200).json({ nickname });
    } catch (error) {
      logger.error("Error during getUserByEmail");
      res.status(500).json({ error: "Internal server error during getting user by email" });
    }
  }
}

module.exports = new LoverController();
