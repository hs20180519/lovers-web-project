const loverService = require("../services/loverService");
const logger = require("../config/logger");

class LoverController {
  async makeLoverId(req, res) {
    const { user_a_id, user_b_id } = req.body;

    try {
      const user = await loverService.makeLoverId(user_a_id, user_b_id);
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
