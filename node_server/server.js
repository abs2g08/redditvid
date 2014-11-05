var express = require("express");
var app = express();

var path = require('path');
 
// host reddit vid app
// app.get("*", function(req, res) {
// 	res.sendFile(path.resolve('../dist/index.html'));
// });

app.use(express.static(__dirname + '/../dist'));

var port = process.env.PORT || 5000;

app.listen(port, function() {
	console.log("Listening on " + port);
});