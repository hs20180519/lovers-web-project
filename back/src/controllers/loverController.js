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

  async applyLoverByEmail(req, res) {
    const applyUserEmail = req.user.email;
    const { acceptUserEmail } = req.body;
    try {
      const result = await loverService.applyLoverByEmail(applyUserEmail, acceptUserEmail);
      res.status(201).json({ result });
    } catch (error) {
      logger.error("Error during applyLoverByEmail", error);
      res.status(500).json({ error: "Internal server error during applying lover by email" });
    }
  }

  async acceptLoverByEmail(req, res) {
    const acceptUserEmail = req.user.email;
    const { applyUserEmail } = req.body;
    try {
      await loverService.accpetLoverByEmail(applyUserEmail, acceptUserEmail);
      await loverService.deletePairingRequest(applyUserEmail, acceptUserEmail);
      const userAId = await loverService.getUserIdByEmail(applyUserEmail);
      const userBId = await loverService.getUserIdByEmail(acceptUserEmail);
      const result = await loverService.makeLoverId(userAId, userBId);
      res.status(201).json({ result });
    } catch (error) {
      logger.error("Error during acceptLoverByEmail", error);
      res.status(500).json({ error: "Internal server error during accepting lover by email" });
    }
  }
}

module.exports = new LoverController();
