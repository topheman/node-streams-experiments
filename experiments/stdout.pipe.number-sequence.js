var NumberSequence = require('../libs/number-sequence');

var Transform = require('stream').Transform;
var parser = new Transform({objectMode:true});

//also works
//parser._readableState.objectMode = false;
//parser._writableState.objectMode = true;

parser._transform = function(buffer, encoding, next){
  this.push('counting ... ' + buffer.toString()+'\n');
  next();
}

var numberSequence = new NumberSequence(300,10);

numberSequence
  .pipe(parser)
  .pipe(process.stdout);

numberSequence.on('end',function(chunk){
  process.stdout.write('ended at: ' + chunk + '\n');
  process.exit();
})

numberSequence.start();