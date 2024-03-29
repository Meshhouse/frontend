module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@nuxtjs/eslint-config-typescript'
  ],
  plugins: [
    'vue'
  ],
  rules: {
    'no-console': 'off',
    'no-multiple-empty-lines': 'off',
    'vue/no-v-html': 'off',
    'vue/multi-word-component-names': 'off',
    'no-use-before-define': 'off'
  }
}
