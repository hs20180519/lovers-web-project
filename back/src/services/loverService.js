const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class LoverService {
  async makeLoverId(userAId, userBId) {
    try {
      return await prisma.lovers.create({
        data: {
          user_a_id: userAId,
          user_b_id: userBId,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async getUserIdByEmail(email) {
    try {
      const user = await prisma.users.findUnique({
        where: { email },
      });
      return user.user_id;
    } catch (error) {
      throw error;
    }
  }

  async applyLoverByEmail(applyUserEmail, acceptUserEmail) {
    try {
      return await prisma.pairing_requests.create({
        data: {
          apply_user_email: applyUserEmail,
          accept_user_email: acceptUserEmail,
          is_applied: 1,
          is_accepted: 0,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async acceptLoverByEmail(applyUserEmail, acceptUserEmail) {
    try {
      await prisma.pairing_requests.update({
        where: {
          apply_user_email: applyUserEmail,
          accept_user_email: acceptUserEmail,
        },
        data: {
          is_accepted: 1,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async deletePairingRequest(applyUserEmail, acceptUserEmail) {
    try {
      await prisma.pairing_requests.delete({
        where: {
          apply_user_email: applyUserEmail,
          accept_user_email: acceptUserEmail,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async deleteLoverByUserId(userId) {
    try {
      await prisma.lovers.deleteMany({
        where: {
          OR: [{ user_a_id: userId }, { user_b_id: userId }],
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async makeLoverNickname(userId, loverNickname) {
    try {
      return await prisma.users.update({
        where: {
          user_id: userId,
        },
        data: {
          lover_nickname: loverNickname,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new LoverService();
