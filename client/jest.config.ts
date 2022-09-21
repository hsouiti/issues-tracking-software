module.exports = {
  preset: 'ts-jest',
  //testEnvironment: 'jest-environment-jsdom',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};
