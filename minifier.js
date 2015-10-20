//https://gist.github.com/jaywon/f5c38602d02ea654276b

var fs = require('fs');
var util = require('util');
var inherits = require('util').inherits;
var Transform = require('util').Transform;
var argv = require('minimist')(process.argv.slice(2));

var readableStdin = fs.createReadStream(argv.input);

var writeableStdout = fs.createWriteStream(argv.output);

function Transpiler() {
  Transform.call(this);
}

inherits(Transpiler, Transform);

Transpiler.prototype._transform = function(chunk, encoding, done) {
  chunk = chunk.toString().replace(/(\r\n|\n|\r|\s)/gm, "");
  this.push(chunk);
  done();
};


readableStdin.pipe(new Transpiler).pipe(writeableStdout);