const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
	mode: 'production' ,
	devtool: 'source-map' ,
	entry: { index: path.resolve(__dirname, '../src/js/index.js') } ,
	output: {
		filename: '[name].[contentHash].bundle.js' ,
		path: path.resolve(__dirname, '../dist') ,
	} ,
	module: {
		rules: [
			{
				test: /\.html$/ ,
				use: ['html-loader'] ,
			} ,
			{
				test: /\.css$/ ,
				use: [
					'style-loader' ,
					{ loader: 'css-loader' , options: { url: false } } ,
				] ,
			} ,
			{
				test: /\.scss$/ ,
				use: [
					'style-loader' ,
					{ loader: 'css-loader' , options: { url: false } } ,
					'sass-loader' ,
				] ,
			} ,
			{
				test: /\.js$/ ,
				exclude: /node_modules/ ,
				use: ['babel-loader'] ,
			} ,
			{
				test: /\.vue$/ ,
				loader: 'vue-loader' ,
			} ,
			{
				test: /\.ico$/ ,
				use: {
					loader: 'file-loader' ,
					options: { name: 'favicon.ico' , outputPath: 'assets/favicon' } ,
				} ,
			} ,
			{
				test: /\.svg$/ ,
				use: {
					loader: 'file-loader' ,
					options: { name: '[name].[ext]' , esModule: false , outputPath: 'assets/svg' } ,
				} ,
			} ,
			{ 
				test: /\.(jpeg|png|jpg|gif)$/ ,
				use: {
					loader: 'file-loader' ,
					options: { name: '[name].[ext]' , esModule: false , outputPath: 'assets/images' } ,
				} ,
			} ,
			{
				test: /\.(ttf|woff|woff2)$/ ,
				use: {
					loader: 'file-loader' ,
					options: { name: '[name].[ext]' , esModule: false , outputPath: 'assets/fonts' } ,
				} ,
			} ,
		] ,
	} ,
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html' ,
			template: path.resolve(__dirname, '../src', 'index.html') ,
			chunks: ['index'] ,
		}) ,
		new MiniCssExtractPlugin({ filename: 'style.[contentHash].css' }) ,
		new CleanWebpackPlugin() ,
		new VueLoaderPlugin() ,
	] ,
	optimization: {
		minimizer: [ new OptimizeCssAssetsPlugin() , new TerserPlugin() ] ,
		splitChunks: {
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/ ,
                    name: 'vendor' ,
                    chunks: 'all' ,
                    enforce: true ,
                }
            }
        }
	} ,
    resolve: {
		alias: {
		  'vue$': 'vue/dist/vue.esm.js' ,
		} ,
		extensions: ['*', '.js', '.vue', '.json'] ,
	} ,
	performance: {
		hints: 'warning' ,
	} ,
};