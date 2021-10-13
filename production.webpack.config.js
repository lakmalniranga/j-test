const path = require('path');

module.exports = {
	mode: 'production',
	devtool: 'source-map',
	name: 'server',
	target: 'node',
	entry: ['./src/server.js'],
	output: {
		publicPath: './build',
		path: path.resolve(__dirname, './build'),
		filename: 'main.js',
		libraryTarget: 'commonjs2',
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
		],
	},
	optimization: {
		nodeEnv: false,
		minimize: false,
	},
	node: {
		// Need this when working with express, otherwise the build fails
		__dirname: false, // if you don't put this, __dirname
		__filename: false, // and __filename return blank or /
	},
};
