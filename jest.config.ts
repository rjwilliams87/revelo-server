export default {
  preset: 'ts-jest',
  transform: {
    '^.+\\.js?$': 'babel-jest',
  },
  collectCoverageFrom: ['src/**/*.{js,ts}', '!src/**/index.{js,ts}'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  setupFilesAfterEnv: ['jest-extended'],
  testEnvironment: 'node',
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },
};
