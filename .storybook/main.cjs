const path = require('path');

module.exports = {
  "stories": ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-styling",
    '@storybook/addon-a11y',
    "@storybook/theming",
    "storybook-dark-mode"
  ],

  "framework": {
    name: "@storybook/react-webpack5",
    options: {}
  },

  "webpackFinal": async (config, {
    configType
  }) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../src/')
    });
    return config;
  },

  "docs": {
    autodocs: 'tag',
    defaultName: 'Docs',
  },
};