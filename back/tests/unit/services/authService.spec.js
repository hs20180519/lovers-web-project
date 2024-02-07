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
    await AuthService.deleteAllUsers();
  });

  describe("sendVerificationEmail", () => {
    it("should send a verification email", async () => {
      const verificationCode = await AuthService.sendVerificationEmail(testUser.email);
      expect(verificationCode).toHaveLength(6); // 보안 코드는 6자리여야 함
    });
  });

  describe("createVerificationCode", () => {
    it("should update verification code", async () => {
      // 보안 코드 생성
      const newVerificationCode = "123456";
      const updatedUser = await AuthService.createVerificationCode(
        testUser.email,
        newVerificationCode,
      );
      // 생성된 보안 코드가 일치하는지 확인
      expect(updatedUser).toBeDefined();
      expect(updatedUser.verification_code).toBe(newVerificationCode);
    });
  });

  describe("confirmEmailCode", () => {
    it("should confirm the email code", async () => {
      // 이메일 코드 확인
      const verificationCode = "123456";
      const result = await AuthService.confirmEmailCode(testUser.email, verificationCode);
      expect(result).toBeDefined();
      expect(result.verification_code).toBe(verificationCode);
    });

    it("should return null if email not found", async () => {
      const result = await AuthService.confirmEmailCode("nonexistent@example.com", "123456");
      expect(result).toBeNull();
    });

    it("should return false if email code does not match", async () => {
      const result = await AuthService.confirmEmailCode(testUser.email, "incorrectCode");
      expect(result).toBe(false);
    });
  });

  describe("createUser", () => {
    it("should create a new user", async () => {
      const result = await AuthService.createUser(
        testUser.email,
        testUser.password,
        testUser.nickname,
      );
      expect(result).toBeDefined();
      expect(result.email).toBe(testUser.email);
      expect(result.nickname).toBe(testUser.nickname);
    });

    it("should throw error if email already exists", async () => {
      await expect(
        AuthService.createUser(testUser.email, "anotherPassword", "anotherNickname"),
      ).rejects.toThrowError("Email already exists.");
    });

    it("should throw error if nickname already exists", async () => {
      await expect(
        AuthService.createUser("another@example.com", "anotherPassword", testUser.nickname),
      ).rejects.toThrowError("Nickname already exists.");
    });
  });
});

// describe("Send Verification Email", () => {
//   test("Success", async () => {});
//   test("Failure", async () => {});
// });
//
// describe("Verify CAPTCHA", () => {
//   test("Success", async () => {});
//   test("Failure", async () => {});
// });
//
// describe("Delete CAPTCHA", () => {
//   test("Success", async () => {});
//   test("Failure", async () => {});
// });
//
// describe("Log In", () => {
//   test("Success", async () => {});
//   test("Failure", async () => {});
// });
//
// describe("Delete User", () => {
//   test("Success", async () => {});
//   test("Failure", async () => {});
// });
//
// describe("Send Nickname Recovery Email", () => {
//   test("Success", async () => {});
//   test("Failure", async () => {});
// });
//
// describe("Send Temporary Password Email", () => {
//   test("Success", async () => {});
//   test("Failure", async () => {});
// });
