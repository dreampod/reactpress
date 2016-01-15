var fs		= require('fs');
var path	= require('path');
var webpack = require('webpack');
var srcPath = path.join(__dirname, 'app');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	entry: fs.readdirSync(__dirname).reduce(function (entries, dir) {
	    if (fs.statSync(path.join(__dirname, dir)).isDirectory() && dir === 'app')
	      	entries[dir] = path.join(__dirname, dir, 'app.js')
	    return entries
	}, {}),
	output: {
		path: __dirname + '/dist',
		filename: '[name].js',
		chunkFilename: '[id].chunk.js',
    	publicPath: '/__build__/'
	},
	module: {
	    loaders: [
	    	{ test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
	      	{
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            }
	    ]
	},
	plugins: [
	    new webpack.optimize.CommonsChunkPlugin('shared.js'),
	    new webpack.optimize.OccurenceOrderPlugin(),
		new ExtractTextPlugin("[name].css", { allChunks: true }),
	    new webpack.DefinePlugin({
	      	'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
	    }),
	    new webpack.optimize.UglifyJsPlugin({
		    compress: {
		        warnings: false
		    }
		}),
	]
}