const authService = require("../../../src/services/authService");
const bcrypt = require("bcrypt");

jest.mock("bcrypt");
beforeAll(async () => {
  await authService.deleteAllUser();
});

describe("Sign up", () => {
  test("success", async () => {
    // Hashing the password
    const hashedPassword = "hashedPassword123";
    bcrypt.hash.mockResolvedValue(hashedPassword);

    // Creating a new user
    const newUser = await authService.createUser("test@example.com", "password123", "example1");

    const user = {
      email: "test@example.com",
      password: "hashedPassword123",
      nickname: "example1",
    };

    // Success if equal
    expect(newUser).toEqual(user);
  });
  test("Failure - Email Duplicate", async () => {
    // Attempting to create a new user with an existing email
    const hashedPassword = "hashedPassword123";
    bcrypt.hash.mockResolvedValue(hashedPassword);

    const newUser = await authService.createUser("test@example.com", "password123", "example2");
    // Should return an error

    await expect(newUser).rejects.toThrowError("Email already exists");
  });

  test("Failure - Nickname Duplicate", async () => {
    // Attempting to create a new user with an existing nickname
    const hashedPassword = "hashedPassword123";
    bcrypt.hash.mockResolvedValue(hashedPassword);

    const newUser = await authService.createUser("test2@example.com", "password123", "example1");
    // Should return an error

    await expect(newUser).rejects.toThrowError("Nickname already exists");
  });
});
describe("Send Verification Email", () => {
  test("Success", async () => {});
  test("Failure", async () => {});
});

describe("Verify CAPTCHA", () => {
  test("Success", async () => {});
  test("Failure", async () => {});
});

describe("Delete CAPTCHA", () => {
  test("Success", async () => {});
  test("Failure", async () => {});
});

describe("Log In", () => {
  test("Success", async () => {});
  test("Failure", async () => {});
});

describe("Delete User", () => {
  test("Success", async () => {});
  test("Failure", async () => {});
});

describe("Send Nickname Recovery Email", () => {
  test("Success", async () => {});
  test("Failure", async () => {});
});

describe("Send Temporary Password Email", () => {
  test("Success", async () => {});
  test("Failure", async () => {});
});
