var express = require("express");
//var proxy = require("http-proxy").createProxyServer;
var url = require('url');
var proxy = require('proxy-middleware');
var app = express();

var path = require('path');

app.use(express.static(__dirname + '/../dist'));

app.get('/test', function(req, res) {
	res.send('Hello World');
});

//app.use('/reddit', proxy({ target: 'http://reddit.com'} ).web );

app.use('/reddit-cors-proxy', proxy(url.parse('http://reddit.com')));

app.use('/ssl-reddit', proxy(url.parse('https://ssl.reddit.com')));

var port = process.env.PORT || 5000;

app.listen(port, function() {
	console.log('Listening on ' + port);
});

// var express = require( 'express' );
// var proxy   = require( 'http-proxy' ).createProxyServer;
// var app     = express();

// app.configure(function() {

//   // Inject some request headers here before we proxy...
//   app.use( function( req, res, next ) {
//     req.headers[ 'x-my-header' ] = 'blah blah';
//     next();
//   });

//   // Proxy based on path...
//   app.use( '/stack', proxy({ target: 'http://stackoverflow.com'} ).web );
//   app.use( '/yahoo', proxy({ target: 'http://yahoo.com'} ).web );

//   app.use( function( req, res ) {
//     res.send({ ok: false, message: 'Not much here.' })
//   });

// }).listen( 3000 );