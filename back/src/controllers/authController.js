const authService = require("../services/authService");
const logger = require("../config/logger");

class AuthController {
  async sendVerificationEmail(req, res) {
    const { email } = req.body;
    try {
      const user =
        await authService.sendVerificationEmail(
          email,
        );
      if (!user) {
        res.status(500).json({
          error: "Error during sending email",
        });
      }
      res.status(201).json({ user });
    } catch (error) {
      logger.error(
        "Error during sendVerificationEmail",
        error,
      );
    }
  }

  async verifyEmailCode(req, res) {
    const { email, verificationCode } = req.body;
    try {
      const user =
        await authService.confirmEmailCode(
          email,
          verificationCode,
        );
      if (user == null) {
        res.status(500).json({
          error:
            "해당 이메일로 전송된 인증번호가 없습니다.",
        });
      }
      if (!user) {
        res.status(500).json({
          error: "보안문자가 일치하지 않습니다.",
        });
      }
      res.status(201).json({ user });
    } catch (error) {
      logger.error(
        "Error during verifyEmailCode",
        error,
      );
    }
  }

  async register(req, res) {
    const { email, password, nickname } =
      req.body;

    try {
      const user = await authService.register(
        email,
        password,
        nickname,
      );
      if (!user) {
        res.status(500).json({
          error: "회원가입에 실패했습니다.",
        });
      }
      const deleteUser =
        await authService.deleteVerificationCode(
          email,
        );

      if (!deleteUser) {
        //시간이 지나면 자동 삭제 옵션을 주는게 나을 것
        res.status(500).json({
          error: "인증번호 삭제에 실패했습니다.",
        });
      }
      res.status(201).json({ user });
    } catch (error) {
      logger.error(
        "Error during register",
        error,
      );
    }
  }

  async login(req, res) {
    const { email, password } = req.body;
    try {
      const user = await authService.login(
        email,
        password,
      );
      if (user) {
        res.status(200).json({ user });
      } else {
        res.status(401).json({
          error: "Invalid email or password",
        });
      }
    } catch (error) {
      logger.error(
        "Error during user login",
        error,
      );
    }
  }
}

module.exports = new AuthController();
