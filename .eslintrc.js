module.exports = {
  parser: 'babel-eslint',
  plugins: ['prettier', 'react-hooks', 'jest', 'import', 'babel'],
  extends: ['airbnb', 'prettier', 'prettier/react'],
  env: {
    'jest/globals': true,
    browser: true,
  },
  // use eslint-import-resolver-webpack to parse alias in webpack
  settings: {
    'import/resolver': 'webpack',
  },
  rules: {
    'prettier/prettier': ['error'],
    'react/react-in-jsx-scope': 'off', // Handled by babel-plugin-react-require
    'react/jsx-filename-extension': 'off',
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    // doesn't fail when using do expressions or optional chaining
    'no-unused-expressions': 'off',
    'babel/no-unused-expressions': 'error',
    'jsx-a11y/label-has-for': [
      2,
      {
        components: ['Label'],
        required: {
          some: ['nesting', 'id'],
        },
        allowChildren: false,
      },
    ],
  },
};
