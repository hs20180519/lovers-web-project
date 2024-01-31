// Prisma 모듈을 가져옵니다.
//const { prismaMock } = require("../../singleton");

const UserService = require("../../../src/services/userService");
const AuthService = require("../../../src/services/authService");

const bcrypt = require("bcrypt");

test("유저 생성", async () => {
  const user = {
    //user_id: 1,
    email: "example222e@example.com",
    password: await bcrypt.hash("1234", 10),
    nickname: "good1",
  };

  prismaMock.users.create.mockResolvedValue(user.email);

  await expect(AuthService.createUser(user.email, user.password, user.nickname)).resolves.toEqual({
    email: "exampl222e@example.com",
    password: await bcrypt.hash("1234", 10),
    nickname: "good1",
    profile_image: null,
    user_id: 1,
  });
});
test("프로필 가져오기", async () => {
  const user = {
    user_id: 40,
  };
  prismaMock.User.findUnique.mockResolvedValue(user);

  await expect(UserService.getUserProfile(user.user_id)).resolves.toEqual({
    email: "good@example.com",
    nickname: "g",
    password: "$2b$10$aB.mynMpge3Ve/6kQCD28uvSn5qBWW44h/kH.TaySzfzOtG7ye9R6",
    profile_image: null,
    user_id: 40,
  });
});
