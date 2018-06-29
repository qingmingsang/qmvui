const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  entry: {
    app: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  mode: 'development',
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   use: {
      //     loader: 'babel-loader'
      //   }
      // },
      {
        test: /\.vue$/i,
        exclude: /node_modules/,
        use: {
          loader: 'vue-loader',
          options: {
            // postcss: {
            //   useConfigFile: false//测试环境不用css前缀
            // },
            // cssModules: {
            //   localIdentName: '[path][name]---[local]---[hash:base64:5]'
            // }
          }
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10240//10KB
          }
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1024000//1MB
          }
        }
      }
    ]
  },
  plugins: [
    // make sure to include the plugin for the magic
    new VueLoaderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'test',
      favicon: './favicon.ico',
      template: 'template.html'
    }),
  ],
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      // '@': path.resolve(parentDir, 'example'),
      // '~': path.resolve(parentDir, 'src'),
      // '$thor': process.env.NODE_ENV == 'lib' ? path.resolve(parentDir, 'dist/index.js') : path.resolve(parentDir, 'src/index.js'),
      // '$css': process.env.NODE_ENV == 'lib' ? path.resolve(parentDir, 'dist/index.css') : path.resolve(parentDir, 'example/styles/empty.css'),
    }
  },
  devServer: {
    hot: true,
    //contentBase: path.resolve(__dirname, 'dist'),
    port: 7000
  }
};