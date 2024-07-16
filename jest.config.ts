/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  bail: 1,
  clearMocks: true,
  collectCoverage: false,
  collectCoverageFrom: ["src/**", "!src/**/I*.ts", "!src/server.ts", "!src/*.json"],
  coverageDirectory: "test/coverage",
  coverageProvider: "v8",
  preset: "ts-jest",
  testMatch: [
    "**/test/**/*.test.ts?(x)",
  ],
};
