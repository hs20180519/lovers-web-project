const loverService = require("../services/loverService");
const logger = require("../config/logger");

class LoverController {
  async temporalMakeLoverId(req, res, next) {
    const { userAId, userBId } = req.body;
    try {
      const result = await loverService.makeLoverId(userAId, userBId);
      res.status(201).json({ result });
    } catch (error) {
      next(error);
    }
  }

  async makeLoverId(req, res, next) {
    const acceptUserEmail = req.user.email;
    const { applyUserEmail } = req.body;
    const userAId = await loverService.getUserIdByEmail(applyUserEmail);
    const userBId = await loverService.getUserIdByEmail(acceptUserEmail);
    try {
      const result = await loverService.makeLoverId(userAId, userBId);
      res.status(201).json({ result });
    } catch (error) {
      next(error);
    }
  }

  async applyLoverByEmail(req, res, next) {
    const applyUserEmail = req.user.email;
    const { acceptUserEmail } = req.body;
    try {
      const result = await loverService.applyLoverByEmail(applyUserEmail, acceptUserEmail);
      res.status(201).json({ result });
    } catch (error) {
      next(error);
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
      next(error);
    }
  }

  async deleteLoverByUserId(req, res, next) {
    const userId = req.user.user_id;
    try {
      await loverService.deleteLoverByUserId(userId);
      res.status(204).json();
    } catch (error) {
      next(error);
    }
  }

  async makeLoverNickname(req, res, next) {
    const userId = req.user.user_id;
    const { loverNickname } = req.body;
    try {
      const result = await loverService.makeLoverNickname(userId, loverNickname);
      res.status(201).json({ result });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new LoverController();
