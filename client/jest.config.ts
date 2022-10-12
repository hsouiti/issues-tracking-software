/* module.exports = {
  preset: 'ts-jest',
  //testEnvironment: 'jest-environment-jsdom',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};
 */

import type {Config} from 'jest';

const config: Config = {
  preset: 'ts-jest',
  //testEnvironment: 'jest-environment-jsdom',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

export default config;
