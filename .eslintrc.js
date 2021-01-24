module.exports = {
   extends: ['airbnb-base', 'plugin:vue/vue3-essential', 'prettier'],
   env: {
      es2021: true,
      browser: true,
      node: true,
   },
   ignorePatterns: ['node_modules'],
   parserOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      ecmaFeatures: {
         impliedStrict: true,
      },
   },
   rules: {
      'vue/no-side-effects-in-computed-properties': 0,
      'no-console': 0,
      'guard-for-in': 0,
      'no-restricted-syntax': 0,
      'no-plusplus': 0,
      'no-alert': 0,
      'no-unused-vars': 0,
      'spaced-comment': 0,
      'consistent-return': 0,
      'no-param-reassign': 0,
      'no-underscore-dangle': 0,
      'class-methods-use-this': 0,
      'func-names': 0,
      'prefer-destructuring': 0,
      quotes: [
         2,
         'single',
         {
            avoidEscape: true,
            allowTemplateLiterals: true,
         },
      ],
      'import/no-extraneous-dependencies': 0,
      'import/no-unresolved': 0,
      'global-require': 0,
      'prettier/prettier': [
         'error',
         {
            trailingComma: 'all',
            singleQuote: true,
            printWidth: 100,
            endOfLine: 'auto',
         },
      ],
   },
   plugins: ['prettier'],
};
