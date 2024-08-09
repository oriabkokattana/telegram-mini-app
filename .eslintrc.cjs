module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'prettier', 'simple-import-sort'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'prettier/prettier': [
      'error',
      {
        printWidth: 100,
        endOfLine: 'auto',
      },
    ],
    'simple-import-sort/imports': 'error',
    'react-hooks/exhaustive-deps': 'off',
    quotes: ['error', 'single', { avoidEscape: true }],
  },
  overrides: [
    {
      files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
      rules: {
        'simple-import-sort/imports': [
          'error',
          {
            groups: [
              [
                // Packages. `react` related packages come first.
                '^react',
                '^\\w',
                '^@\\w',
                '^',
                // Parent imports. Put `..` last.
                '^\\.\\.(?!/?$)',
                '^\\.\\./?$',
                // Other relative imports. Put same-folder imports and `.` last.
                '^\\./(?=.*/)(?!/?$)',
                '^\\.(?!/?$)',
                '^\\./?$',
              ],
              // Extension imports.
              ['^\\.\\/[\\w-]+\\.\\w+$'],
              // Types imports.
              ['^@\\/types\\w?'],
              // Side effect imports.
              ['^\\u0000'],
            ],
          },
        ],
      },
    },
  ],
};
