const HTMLWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
	entry: './src/main/js/index.js',
	output: {
    		filename: 'app.js',
    		path: __dirname + '/src/main/resources/static/built'
    	},
    devServer: {
      contentBase: './src/main/js',
      hot: true
    },
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude : /node_modules/,
				use: 'babel-loader'
			}
		]
	},
	plugins: [
		new HTMLWebpackPlugin({
			template: __dirname + '/src/main/resources/static/templates/index.html',
			filename: 'index.html',
			inject: 'body'
		}),
	]
};
