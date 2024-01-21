const authService = require("../services/authService");
const logger = require("../config/logger");

class AuthController {
  async test(req, res) {
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
      logger.error("Error during test", error);
    }
  }

  async test2(req, res) {
    const { email, verificationCode } = req.body;
    try {
      const user =
        await authService.verifyEmailCode(
          email,
          verificationCode,
        );
      if (!user) {
        res.status(500).json({
          error: "보안문자가 일치하지 않습니다.",
        });
      }
      console.log("일치");
      res.status(201).json({ user });
    } catch (error) {
      logger.error("test2", error);
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
      res.status(201).json({ user });
    } catch (error) {
      logger.error(
        "Error during user registration",
        error,
      );
      res
        .status(500)
        .json({ error: "Internal server error" });
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
      res
        .status(500)
        .json({ error: "Internal server error" });
    }
  }
}

module.exports = new AuthController();
