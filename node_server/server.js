var express = require("express");
var url = require('url');
var proxy = require('proxy-middleware');
var app = express();

var path = require('path');

app.use(express.static(__dirname + '/../dist'));

app.get('/test', function(req, res) {
	res.send('Hello World, this is a test route');
});

app.use('/reddit-cors-proxy', proxy(url.parse('http://reddit.com')));
app.use('/ssl-reddit', proxy(url.parse('https://ssl.reddit.com')));
app.use('/oath-reddit', proxy(url.parse('https://oauth.reddit.com')));

var port = process.env.PORT || 5000;

app.listen(port, function() {
	console.log('Listening on ' + port);
});