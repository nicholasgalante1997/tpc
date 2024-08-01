import path from 'node:path';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';

/**
 * @type {webpack.Configuration}
 */
export default {
  mode: 'production',
  devtool: false,
  target: 'browserslist',
  entry: path.resolve(process.cwd(), 'src', 'index.tsx'),
  output: {
    clean: true,
    path: path.resolve(process.cwd(), 'dist'),
    filename: '[name].[contenthash].js',
    module: true,
    chunkFormat: 'module'
  },
  experiments: {
    outputModule: true
  },
  module: {
    rules: [
      {
        test: /\.m?js/,
        type: 'javascript/auto',
        resolve: {
          fullySpecified: false
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
    alias: {
      '@': path.resolve(process.cwd(), 'src')
    },
    fallback: {
      process: false
    }
  },
  plugins: [
    new webpack.ProvidePlugin({ process: 'process/browser' }),
    new webpack.EnvironmentPlugin({ ...process.env }),
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      filename: 'index.html',
      inject: 'body'
    })
  ]
};
