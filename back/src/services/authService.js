const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const emailService = require("./emailService");
const jwt = require("jsonwebtoken");

class AuthService {
  async sendVerificationEmail(email) {
    //여섯 자리의 랜덤 보안 문자를 생성
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    const subject = "이메일 인증 코드입니다.";
    const text = `인증 코드 : ${verificationCode}`;
    //메일 보내기
    await emailService.sendEmail(email, subject, text);
    return verificationCode;
  }

  async createVerificationCode(email, verificationCode) {
    return prisma.verifications.create({
      data: {
        email,
        verification_code: verificationCode,
      },
    });
  }
  //이메일, 보안문자 받아서 해당 이메일의 보안문자인지 확인
  async confirmEmailCode(email, verificationCode) {
    const record = await prisma.verifications.findFirst({
      where: { email },
    });
    if (!record) {
      //이메일을 보내지 않았을 때
      throw new Error("Verification code not found for the provided email.");
    }
    if (
      //보안문자가 틀렸을 때
      record.verification_code !== verificationCode
    ) {
      throw new Error("Incorrect verification code.");
    }
    return record;
  }

  async createUser(email, password, nickname) {
    // 중복된 이메일 확인
    const existingEmailUser = await prisma.users.findUnique({
      where: { email },
    });
    if (existingEmailUser) {
      throw new Error("Email already exists.");
    }
    // 중복된 닉네임 확인
    const existingNicknameUser = await prisma.users.findUnique({
      where: { nickname },
    });
    if (existingNicknameUser) {
      throw new Error("Nickname already exists.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    return prisma.users.create({
      data: {
        email,
        password: hashedPassword,
        nickname,
      },
    });
  }

  async deleteVerificationCode(email) {
    await prisma.verifications.deleteMany({
      where: { email },
    });
  }

  async loginUser(nickname) {
    const user = await prisma.users.findUnique({
      where: { nickname },
    });
    const userId = user.user_id;
    const token = this.generateJwtToken(user);
    return { userId, token }; //토큰은 개발상 편의 위해 return
  }

  generateJwtToken(user) {
    return jwt.sign(
      {
        user_id: user.user_id,
        email: user.email,
      },
      process.env.MY_SECRET_KEY,
      { expiresIn: "24h" },
    );
  }

  async deleteUser(userId) {
    await prisma.users.delete({
      where: { user_id: userId },
    });
  }

  async deleteAllUser() {
    await prisma.users.deleteMany({});
  }

  async getUserByEmail(email) {
    return prisma.users.findUnique({
      where: { email },
    });
  }

  async getUserByNickname(nickname) {
    return prisma.users.findUnique({
      where: { nickname },
    });
  }
  async sendNicknameEmail(user) {
    const { email, nickname } = user;
    const subject = "[ACT]닉네임 안내";
    const text = `고객님의 닉네임은 ${nickname} 입니다.`;

    await emailService.sendEmail(email, subject, text);
    return user.nickname;
  }
  async sendTemporaryPasswordEmail(email) {
    //여섯 자리의 랜덤 비밀번호 생성
    const temporaryPassword = Math.floor(100000 + Math.random() * 900000).toString();
    const subject = "[ACT]임시 비밀번호 안내";
    const text = `고객님의 임시 비밀번호는 ${temporaryPassword} 입니다.`;

    //메일 발송
    await emailService.sendEmail(email, subject, text);

    //비밀번호 변경
    const hashedPassword = await bcrypt.hash(temporaryPassword, 10);
    return prisma.users.update({
      where: { email },
      data: { password: hashedPassword },
    });
  }
}

module.exports = new AuthService();
