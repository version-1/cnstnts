module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.ts?$': 'ts-jest'
  },
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|sentry-expo|native-base)'
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
