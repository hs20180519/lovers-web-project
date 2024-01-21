const bcrypt = require("bcrypt");
const {
  PrismaClient,
} = require("@prisma/client");
const prisma = new PrismaClient();
const emailService = require("./emailService");

class AuthService {
  async sendVerificationEmail(email) {
    try {
      //여섯 자리의 랜덤 보안 문자를 생성
      const verificationCode = Math.floor(
        100000 + Math.random() * 900000,
      ).toString();
      const subject = "이메일 인증 코드입니다.";
      const text = `인증 코드 : ${verificationCode}`;

      //메일 보내기
      await emailService.sendEmail(
        email,
        subject,
        text,
      );

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
  async verifyEmailCode(email, verificationCode) {
    try {
      const user =
        await prisma.verifications.findFirst({
          where: { email },
        });
      if (!user) {
        //이메일을 보내지 않았을 때 - 수정 필요
        return null;
      }
      if (
        user.verification_code !==
        verificationCode
      ) {
        //보안문자가 틀렸을 때
        return false;
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  async register(email, password, nickname) {
    try {
      const hashedPassword = await bcrypt.hash(
        password,
        10,
      );
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

  async login(email, password) {
    //localStrategy 에서 검증함
    //다른 예외 처리 필요
    try {
      const user = await prisma.users.findUnique({
        where: { email },
      });
      if (!user) {
        return null;
      }
      const isMatch = await bcrypt.compare(
        password,
        user.password,
      );
      if (isMatch) {
        return user;
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new AuthService();
