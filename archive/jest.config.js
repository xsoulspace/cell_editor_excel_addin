module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',

  transform: {
    '^.+\\.vue$': 'vue-jest',
  },
  testMatch: ['<rootDir>/src/**/*.spec.(js|jsx|ts|tsx)'],
}
