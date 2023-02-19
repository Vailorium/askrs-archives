const config = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
  },
  verbose: true,
  "testEnvironment": "node",
  "coveragePathIgnorePatterns": [
    "/node_modules/"
  ],
  "testPathIgnorePatterns": [
    "dist"
  ]
};
module.exports = config;