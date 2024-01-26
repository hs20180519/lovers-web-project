const authService = require("../services/authService");
const logger = require("../config/logger");

class AuthController {
  async sendVerificationEmail(req, res) {
    const { email } = req.body;
    //이메일 중복이면 아예 이메일 발송 못하도록 수정
    try {
      await authService.sendVerificationEmail(email);
      res.status(200).json({ message: "Verification email sent successfully." });
    } catch (error) {
      logger.error("Error during sendVerificationEmail", error);
      res.status(500).json({ error: "Internal server error during email verification." });
    }
  }

  async confirmEmailCode(req, res) {
    const { email, verificationCode } = req.body;
    try {
      const user = await authService.confirmEmailCode(email, verificationCode);
      if (user === null) {
        return res.status(404).json({
          error: "Verification code not found for the provided email.",
        });
      }
      if (user === false) {
        return res.status(400).json({
          error: "Incorrect verification code.",
        });
      }
      res.status(200).json({ message: "Email verification successful." });
    } catch (error) {
      logger.error("Error during confirmEmailCode", error);
      res.status(500).json({ error: "Internal server error during email verification." });
    }
  }

  async createUser(req, res) {
    const { email, password, nickname } = req.body;
    //email, nickname 중복 확인해야함
    try {
      await authService.createUser(email, password, nickname);
      await authService.deleteVerificationCode(email);
      res.status(201).json({ message: "User created successfully!" });
    } catch (error) {
      logger.error("Error during createUser", error);
      res.status(500).json({ error: "Internal server error during user creation." });
    }
  }

  async loginUser(req, res) {
    const { nickname } = req.body;
    try {
      const user = await authService.loginUser(nickname);
      const { token, userId } = user;
      res.status(200).json({ token, userId });
    } catch (error) {
      logger.error("Error during user login", error);
      res.status(500).json({ error: "Internal server error during user login." });
    }
  }
  async deleteUser(req, res) {
    const userId = req.user.user_id;
    try {
      await authService.deleteUser(userId);
      res.status(204).send();
    } catch (error) {
      logger.error("Error during user delete", error);
      res.status(500).json({ error: "Internal server error during user deletion." });
    }
  }

  async findUserNickname(req, res) {
    const { email } = req.query;
    try {
      const user = await authService.getUserByEmail(email);
      if (!user) {
        return res.status(404).json({ error: "User not found with the provided email." });
      }

      const nickname = await authService.sendNicknameEmail(user);
      if (!nickname) {
        return res.status(500).json({ error: "Error sending email" });
      }

      res.status(200).json({ nickname });
    } catch (error) {
      logger.error("Error during find user nickname", error);
      res.status(500).json({ error: "Internal server error during user nickname retrieval." });
    }
  }

  async findUserPassword(req, res) {
    const { nickname } = req.body;
    try {
      const user = await authService.getUserByNickname(nickname);
      if (!user) {
        return res.status(401).json({
          error: "Invalid nickname",
        });
      }

      const updatedUser = await authService.sendTemporaryPasswordEmail(user.email);
      if (!updatedUser) {
        return res.status(500).json({
          error: "Error in update password",
        });
      }
      res.status(200).json({ message: "User updated successfully!" });
    } catch (error) {
      logger.error("Error during find user password", error);
      res.status(500).json({ error: "Internal server error during password retrieval." });
    }
  }
}

module.exports = new AuthController();
