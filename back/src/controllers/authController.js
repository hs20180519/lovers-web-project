const authService = require("../services/authService");
const logger = require("../config/logger");

class AuthController {
  async sendVerificationEmail(req, res) {
    const { email } = req.body;
    try {
      const user = await authService.sendVerificationEmail(email);
      if (!user) {
        res.status(500).json({
          error: "Error during sending email",
        });
      }
      res.status(201).json({ user });
    } catch (error) {
      logger.error("Error during sendVerificationEmail", error);
    }
  }

  async confirmEmailCode(req, res) {
    const { email, verificationCode } = req.body;
    try {
      const user = await authService.confirmEmailCode(email, verificationCode);
      if (user == null) {
        res.status(500).json({
          error: "해당 이메일로 전송된 인증번호가 없습니다.",
        });
      }
      if (!user) {
        res.status(500).json({
          error: "보안문자가 일치하지 않습니다.",
        });
      }
      res.status(201).json({ user });
    } catch (error) {
      logger.error("Error during verifyEmailCode", error);
    }
  }

  async createUser(req, res) {
    const { email, password, nickname } = req.body;

    try {
      const user = await authService.createUser(email, password, nickname);
      if (!user) {
        res.status(500).json({
          error: "회원가입에 실패했습니다.",
        });
      }

      const deleteUser = await authService.deleteVerificationCode(email);
      if (!deleteUser) {
        //시간이 지나면 자동 삭제 옵션을 주는게 나을 것
        res.status(500).json({
          error: "인증번호 삭제에 실패했습니다.",
        });
      }
      res.status(201).json({ user });
    } catch (error) {
      logger.error("Error during createUser", error);
    }
  }

  async loginUser(req, res) {
    const { nickname } = req.body;
    try {
      const user = await authService.loginUser(nickname);
      if (user) {
        res.status(200).json({ user });
      } else {
        res.status(401).json({
          error: "Invalid email or password",
        });
      }
    } catch (error) {
      logger.error("Error during user login", error);
    }
  }
  async deleteUser(req, res) {
    const userId = req.user.user_id;
    try {
      const result = await authService.deleteUser(userId);
      if (!result) {
        res.status(401).json({
          error: "Invalid userId",
        });
      }
      res.status(200).json({ message: "탈퇴 성공!" });
    } catch (error) {
      logger.error("Error during user delete", error);
    }
  }

  async findUserNickname(req, res) {
    const { email } = req.params;
    try {
      const user = await authService.getUserByEmail(email);
      if (!user) {
        res.status(500).json({ error: "Invalid email" });
      }

      const nickname = await authService.sendNicknameEmail(user);
      if (!nickname) {
        res.status(500).json({ error: "Error sending email" });
      }

      res.status(200).json({ nickname });
    } catch (error) {
      logger.error("Error during find user nickname", error);
    }
  }

  async findUserPassword(req, res) {
    const { nickname } = req.body;
    try {
      const user = await authService.getUserByNickname(nickname);
      if (!user) {
        res.status(401).json({
          error: "Invalid nickname",
        });
      }

      const updatedUser = await authService.sendTemporaryPasswordEmail(user.email);
      if (!updatedUser) {
        res.status(401).json({
          error: "Error in update password",
        });
      }
      res.status(200).json({ updatedUser });
    } catch (error) {
      logger.error("Error during find user password", error);
    }
  }
}

module.exports = new AuthController();
