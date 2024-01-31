module.exports = {
  testEnvironment: "node",
  roots: ["act/back/tests"],
  setupFilesAfterEnv: ["act/back/tests/singleton.js"],
};
