const nextJest = require("next/jest");

const createJestConfig = nextJest({ dir: "./" });

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    "@components/(.*)": "<rootDir>/src/components/$1",
    "^@/(.*)$": "<rootDir>/$1",
    "\\.(css|scss|less)$": "identity-obj-proxy",
  },
  testEnvironment: "jest-environment-jsdom",
  collectCoverage: true,
  collectCoverageFrom: [
    "app/**/*.{js,ts,jsx,tsx}",
    "components/**/*.{js,ts,jsx,tsx}",
    "!**/__tests__/**/*.{js,ts,jsx,tsx}",
  ],
  coverageReporters: ["text", "lcov"],
  testPathIgnorePatterns: ["/node_modules/", "/tests/e2e/"],
  testMatch: [
    "**/app/**/*.(test|spec).[tj]s?(x)",  // Matches all test files under `app`
    "**/components/**/*.(test|spec).ts?(x)",  // Matches all test files under `components`
  ],  
};

module.exports = createJestConfig(customJestConfig);
