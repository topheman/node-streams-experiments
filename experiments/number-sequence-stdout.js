var NumberSequence = require('../libs/number-sequence');

var numberSequence = new NumberSequence(1000,10);

numberSequence.on('data',function(number){
	process.stdout.write('counting ... ' + number + '\n');
})

numberSequence.on('end',function(number){
	process.stdout.write('ended at: ' + number + '\n');
})

numberSequence.on('error',function(error){
	process.stdout.write('error: ' + error + '\n');
})

numberSequence.start();