const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
  entry: {
    app: [
      // 'webpack/hot/dev-server',
      // 'webpack-dev-server/client?http://0.0.0.0:8082',
      'babel-polyfill',
      './src/index.jsx'
    ]
  },
  devServer: {
    port: 8082,
    historyApiFallback: true,
    contentBase: './',
    // watchContentBase: true,
    publicPath: '/'
  },
  plugins: [
    // In general it's good practice to clean the /dist folder before each build,
    // so that only used files will be generated
    new CleanWebpackPlugin(['dist']),
    // it will replace our index.html file with a newly generated one
    new HtmlWebpackPlugin({
      template: './index.html'
    })
    // Enabling Hot Module Replacement
    // new webpack.NamedModulesPlugin(),
    // new webpack.HotModuleReplacementPlugin()
  ],
  output: {
    // filename: './index.prod.js',
    filename: devMode ? '[name].js' : '[name].[hash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  optimization: {
    // prevent to duplicate dependencies
    splitChunks: {
      chunks: 'all'
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        include: [path.resolve(__dirname, 'src')],
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react']
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
}
