const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const emailService = require("./emailService");
const jwt = require("jsonwebtoken");

class AuthService {
  async sendVerificationEmail(email) {
    try {
      //여섯 자리의 랜덤 보안 문자를 생성
      const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
      const subject = "이메일 인증 코드입니다.";
      const text = `인증 코드 : ${verificationCode}`;

      //메일 보내기
      await emailService.sendEmail(email, subject, text);

      // {email, 랜덤 보안 문자} db 저장
      return await prisma.verifications.create({
        data: {
          email,
          verification_code: verificationCode,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  //이메일, 보안문자 받아서 해당 이메일의 보안문자인지 확인
  async confirmEmailCode(email, verificationCode) {
    try {
      const user = await prisma.verifications.findFirst({
        where: { email },
      });
      if (!user) {
        //이메일을 보내지 않았을 때
        return null;
      }
      if (
        //보안문자가 틀렸을 때
        user.verification_code !== verificationCode
      ) {
        return false;
      }
      return user;
    } catch (error) {
      throw error;
    }
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
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      await prisma.users.create({
        data: {
          email,
          password: hashedPassword,
          nickname,
        },
      });
      return { email, password: hashedPassword, nickname };
    } catch (error) {
      throw error;
    }
  }

  async deleteVerificationCode(email) {
    try {
      await prisma.verifications.deleteMany({
        where: { email },
      });
    } catch (error) {
      throw error;
    }
  }

  async loginUser(nickname) {
    try {
      const user = await prisma.users.findUnique({
        where: { nickname },
      });
      const userId = user.user_id;
      const token = this.generateJwtToken(user);
      return { userId, token }; //토큰은 개발상 편의 위해 return
    } catch (error) {
      throw error;
    }
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
    try {
      await prisma.users.delete({
        where: { user_id: userId },
      });
    } catch (error) {
      throw error;
    }
  }

  async deleteAllUser() {
    try {
      await prisma.users.deleteMany({});
    } catch (error) {
      throw error;
    }
  }

  async getUserByEmail(email) {
    try {
      return await prisma.users.findUnique({
        where: { email },
      });
    } catch (error) {
      throw error;
    }
  }

  async getUserByNickname(nickname) {
    try {
      return await prisma.users.findUnique({
        where: { nickname },
      });
    } catch (error) {
      throw error;
    }
  }
  async sendNicknameEmail(user) {
    try {
      const { email, nickname } = user;
      const subject = "[ACT]닉네임 안내";
      const text = `고객님의 닉네임은 ${nickname} 입니다.`;

      await emailService.sendEmail(email, subject, text);
      return user.nickname;
    } catch (error) {
      throw error;
    }
  }
  async sendTemporaryPasswordEmail(email) {
    try {
      //여섯 자리의 랜덤 비밀번호 생성
      const temporaryPassword = Math.floor(100000 + Math.random() * 900000).toString();
      const subject = "[ACT]임시 비밀번호 안내";
      const text = `고객님의 임시 비밀번호는 ${temporaryPassword} 입니다.`;

      //메일 발송
      await emailService.sendEmail(email, subject, text);

      //비밀번호 변경
      const hashedPassword = await bcrypt.hash(temporaryPassword, 10);
      return await prisma.users.update({
        where: { email },
        data: { password: hashedPassword },
      });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new AuthService();
