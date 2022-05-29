module.exports = {
  parser: 'vue-eslint-parser',
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    '@nuxtjs/eslint-config-typescript',
    'prettier',
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    requireConfigFile: false
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts', '.vue'],
      },
    },
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    semi: 'off',
    'max-len': 'off',
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-unused-expressions': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-shadow': 'error',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-loss-of-precision': 'off',
  },
  overrides: [{
    files: ['views/**/*.vue', 'components/**/*.vue'],
    rules: {
      'vue/multi-word-component-names': 'off'
    }
  }]
}
