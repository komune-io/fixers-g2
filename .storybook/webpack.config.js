module.exports = ({ config }) => {
  // Add SVGR Loader to load svg
  // ========================================================
  // Remove svg rules from existing webpack rule
  const assetRule = config.module.rules.find(({ test }) => test.test(".svg"));
  const assetLoader = {
    loader: assetRule.loader,
    options: assetRule.options || assetRule.query,
  };
  config.module.rules.unshift({
    test: /\.svg$/,
    use: ["@svgr/webpack", assetLoader],
  });
  //unable to load react-leaflet optionnal chaining
  config.module.rules.push({
    test: /\.(js|jsx)$/,
    loader: require.resolve("babel-loader"),
    options: {
      plugins: [
        "@babel/plugin-proposal-optional-chaining",
        "@babel/plugin-proposal-nullish-coalescing-operator",
      ],
    },
    include: [/node_modules\\react-leaflet/, /node_modules\\@react-leaflet/],
  });
  console.log(config.module.rules);
  return config;
};
