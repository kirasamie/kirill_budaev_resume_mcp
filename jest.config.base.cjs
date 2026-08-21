module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  moduleFileExtensions: ['ts', 'js', 'json'],
  collectCoverageFrom: ['**/*.(t|j)s', '!**/*.spec.ts'],
  coverageDirectory: '../coverage',
  coverageReporters: [['lcov', { projectRoot: '../..' }], 'text-summary'],
};
