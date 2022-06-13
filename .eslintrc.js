module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:vue/essential', 'prettier'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['vue'],
  rules: {
    'vue/multi-word-component-names': 0,
    'vue/no-v-model-argument': 0,
    'vue/no-multiple-template-root': 0,
    'no-unused-vars': 0,
    'no-empty': 0,
  },
  ignorePatterns: ['/**/*.js'],
}
