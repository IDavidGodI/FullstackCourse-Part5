module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    "jest/globals": true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh', 'jest'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/prop-types': 0,
    "react/no-unescaped-entities": "off",
    "no-unused-vars": "warn",
    "eqeqeq": "warn",
    "no-trailing-spaces": ["warn", { "skipBlankLines": true }],
    "object-curly-spacing": [
      "warn", "always"
    ],
    "space-infix-ops": ["warn"],
    "arrow-spacing": [
      "warn", { "before": true, "after": true }
    ],
    "indent": [
      "error",
      2
    ],
    "linebreak-style": [
      "error",
      "windows"
    ],
    "quotes": [
      "warn",
      "double"
    ]
  },
}
