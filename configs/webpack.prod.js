const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const WebpackBar = require('webpackbar');

module.exports = {
   mode: 'production',
   entry: { main: path.resolve(__dirname, '../src/main.js') },
   output: {
      filename: '[name].[contentHash].bundle.js',
      path: path.resolve(__dirname, '../dist'),
   },
   stats: {
      assets: true,
      warnings: true,
      errors: true,
      colors: true,
      modules: false,
      builtAt: false,
      version: false,
      timings: false,
      entrypoints: false,
      hash: false,
      children: false,
   },
   plugins: [
      new HtmlWebpackPlugin({
         filename: 'index.html',
         template: path.resolve(__dirname, '../src', 'index.html'),
         chunks: ['main'],
      }),
      new MiniCssExtractPlugin({ filename: 'style.[contentHash].css' }),
      new CleanWebpackPlugin(),
      new VueLoaderPlugin(),
      new WebpackBar(),
      new BundleAnalyzerPlugin({
         analyzerMode: 'disabled',
         generateStatsFile: true,
      }),
   ],
   optimization: {
      minimizer: [new OptimizeCssAssetsPlugin(), new TerserPlugin()],
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
   performance: {
      hints: false,
   },
   module: {
      rules: [
         {
            test: /\.html$/,
            use: ['html-loader'],
         },
         {
            test: /\.css$/,
            use: [
               MiniCssExtractPlugin.loader,
               { loader: 'css-loader', options: { url: false } },
               {
                  loader: 'postcss-loader',
                  options: {
                     postcssOptions: {
                        plugins: ['postcss-preset-env'],
                     },
                  },
               },
            ],
         },
         {
            test: /\.scss$/,
            use: [
               MiniCssExtractPlugin.loader,
               { loader: 'css-loader', options: { url: false } },
               {
                  loader: 'postcss-loader',
                  options: {
                     postcssOptions: {
                        plugins: ['postcss-preset-env'],
                     },
                  },
               },
               'sass-loader',
            ],
         },
         {
            test: /\.js$/,
            exclude: /node_modules/,
            use: ['babel-loader'],
         },
         {
            test: /\.vue$/,
            loader: 'vue-loader',
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
