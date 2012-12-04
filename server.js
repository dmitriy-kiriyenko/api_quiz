var http = require('http');
var crypto = require('crypto')
var redis = require('node-redis');
var redisClient = redis.createClient();
redisClient.on("error", function (err) {
    console.log("Error " + err);
});

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
    var shasum = crypto.createHash('sha1');

    response.on('data', function(chunk) { shasum.update(chunk) });
    response.on('end', function() { finalizeResponse(res, shasum.digest('hex'))})
  }

  http.request(where, cb).end();
}

var storeValue = function(req, res) {
  var body = '';
  req.on('data', function(chunk) { body += chunk});
  req.on('end', function() {
    var value = body.match(/value=(.+)/)[1];
    redisClient.set('value', value);
    finalizeResponse(res, 'saved ' + value);
  });
}

var getValue = function(res) {
  redisClient.get('value', function(err, value) {
    finalizeResponse(res, value.toString());
  });
}

var handleStore = function(req, res) {
  if (req.method === 'POST') {
    storeValue(req, res);
  } else {
    getValue(res)
  }
}


http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'application/json'});
  if (req.url.match(/^\/fib\/\d+/)) {
    getFib(res, req.url.match(/\d+/)[0]);
  } else if (req.url === '/google-body') {
    getUrl(res, 'www.google.com.ua');
  } else if (req.url === '/store') {
    handleStore(req, res);
  } else {
    finalizeResponse(res, 'unknown');
  }
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:8080/');
