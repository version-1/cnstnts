module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.ts?$': 'ts-jest'
  },
  transformIgnorePatterns: [
    "<rootDir>/node_modules/",
  ],
  modulePathIgnorePatterns: [
    "<rootDir>/dist/"
  ],
  globals: {
    'ts-jest': {
      tsConfig: {},
      diagnostics: {
        warnOnly: true
      }
    }
  },
  moduleNameMapper: {
    '^src/(.+)': '<rootDir>/src/$1'
  }
}
