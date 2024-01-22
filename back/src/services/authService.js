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

  async register(email, password, nickname) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      return await prisma.users.create({
        data: {
          email,
          password: hashedPassword,
          nickname,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async deleteVerificationCode(email) {
    try {
      const user = await prisma.verifications.deleteMany({
        where: { email },
      });
      if (!user) {
        return null;
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  async createUser(email) {
    //localStrategy 에서 검증함
    //다른 예외 처리 필요
    try {
      const user = await prisma.users.findUnique({
        where: { email },
      });

      const token = this.generateJwtToken(user);
      return { user, token }; //토큰은 개발상 편의 위해 return
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
      { expiresIn: "1h" },
    );
  }

  async deleteUser(userId) {
    try {
      await prisma.users.delete({
        where: { user_id: userId },
      });
      return true; // 성공적으로 삭제
    } catch (error) {
      throw error;
    }
  }

  async sendNicknameEmail(email) {
    try {
      const user = await prisma.users.findUnique({
        where: { email },
      });

      // 해당 이메일 유저가 없을 때
      if (!user) {
        return false;
      }
      const subject = "[ACT]닉네임 안내";
      const text = `고객님의 닉네임은 ${user.nickname} 입니다.`;

      //메일 보내기
      await emailService.sendEmail(email, subject, text);

      return user.nickname;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new AuthService();
