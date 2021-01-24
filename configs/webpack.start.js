const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
   mode: 'development',
   devtool: 'source-map',
   entry: { main: path.resolve(__dirname, '../src/main.js') },
   output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, '../dist'),
   },
   stats: {
      warnings: true,
      errors: true,
      colors: true,
      assets: false,
      builtAt: false,
      modules: false,
      performance: false,
      timings: false,
      version: false,
      entrypoints: false,
      hash: false,
   },
   devServer: {
      contentBase: '../dist',
      historyApiFallback: true,
      overlay: true,
      inline: true,
      hot: true,
      port: 8000,
      clientLogLevel: 'silent',
   },
   plugins: [
      new webpack.DefinePlugin({
         __VUE_OPTIONS_API__: true,
         __VUE_PROD_DEVTOOLS__: false,
      }),
      new HtmlWebpackPlugin({
         filename: 'index.html',
         template: path.resolve(__dirname, '../src', 'index.html'),
         chunks: ['main'],
      }),
      new VueLoaderPlugin(),
   ],
   optimization: {
      splitChunks: {
         cacheGroups: {
            vendors: {
               test: /[\\/]node_modules[\\/]/,
               name: 'vendor',
               chunks: 'all',
               enforce: true,
            },
         },
      },
   },
   module: {
      rules: [
         {
            test: /\.html$/,
            use: ['html-loader'],
         },
         {
            test: /\.css$/,
            use: ['style-loader', { loader: 'css-loader', options: { url: false } }],
         },
         {
            test: /\.scss$/,
            use: ['style-loader', { loader: 'css-loader', options: { url: false } }, 'sass-loader'],
         },
         {
            test: /\.js$/,
            exclude: /node_modules/,
            use: 'babel-loader',
         },
         {
            test: /\.vue$/,
            use: 'vue-loader',
         },
         {
            test: /\.ico$/,
            use: {
               loader: 'file-loader',
               options: { name: 'favicon.ico', outputPath: 'assets/favicon' },
            },
         },
         {
            test: /\.svg$/,
            use: {
               loader: 'file-loader',
               options: { name: '[name].[ext]', esModule: false, outputPath: 'assets/svg' },
            },
         },
         {
            test: /\.(jpeg|png|jpg|gif)$/,
            use: {
               loader: 'file-loader',
               options: { name: '[name].[ext]', esModule: false, outputPath: 'assets/images' },
            },
         },
         {
            test: /\.(ttf|woff|woff2)$/,
            use: {
               loader: 'file-loader',
               options: { name: '[name].[ext]', esModule: false, outputPath: 'assets/fonts' },
            },
         },
      ],
   },
};
