const authService = require("../services/authService");
const logger = require("../config/logger");

class AuthController {
  async register(req, res) {
    const { email, password, nickname } = req.body;

    try {
      const user = await authService.registerUser(email, password, nickname);
      res.status(201).json({ user });
    } catch (error) {
      logger.error("Error during user registration", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async login(req, res) {
    const { email, password } = req.body;
    try {
      const user = await authService.loginUser(email, password);
      if (user) {
        res.status(200).json({ user });
      } else {
        res.status(401).json({ error: "Invalid email or password" });
      }
    } catch (error) {
      logger.error("Error during user login", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

module.exports = new AuthController();
