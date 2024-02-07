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

    const existingVerificationCode = await prisma.verifications.findUnique({
      where: { email },
    });
    if (!existingVerificationCode) {
      await prisma.verifications.create({
        data: {
          email,
          verification_code: verificationCode,
        },
      });
    } else {
      await prisma.verifications.update({
        where: { email },
        data: {
          verification_code: verificationCode,
        },
      });
    }
  }

  //이메일, 보안문자 받아서 해당 이메일의 보안문자인지 확인
  async confirmEmailCode(email, verificationCode) {
    const record = await prisma.verifications.findUnique({
      where: { email },
    });
    if (!record) {
      throw new Error("Verification code not found for the provided email.");
    }
    if (record.verification_code !== verificationCode) {
      throw new Error("Incorrect verification code.");
    }
  }

  async createUser(email, password, nickname) {
    const existingEmailUser = await prisma.users.findUnique({
      where: { email },
    });
    if (existingEmailUser) {
      throw new Error("Email already exists.");
    }
    const existingNicknameUser = await prisma.users.findUnique({
      where: { nickname },
    });
    if (existingNicknameUser) {
      throw new Error("Nickname already exists.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.users.create({
      data: {
        email,
        password: hashedPassword,
        nickname,
      },
    });
  }

  async deleteVerificationCode(email) {
    await prisma.verifications
      .deleteMany({
        where: { email },
      })
      .catch(() => {
        throw new Error(`Failed to delete verification code for email ${email}`);
      });
  }

  async loginUser(nickname) {
    const user = await prisma.users.findUnique({
      where: { nickname },
    });
    if (!user) {
      throw new Error("User not found with the provided nickname.");
    }
    const token = this.generateJwtToken(user);
    return { token }; //토큰은 개발상 편의 위해 return
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
    await prisma.users
      .delete({
        where: { user_id: userId },
      })
      .catch(() => {
        throw new Error(`Failed to delete user for user_id ${userId}`);
      });
  }

  async deleteAllUsers() {
    await prisma.users.deleteMany({}).catch(() => {
      throw new Error(`Failed to delete all users`);
    });
  }

  async getUserByEmail(email) {
    const user = await prisma.users.findUnique({
      where: { email },
    });
    if (!user) {
      throw new Error("User not found with the provided email.");
    }
    return user;
  }

  async getUserByNickname(nickname) {
    const user = await prisma.users.findUnique({
      where: { nickname },
    });
    if (!user) {
      throw new Error("User not found with the provided nickname.");
    }
    return user;
  }
  async sendNicknameEmail(user) {
    const { email, nickname } = user;
    const subject = "[ACT]닉네임 안내";
    const text = `고객님의 닉네임은 ${nickname} 입니다.`;
    await emailService.sendEmail(email, subject, text);
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
    const user = await prisma.users.update({
      where: { email },
      data: { password: hashedPassword },
    });
    if (!user) {
      throw new Error("Failed to update user password");
    }
  }
}

module.exports = new AuthService();
