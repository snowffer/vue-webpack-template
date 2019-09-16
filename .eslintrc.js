module.exports = {
    "parser": "vue-eslint-parser",
    "parserOptions": {
        "parser": "babel-eslint",
        "sourceType": "module"
    },
    "extends": ["airbnb-base", "plugin:vue/recommended"],
    "env": {
        "browser": true,
        "node": true
    },
    "rules": {
        "indent": ["error", 4],
        "no-console": "off",
        "no-plusplus": ["error", {
            "allowForLoopAfterthoughts": true
        }],
        "no-unused-expressions": ["error", {
            "allowShortCircuit": true
        }],
        "vue/html-indent": ["error", 4]
    }
};