module.exports = {
    root: true,
    env: { browser: true, es2021: true, node: true, amd: true },
    extends: [
        "plugin:react/recommended",
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:import/errors",
        "plugin:react-hooks/recommended",
        "prettier"
    ],
    overrides: [],
    ignorePatterns: ["dist", ".eslintrc.cjs"],
    parser: "@typescript-eslint/parser",
    plugins: [
        "react-refresh",
        "react",
        "import",
        "react-hooks",
        "@typescript-eslint"
    ],
    rules: {
        "no-mixed-spaces-and-tabs": ["error", "smart-tabs"],
        "@typescript-eslint/no-explicit-any": "off",
        "react/react-in-jsx-scope": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "react/jsx-uses-react": "error",
        "react/jsx-uses-vars": "error",
        "react/prop-types": 0,
        "import/named": 0,
        "react-refresh/only-export-components": [
            "warn",
            { allowConstantExport: true }
        ]
    },
    parserOptions: {
        files: ["**/*.{js,jsx,ts,tsx}"],
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
            jsx: true
        },
        warnOnUnsupportedTypeScriptVersion: false
    },
    settings: {
        "import/resolver": {
            node: {
                extensions: [".js", ".jsx", ".ts", ".tsx"]
            }
        },
        react: {
            version: "detect"
        }
    }
};
