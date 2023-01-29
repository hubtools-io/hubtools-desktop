module.exports = {
  extends: 'erb',
  rules: {
    // A temporary hack related to IDE not resolving correct package.json
    'import/no-extraneous-dependencies': 'off',
    'import/no-unresolved': 'error',
    'import/prefer-default-export': 'off',
    'react/require-default-props': 'off',
    'no-unused-vars': 'off',
    'no-plusplus': 'off',
    'no-prototype-builtins': 'off',
    'prefer-destructuring': 'off',
    'jsx-a11y/interactive-supports-focus': 'off',
    'consistent-return': 'off',
    'react/no-danger': 'off',
    'no-restricted-syntax': 'off',
    'default-param-last': 'off',
    'no-param-reassign': 'off',
    'no-nested-ternary': 'off',
    // 'import/no-cycle': 'off',
    // 'import/no-named-as-default': 'off',
    // 'import/no-named-as-default-member': 'off',
    'react/no-array-index-key': 'off',
    // Since React 17 and typescript 4.1 you can safely disable the rule
    'react/react-in-jsx-scope': 'off',
    'react/function-component-definition': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-filename-extension': [
      2,
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        '': 'never',
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
        mjs: 'never',
      },
    ],
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    createDefaultProgram: true,
  },
  settings: {
    'import/resolver': {
      // See https://github.com/benmosher/eslint-plugin-import/issues/1396#issuecomment-575727774 for line below
      node: {},
      webpack: {
        config: require.resolve('./.erb/configs/webpack.config.eslint.ts'),
      },
      typescript: {},
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
  },
};
