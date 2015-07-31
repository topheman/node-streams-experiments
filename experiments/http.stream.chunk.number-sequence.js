/*
 * Launch then go to http://localhost:8000
 * Only works with text/plain on curl
 * Only works with text/html on chrome
 */

var http = require('http');
var NumberSequence = require('../libs/number-sequence');

var server = http.createServer(function(req,res){

  //sniffing for curl (with express or other, would be more elaborate - the point is to play is streams)
  var mode = req.headers['user-agent'].indexOf('curl/') > -1 ? "text" : "html";
  var eof = mode === 'text' ? '\n' : '<br>';
  var contentType = mode === 'text' ? 'text/plain' : 'text/html';

  // res.setHeader('Connection', 'Transfer-Encoding');//no need for this header
  // res.setHeader("Transfer-Encoding","chunked");//no need for this header
  res.setHeader("Content-Type", contentType + "; charset=utf8");

  var stream = new NumberSequence(300,40);
  stream.on('data',function(data){
    res.write('counting ... '+ data + eof);
    process.stdout.write('counting ... '+ data + '\n');
  })
  stream.on('end',function(data){
    res.end('ended: '+ data + eof);
    process.stdout.write('ended: '+ data + '\n');
  })
  
  stream.start();
});
server.listen(8000);