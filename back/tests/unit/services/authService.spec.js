const AuthService = require("../../../src/services/authService");

describe("AuthService", () => {
  let testUser;

  beforeAll(async () => {
    testUser = {
      email: "conjugate0519@gmail.com",
      password: "testPassword",
      nickname: "testUser",
    };
  });
  afterAll(async () => {
    //await AuthService.deleteAllUsers();
  });

  describe("sendVerificationEmail", () => {
    it("should send a verification email", async () => {
      const { email } = testUser;
      await expect(AuthService.sendVerificationEmail(email)).resolves.not.toThrow();
    });
  });

  describe("confirmEmailCode", () => {
    it("should confirm the email code", async () => {
      const { email } = testUser;
      await expect(AuthService.confirmEmailCode(email, "870354")).resolves.not.toThrow();
    });

    it("should throw error if incorrect verification code", async () => {
      const { email } = testUser;
      await expect(AuthService.confirmEmailCode(email, "654321")).rejects.toThrow(
        "Incorrect verification code.",
      );
    });
  });

  describe("createUser", () => {
    it("should create a new user", async () => {
      const { email, password, nickname } = testUser;
      await expect(AuthService.createUser(email, password, nickname)).resolves.not.toThrow();
    });

    it("should throw error if email already exists", async () => {
      const { email, password, nickname } = testUser;
      await expect(AuthService.createUser(email, password, nickname)).rejects.toThrow(
        "Email already exists.",
      );
    });

    it("should throw error if nickname already exists", async () => {
      const { password, nickname } = testUser;
      await expect(
        AuthService.createUser("anotheruser@exmaple.com", password, nickname),
      ).rejects.toThrow("Nickname already exists.");
    });
  });

  describe("deleteUser", () => {
    it("should delete a user", async () => {
      const { email } = testUser;
      const user = await AuthService.getUserByEmail(email);
      await expect(AuthService.deleteUser(user.user_id)).resolves.not.toThrow();
    });

    it("should throw error if user not found", async () => {
      const nonExistentUserId = "nonExistentUserId";
      await expect(AuthService.deleteUser(nonExistentUserId)).rejects.toThrow(
        "Failed to delete user for user_id nonExistentUserId",
      );
    });
  });
  describe("loginUser", () => {
    it("should login user and return token and userId", async () => {
      const { nickname } = testUser;
      const { token } = await AuthService.loginUser(nickname);
      expect(token).toBeDefined();
    });

    it("should throw error if user not found", async () => {
      const nonExistentNickname = "nonExistentUser";
      await expect(AuthService.loginUser(nonExistentNickname)).rejects.toThrow(
        "User not found with the provided nickname.",
      );
    });
  });

  describe("getUserByEmail", () => {
    it("should return user by email", async () => {
      const { email } = testUser;
      const user = await AuthService.getUserByEmail(email);
      expect(user).toBeDefined();
      expect(user.email).toBe(email);
    });

    it("should throw error if user not found with provided email", async () => {
      const nonExistentEmail = "nonexistent@example.com";
      await expect(AuthService.getUserByEmail(nonExistentEmail)).rejects.toThrow(
        "User not found with the provided email.",
      );
    });
  });

  describe("getUserByNickname", () => {
    it("should return user by nickname", async () => {
      const { nickname } = testUser;
      const user = await AuthService.getUserByNickname(nickname);
      expect(user).toBeDefined();
      expect(user.nickname).toBe(nickname);
    });

    it("should throw error if user not found with provided nickname", async () => {
      const nonExistentNickname = "nonexistent";
      await expect(AuthService.getUserByNickname(nonExistentNickname)).rejects.toThrow(
        "User not found with the provided nickname.",
      );
    });
  });

  describe("sendNicknameEmail", () => {
    it("should send email with user nickname", async () => {
      const { email } = testUser;
      await expect(AuthService.sendNicknameEmail(email)).resolves.not.toThrow();
    });
  });

  describe("sendTemporaryPasswordEmail", () => {
    test("should send temporary password email", async () => {
      const { email } = testUser;
      await expect(AuthService.sendTemporaryPasswordEmail(email)).resolves.not.toThrow();
    });

    test("should throw error if user not found with provided email", async () => {
      const nonExistentEmail = "nonexistent@example.com";
      await expect(AuthService.sendTemporaryPasswordEmail(nonExistentEmail)).rejects.toThrow(
        "Failed to update user password",
      );
    });
  });
});
