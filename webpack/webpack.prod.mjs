import dotenv from 'dotenv';

dotenv.config();

import path from 'node:path';

import webpack from 'webpack';
import { merge } from 'webpack-merge';

import webpackCommon from './webpack.common.mjs';

/**
 * @type {webpack.Configuration}
 */
export default merge(webpackCommon, {
  mode: 'production',
  devtool: false,
  output: {
    clean: true,
    path: path.resolve(process.cwd(), 'dist'),
    filename: '[name].[contenthash].js',
    module: true,
    chunkFormat: 'module'
  },
  experiments: {
    outputModule: true
  }
});
