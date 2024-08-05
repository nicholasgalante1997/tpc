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
  mode: 'development',
  devtool: 'cheap-source-map',
  devServer: {
    port: 3000,
    compress: true,
    open: true,
    hot: true,
    historyApiFallback: true,
    static: [
      {
        directory: path.resolve(process.cwd(), 'public', 'css'),
        publicPath: '/css'
      },
      {
        directory: path.resolve(process.cwd(), 'public', 'assets'),
        publicPath: '/assets'
      },
      {
        directory: path.resolve(process.cwd(), 'public', 'markdown'),
        publicPath: '/markdown'
      }
    ]
  }
});
