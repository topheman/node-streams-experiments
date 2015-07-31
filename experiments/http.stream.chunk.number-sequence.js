/*
 * Launch then go to http://localhost:8000
 * Doesn't work with text/plain ...
 */

var http = require('http');
var NumberSequence = require('../libs/number-sequence');

var server = http.createServer(function(req,res){
  // res.setHeader("Transfer-Encoding","chunked");//no need for this header
  res.setHeader("Content-Type", "text/html; charset=utf8");//doesn't work with text/plain
  var stream = new NumberSequence(300,40);
  stream.on('data',function(data){
    res.write('counting ... '+ data + '<br>');
    process.stdout.write('counting ... '+ data + '\n');
  })
  stream.on('end',function(data){
    res.end('ended: '+ data + '<br>');
    process.stdout.write('ended: '+ data + '\n');
  })
  stream.start();
});
server.listen(8000);