var http = require('http');
var crypto = require('crypto')

var finalizeResponse = function(response, result) {
  response.end( JSON.stringify({ response: result }) + '\n');
}

var fib = function(n) {
  var fibs = [0, 1];
  if (n < 2) { return fibs[n] }
  for (var i = 2; i <= n; ++i) {
    fibs[i] = fibs[i-1] + fibs[i-2];
  }
  return fibs[n];
}

var getFib = function(res, n) {
  finalizeResponse(res, fib(n));
}

var getUrl = function(res, url) {
  var where = { host: url }
  var cb = function(response) {
    var shasum = crypto.createHash('sha1')

    response.on('data', function(chunk) { shasum.update(chunk) });
    response.on('end', function() { finalizeResponse(res, shasum.digest('hex'))})
  }

  http.request(where, cb).end();
}


http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'application/json'});
  if (req.url.match(/^\/fib\/\d+/)) {
    getFib(res, req.url.match(/\d+/)[0]);
  } else if (req.url.match(/^\/google-body/)) {
    getUrl(res, 'www.google.com.ua');
  } else {
    res.end(JSON.stringify({ 'response': 'unknown' }) + '\n');
  }
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');
