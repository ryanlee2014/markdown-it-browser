module.exports = function (api) {
    api.cache(true);

    const presets = [["@babel/preset-env", {
        "targets": {
            "browsers": ["defaults", "not ie <= 8"]
        }
    }]];
    const plugins = ["@babel/plugin-transform-runtime","@babel/plugin-transform-modules-commonjs"];

    return {
        presets,
        plugins
    };
}
