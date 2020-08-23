module.exports = {
    "extends": [
        "airbnb",
        "plugin:prettier/recommended",
        "prettier/react"
    ],
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "jest": true,
        "node": true
    },
    "rules": {
        "prettier/prettier": ["error"],
        "class-methods-use-this": ["off"],
        "no-param-reassing": ["off"],
        "camelcase": ["off"],
        "no-unused-vars": ["error", { "argsIgnorePattern": "next" }],
        "jsx-a11y/href-no-hash": ["off"],
        "react/jsx-filename-extension": ["warn", { "extensions": [".js", ".jsx"] }],
        "max-len": [
            "warn",
            {
                "code": 80,
                "tabWidth": 2,
                "comments": 80,
                "ignoreComments": false,
                "ignoreTrailingComments": true,
                "ignoreUrls": true,
                "ignoreStrings": true,
                "ignoreTemplateLiterals": true,
                "ignoreRegExpLiterals": true
            }
        ]
    }
}
