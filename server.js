var http = require('http');

var fib = function(n) {
  var fibs = [0, 1];
  if (n < 2) { return fibs[n] }
  for (var i = 2; i <= n; ++i) {
    fibs[i] = fibs[i-1] + fibs[i-2];
  }
  return fibs[n];
}

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'application/json'});
  if (req.url.match(/^\/fib\/\d+/)) {
    res.end( JSON.stringify({ 'response': fib(req.url.match(/\d+/)[0]) }) + '\n' );
  } else {
    res.end(JSON.stringify({}) + '\n');
  }
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');
