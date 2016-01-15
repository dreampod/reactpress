var express = require('express');
var rewrite = require('express-urlrewrite');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var WebpackConfig = require('./webpack.config');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var compress   = require('compression');
var fs         = require('fs');
var path       = require('path');

var env = process.env.NODE_ENV;
var app = express()

mongoose.connect('mongodb://localhost:27017/DATABASE_NAME');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(compress());

if(env == 'production') {
	app.use('/media', express.static(__dirname + '/app/media'));
	app.use('/', express.static(__dirname + '/dist'));
	app.get('*', function response(req, res) {
	    res.sendFile(path.join(__dirname, 'dist/index.html'));
	});
}

else {
	app.use(webpackDevMiddleware(webpack(WebpackConfig), {
		publicPath: '/__build__/',
		stats: {
			colors: true
		}
	}))

	app.use('/media', express.static(__dirname + '/app/media'));
	app.use(rewrite('/*', '/app/index.html'))
	app.use(express.static(__dirname));
}

app.listen(8080, function(){
	console.log('Magic happens on port 8080');
});