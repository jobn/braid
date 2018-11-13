module.exports = {
  parser: 'babel-eslint',
  extends: [
    'standard',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'prettier/react'
  ],
  env: {
    jest: true,
    browser: true
  },
  settings: {
    react: {
      version: '16.5'
    }
  },
  rules: {
    'react/prop-types': 'off',
    camelcase: 'off'
  }
};
