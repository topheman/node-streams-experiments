var Stream = require('stream');
var currentNumber = 0;
var MAX_NUMBER = 10;
var INTERVAL = 500;
var timer;

var numberSequence = new Stream();

// called each INTERVAL ms via setTimeout,
// the emit events of numberSequence are declared inside
function nextStep(){
  if(currentNumber === MAX_NUMBER){
    clearTimeout(timer);
    numberSequence.emit('end',currentNumber);
  }
  currentNumber++;
  numberSequence.emit('data', currentNumber);
  timer = setTimeout(function(){nextStep()},INTERVAL);
}

// Why do I have to use objectMode, since only strings are passed by ?
var Transform = require('stream').Transform;
var parser = new Transform({objectMode:true});

parser._transform = function(buffer, encoding, next){
  this.push('counting ... ' + buffer.toString()+'\n');
  next();
}

numberSequence
  .pipe(parser)
  .pipe(process.stdout);

// is there a way to catch the "end" event in the transform parser,
// so that it would be directly piped ?
numberSequence.on('end',function(chunk){
  process.stdout.write('ended at: ' + chunk + '\n');
  process.exit();
})

// launch the stream
nextStep();