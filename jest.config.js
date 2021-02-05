module.exports = {
  // u can change this option to a more specific folder for test single component or util when dev
  // for example, ['<rootDir>/packages/components/button']
  roots: ['<rootDir>/packages'],

  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.(t|j)sx?$': [
      'babel-jest',
      {
        presets: [
          [
            '@babel/preset-env',
            {
              targets: {
                node: true,
              },
            },
          ],
          '@babel/preset-typescript',
        ],
        plugins: ['@vue/babel-plugin-jsx'],
      },
    ],
  },
  moduleNameMapper: {
    '^@idux(.*)$': '<rootDir>/packages$1',
    '^@tests(.*)$': '<rootDir>/tests$1',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  collectCoverage: true,
  coverageReporters: ['json', 'lcov', 'text', 'cobertura'],
  coverageThreshold: {
    global: {
      branches: 85,
      functions: 85,
      lines: 85,
      statements: 85,
    },
  },
  coveragePathIgnorePatterns: ['/node_modules/', '<rootDir>/tests'],
  reporters: ['default', 'jest-junit'],
}
