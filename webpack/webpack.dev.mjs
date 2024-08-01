import path from 'node:path';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';

/**
 * @type {webpack.Configuration}
 */
export default {
  mode: 'development',
  target: 'browserslist',
  entry: path.resolve(process.cwd(), 'src', 'index.tsx'),
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
