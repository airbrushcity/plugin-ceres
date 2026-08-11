const resolveConfig = (config, env) =>
    typeof config === "function" ? config(env) : config;

module.exports = env => [
    resolveConfig(require("./tools/webpack/scripts.config"), env),
    resolveConfig(require("./tools/webpack/scripts-client.config"), env),
    resolveConfig(require("./tools/webpack/scripts-server.config"), env),
    resolveConfig(require("./tools/webpack/styles.config"), env),
    resolveConfig(require("./tools/webpack/scripts-custom.config"), env)
];