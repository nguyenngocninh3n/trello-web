
module.exports = {
  env: { browser: true, es2020: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended'
  ],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: [
    'react',
    'react-hooks',
    'react-refresh'
  ],
  rules: {
    'react-refresh/only-export-components': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/prop-types': 0,
    'react/display-name': 0,

    //MUI rules
    'no-restricted-imports': [
      'error',
      {
        'patterns': ['@mui/*/*/*']
      }
    ],

    // most of under rules were deprecated ESLint v8.53.0

    // 'no-console': 1,
    'no-lonely-if': 1,

    // require using all variable decliring
    'no-unused-vars': 1,

    // no space at the end of lines
    'no-trailing-spaces': 1,

    // total space between 2 any elemememt
    'no-multi-spaces': 1,

    // the maximum break lines between 2 lines
    'no-multiple-empty-lines': 2,

    // require a space before blocks - not apply with blocks begin a new line
    'space-before-blocks': ['error', 'always'],

    // indent start a line
    'indent': ['warn', 2],

    // enforces consistent use of semicolons
    'semi': [1, 'never'],

    // enforces the consistent use of either backticks, double, or single quotes.
    'quotes': ['error', 'single'],

    'object-curly-spacing': [1, 'always'],
    'array-bracket-spacing': 1,

    // define linebreak style
    'linebreak-style': 0,

    // no unexpected line could cause error
    'no-unexpected-multiline': 'warn',

    // enforces consisstent spacing around keywords
    'keyword-spacing': 1,

    // enforces consistent use of comma after last element in object and array => not having
    'comma-dangle': 1,

    // enforces consistent spacing before and after commas in variable declarations, array literals, object literals, function parameters, and sequences.
    'comma-spacing': 1,

    // Enforce consistent spacing before and after the arrow in arrow functions
    'arrow-spacing': 1
  }
}