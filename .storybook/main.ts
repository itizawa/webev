const path = require("path")

module.exports = {
    stories: ["../src/**/*.stories.tsx"],
    addons: ["@storybook/addon-essentials"],
    webpackFinal: async (config) => {
      config.resolve.alias = {
        "~src": path.resolve(__dirname, "../src")
      }
      config.module.rules.push({
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        include: path.resolve(__dirname, '../'),
      });
      return config
    }
  };