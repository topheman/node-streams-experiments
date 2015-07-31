//from https://github.com/substack/stream-handbook#why-you-should-use-streams

var http = require('http');
var fs = require('fs');
var path = require('path');

var server = http.createServer(function(req,res){
	res.setHeader("Content-Type", "text/plain; charset=utf8");
	var stream = fs.createReadStream(path.join(__dirname,'../fixtures/list.firstName.Paris.2004-2012.csv'));
	stream.pipe(res);
});
server.listen(8000);