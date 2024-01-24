const loverService = require("../services/loverService");
const logger = require("../config/logger");

class LoverController {
  async makeLoverId(req, res) {
    const { userAId, userBId } = req.body;

    try {
      const user = await loverService.makeLoverId(userAId, userBId);
      if (!user) {
        res.status(500).json({
          error: "Error during making lover",
        });
      }
      res.status(201).json({ user });
    } catch (error) {
      logger.error("Error during makeLoverId", error);
    }
  }
}

module.exports = new LoverController();
