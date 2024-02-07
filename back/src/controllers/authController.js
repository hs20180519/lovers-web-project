const authService = require("../services/authService");

class AuthController {
  async sendVerificationEmail(req, res, next) {
    const { email } = req.body;
    //이메일 중복이면 아예 이메일 발송 못하도록 수정
    try {
      await authService.sendVerificationEmail(email);
      res.status(200).json({ message: "Verification email sent successfully!" });
    } catch (error) {
      next(error);
    }
  }

  async confirmEmailCode(req, res, next) {
    const { email, verificationCode } = req.body;
    try {
      await authService.confirmEmailCode(email, verificationCode);
      await authService.deleteVerificationCode(email);
      res.status(200).json({ message: "Email successfully verified!" });
    } catch (error) {
      next(error);
    }
  }

  async createUser(req, res, next) {
    const { email, password, nickname } = req.body;
    try {
      await authService.createUser(email, password, nickname);
      res.status(201).json({ message: "User created successfully!" });
    } catch (error) {
      return next(error);
    }
  }

  async loginUser(req, res, next) {
    const { nickname } = req.body;
    try {
      const user = await authService.loginUser(nickname);
      const { token, userId } = user;
      res.status(200).json({ token, userId });
    } catch (error) {
      next(error);
    }
  }
  async deleteUser(req, res, next) {
    const userId = req.user.user_id;
    try {
      await authService.deleteUser(userId);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  async findUserNickname(req, res, next) {
    const { email } = req.query;
    try {
      const user = await authService.getUserByEmail(email);
      await authService.sendNicknameEmail(user);
      res.status(200).json({ message: "Email sent with nickname successfully!" });
    } catch (error) {
      next(error);
    }
  }

  async findUserPassword(req, res, next) {
    const { nickname } = req.body;
    try {
      const user = await authService.getUserByNickname(nickname);
      await authService.sendTemporaryPasswordEmail(user.email);
      res.status(200).json({ message: "Temporary password sent successfully!" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
