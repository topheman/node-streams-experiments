var Stream = require('stream');
var util = require('util');

function NumberSequence(interval, max){
	Stream.call(this);
	this.readable = true;
	this.interval = typeof interval === 'undefined' ? 100 : interval;
	this.max = typeof interval === 'undefined' ? 100 : max;
	this.current = 0;
	console.log('init: ' + this.current);
}

util.inherits(NumberSequence,Stream);

function nextStep(){
	if(this.current === this.max){
		return this.end();
	}
	var that = this;
	this.current++;
	this.emit('data', this.current);
	this.timer = setTimeout(function(){nextStep.call(that)},that.interval);
}

NumberSequence.prototype.start = function(){
	nextStep.call(this);
}
NumberSequence.prototype.end = function(){
	clearTimeout(this.timer);
	this.emit('end',this.current);
}

module.exports = NumberSequence;