module.exports = {
    "env": {
        "node": true,
        "commonjs": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
        '@typescript-eslint/no-var-requires': 0,
        "@typescript-eslint/no-empty-interface": 0,
        "@typescript-eslint/explicit-function-return-type": 0,
        "@typescript-eslint/no-explicit-any": 0,
        "@typescript-eslint/no-use-before-define": 0,
        "@typescript-eslint/prefer-interface": 0,
        "@typescript-eslint/no-non-null-assertion": 0,
        "@typescript-eslint/no-empty-function": 0,
        "@typescript-eslint/ban-ts-ignore": 0,
        "@typescript-eslint/explicit-module-boundary-types": 0,
        "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    }
};
