module.exports = {
  root: true,
  parser: '@typescript-eslint/parser', // the TypeScript parser we installed earlier
  parserOptions: {
    ecmaFeatures: { jsx: true } // Allows for the parsing of JSX
  },
  extends: [
    'eslint:recommended', // eslint default rules
    'plugin:@typescript-eslint/eslint-recommended', // eslint TypeScript rules (github.com/typescript-eslint/typescript-eslint)
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended', // eslint react rules (github.com/yannickcr/eslint-plugin-react)
    'plugin:jsx-a11y/recommended', // accessibility plugin
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off', // We turn off prop-types rule, as we will use TypeScript's types instead.
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/unbound-method': 'off',
    'no-console': 'off',
    'curly': 'warn',
    'dot-location': ['warn', 'property'],
    'max-classes-per-file': ['error', 1],
    'no-empty-function': 'error',
    'no-implicit-coercion': 'warn',
    'no-multi-spaces': 'warn',
    'indent': ['warn', 2],
    'quotes': ['warn', 'single', { 'avoidEscape': true }],
    'semi': ['error', 'always'],
    'space-before-blocks': ['warn', 'always'],
    'space-before-function-paren': ['warn', 'never'],
    'space-in-parens': ['warn', 'never'],
    'space-infix-ops': 'warn',
    'arrow-parens': ['warn', 'always'],
  },
};
