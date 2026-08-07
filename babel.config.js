const presets = [
    [
        "@babel/env",
        {
            useBuiltIns: "usage",
            corejs: 3
        }
    ]
];

const plugins = [
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-proposal-optional-chaining",
    "@babel/plugin-proposal-nullish-coalescing-operator"
];

module.exports = { presets, plugins };
