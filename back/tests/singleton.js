// const { PrismaClient } = require("@prisma/client");
// const { mockDeep, mockReset } = require("jest-mock-extended");
// const prismaMock = mockDeep(PrismaClient);
//
// beforeEach(() => {
//   mockReset(prismaMock);
// });
//
// prismaMock.users = {
//   findUnique: jest.fn(),
//   create: jest.fn(),
// };

module.exports = { prismaMock };
