export default {
  collectCoverage: false,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageReporters: ['html'],
  preset: 'ts-jest',
  roots: ['<rootDir>/tests'],
  setupFiles: ['dotenv-flow/config'],
  setupFilesAfterEnv: ['jest-extended'],
  testEnvironment: 'node',
  testMatch: ['**/functional/**/*.ts', '**/unit/**/*.ts']
}
