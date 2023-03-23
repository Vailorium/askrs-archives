const config = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
  },
  verbose: true,
  "testEnvironment": "node",
  "coveragePathIgnorePatterns": [
    "/node_modules/",
    "dist"
  ],
  "testPathIgnorePatterns": [
    "dist"
  ],
  "moduleDirectories": [
    "__mocks__",
    "node_modules",
  ],
};
module.exports = config;