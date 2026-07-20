export default {
  semi: true,
  trailingComma: 'all',
  singleQuote: true,
  printWidth: 80,
  tabWidth: 2,
  endOfLine: 'auto',
  overrides: [
    {
      files: ['*.jsonc'],
      options: {
        parser: 'json',
        trailingComma: 'none',
      },
    },
  ],
};
