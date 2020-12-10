export default {
  collectCoverage: false,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageReporters: ['html'],
  preset: 'ts-jest',
  roots: ['<rootDir>/tests'],
  setupFiles: ['dotenv-flow/config'],
  testEnvironment: 'node',
  testMatch: ['**/functional/**/*.ts', '**/unit/**/*.ts']
}
