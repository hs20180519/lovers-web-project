const loverService = require("../services/loverService");
const logger = require("../config/logger");

class LoverController {
  async temporalMakeLoverId(req, res) {
    const { userAId, userBId } = req.body;
    try {
      const result = await loverService.makeLoverId(userAId, userBId);
      res.status(201).json({ result });
    } catch (error) {
      logger.error("Error during temporalMakeLoverId", error);
      res.status(500).json({ error: "Internal server error during making temporal loverId" });
    }
  }

  async makeLoverId(req, res) {
    const acceptUserEmail = req.user.email;
    const { applyUserEmail } = req.body;
    const userAId = await loverService.getUserIdByEmail(applyUserEmail);
    const userBId = await loverService.getUserIdByEmail(acceptUserEmail);
    try {
      const result = await loverService.makeLoverId(userAId, userBId);
      res.status(201).json({ result });
    } catch (error) {
      logger.error("Error during makeLoverId", error);
      res.status(500).json({ error: "Internal server error during making loverId" });
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

  async acceptLoverByEmail(req, res, next) {
    const acceptUserEmail = req.user.email;
    const { applyUserEmail } = req.body;
    try {
      await loverService.acceptLoverByEmail(applyUserEmail, acceptUserEmail);
      await loverService.deletePairingRequest(applyUserEmail, acceptUserEmail);
      next();
    } catch (error) {
      logger.error("Error during acceptLoverByEmail", error);
      res.status(500).json({ error: "Internal server error during accepting lover by email" });
    }
  }

  async deleteLoverByUserId(req, res) {
    const userId = req.user.user_id;
    try {
      await loverService.deleteLoverByUserId(userId);
      res.status(204).json();
    } catch (error) {
      logger.error("Error during deleteLoverByUserId");
      res.status(500).json({ error: "Internal server error during deleting lover by user id" });
    }
  }
}

module.exports = new LoverController();
