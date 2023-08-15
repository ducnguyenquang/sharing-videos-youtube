export {};

module.exports = {
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "\\.module\\.css$": "identity-obj-proxy",
  },
  testEnvironment: "jest-environment-jsdom",
};
