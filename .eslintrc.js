module.exports = {
  env: {
    browser: true,
    es6: true,
    commonjs: true,
    node: true
  },
  extends: ['eslint:recommended', 'plugin:vue/essential'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['vue'],
  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'windows'],
    quotes: ['error', 'single'],
    'generator-star-spacing': 'off',
    'func-names': 0,
    'linebreak-style': 0,
    'no-new': 0,
    'no-debugger': 0,
    'no-console': 0,
    'no-alert': 0,
    'no-param-reassign': 0,
    'no-use-before-define': 0,
    'import/named': 0,
    'import/no-unresolved': 0,
    'import/export': 0,
    'import/order': 0,
    'import/no-extraneous-dependencies': 0,
    'import/prefer-default-export': 0,
    semi: ['error', 'never', { beforeStatementContinuationChars: 'never' }],
    'comma-dangle': 0,
    'space-before-function-paren': 0,
    'arrow-parens': 0,
    'no-plusplus': 0,
    'space-unary-ops': 0,
    'no-underscore-dangle': 0,
    'class-methods-use-this': 0,
    radix: 0,
    'object-curly-newline': 0,
    'no-tabs': 0,
    'no-multi-assign': 0,
    'operator-linebreak': 0,
    'implicit-arrow-linebreak': 0,
    'no-unused-vars': ['error', { argsIgnorePattern: 'h' }]
  }
}
