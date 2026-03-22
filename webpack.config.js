//@ts-check
'use strict';

const path = require('path');

/** @type {import('webpack').Configuration} */
const desktopConfig = {
  target: 'node',
  mode: 'none',
  entry: './src/extension.ts',
  output: {
    path: path.resolve(__dirname, 'out'),
    filename: 'extension.js',
    libraryTarget: 'commonjs2',
  },
  externals: {
    vscode: 'commonjs vscode',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.md$/,
        type: 'asset/source',
      },
    ],
  },
  devtool: 'nosources-source-map',
};

/** @type {import('webpack').Configuration} */
const webConfig = {
  target: 'webworker',
  mode: 'none',
  entry: './src/extension.ts',
  output: {
    path: path.resolve(__dirname, 'dist', 'web'),
    filename: 'extension.js',
    libraryTarget: 'commonjs2',
  },
  externals: {
    vscode: 'commonjs vscode',
  },
  resolve: {
    extensions: ['.ts', '.js'],
    mainFields: ['browser', 'module', 'main'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.md$/,
        type: 'asset/source',
      },
    ],
  },
  devtool: 'nosources-source-map',
};

/** @type {import('webpack').Configuration} */
const mcpServerConfig = {
  target: 'node',
  mode: 'none',
  entry: './src/mcp-server.ts',
  output: {
    path: path.resolve(__dirname, 'out'),
    filename: 'mcp-server.js',
    libraryTarget: 'commonjs2',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
    ],
  },
  devtool: 'nosources-source-map',
};

module.exports = [desktopConfig, webConfig, mcpServerConfig];
