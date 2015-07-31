/**
 * from https://github.com/substack/stream-handbook#consuming-a-readable-stream
 * Test with echo "tototosdfsfgsf gsdfg sfd gsdfg sgdf" | node experiments/read.process.stdin.js
 */

process.stdin.on('readable', function () {
  var buf = process.stdin.read();
  console.dir(buf);
});