const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class LoverService {
  async makeLoverId(userAId, userBId) {
    const loverInformation = await prisma.lovers.create({
      data: {
        user_a_id: userAId,
        user_b_id: userBId,
      },
    });
    if (!loverInformation) {
      throw new Error("Failed to create lover");
    }
  }

  async getUserIdByEmail(email) {
    const user = await prisma.users.findUnique({
      where: { email },
    });
    if (!user) {
      throw new Error("User not found with the provided email");
    }
    return user.user_id;
  }

  async applyLoverByEmail(applyUserEmail, acceptUserEmail) {
    const applyLoverInformation = await prisma.pairing_requests.create({
      data: {
        apply_user_email: applyUserEmail,
        accept_user_email: acceptUserEmail,
        is_applied: 1,
        is_accepted: 0,
      },
    });
    if (!applyLoverInformation) {
      throw new Error("Failed to apply lover by email");
    }
    return applyLoverInformation;
  }

  async acceptLoverByEmail(applyUserEmail, acceptUserEmail) {
    const acceptLoverInformation = await prisma.pairing_requests.update({
      where: {
        apply_user_email: applyUserEmail,
        accept_user_email: acceptUserEmail,
      },
      data: {
        is_accepted: 1,
      },
    });
    if (!acceptLoverInformation) {
      throw new Error("Failed to accept lover by email");
    }
  }

  async deletePairingRequest(applyUserEmail, acceptUserEmail) {
    await prisma.pairing_requests
      .delete({
        where: {
          apply_user_email: applyUserEmail,
          accept_user_email: acceptUserEmail,
        },
      })
      .catch(() => {
        throw new Error("Failed to delete pairing request");
      });
  }

  async deleteLoverByUserId(userId) {
    await prisma.lovers
      .deleteMany({
        where: {
          OR: [{ user_a_id: userId }, { user_b_id: userId }],
        },
      })
      .catch(() => {
        throw new Error(`Failed to delete lover for user_id ${userId}`);
      });
    await prisma.users.update({ where: { user_id: userId }, data: { lover_nickname: null } });
  }

  async makeLoverNickname(userId, loverNickname) {
    const loverNicknameInformation = await prisma.users.update({
      where: {
        user_id: userId,
      },
      data: {
        lover_nickname: loverNickname,
      },
    });
    if (!loverNicknameInformation) {
      throw new Error("Failed to make lover nickname");
    }
  }

  async getAcceptUserProfile(userEmail) {
    const user = await prisma.pairing_requests.findMany({
      where: { accept_user_email: userEmail },
    });
    if (!user) {
      throw new Error("Failed to get accept user profile");
    }
    console.log("user: ", user);
    return user;
  }
}

module.exports = new LoverService();
