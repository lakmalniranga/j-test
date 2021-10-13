const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
	devtool: 'eval-source-map',
	externals: [
		nodeExternals({}),
	],
	name: 'server',
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
	],
	optimization: {
		minimize: false,
		nodeEnv: false,
	},
	target: 'node',
	entry: ['./src/server.js'],
	output: {
		publicPath: './build',
		path: path.resolve(__dirname, './build'),
		filename: 'main.js',
		libraryTarget: 'commonjs2',
		hotUpdateChunkFilename: 'hot/hot-update.js',
		hotUpdateMainFilename: 'hot/hot-update.json',
	},
	module: {
		rules: [
			{
				test: /\.(js)$/,
				loader: 'babel-loader',
				options: {
					babelrc: true,
				},
			},
			{
				test: /\.(json)$/,
				loader: 'json-loader',
			},
		],
	},
	node: {
		// Need this when working with express, otherwise the build fails
		__dirname: false, // if you don't put this is, __dirname
		__filename: false, // and __filename return blank or /
	},
};
