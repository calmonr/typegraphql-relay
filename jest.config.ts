export default {
  collectCoverage: false,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageReporters: ['html'],
  preset: 'ts-jest',
  roots: ['<rootDir>/tests'],
  testEnvironment: 'node',
  testMatch: ['**/functional/**/*.ts', '**/unit/**/*.ts']
}
