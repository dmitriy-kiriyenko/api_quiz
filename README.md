# API quiz

## Assignment

Using your choice of the programming language and additional libraries and/or frameworks, implement a single HTTP server with API endpoints that provide the following functionalities:

1. A Fibonacci endpoint that accepts a number and returns the Fibonacci calculation for that number, and returns result in JSON format. Example:

    $ curl -s 'http://127.0.0.1:8080/fib/13'
    {"response": 233}
    $ curl -s 'http://127.0.0.1:8080/fib/12'
    {"response": 144}

2. An endpoint that fetches the Google homepage and returns the sha1 of the response message-body (HTTP body data).Example:

    $ curl -s 'http://127.0.0.1:8080/google-body'
    {"response": "272cca559ffe719d20ac90adb9fc4e5716479e96"}

3. Using some external storage of your choice (can be redis, memcache, sqlite, mysql, etc), provide a means to store and then retrieve a value. Example:

    $ curl -d 'value=something' 'http://127.0.0.1:8080/store'
    $ curl 'http://127.0.0.1:8080/store'
    {"response": "something"}

## What I wanted

Learn a little raw nodejs.

## What I did

Nothing fancy.

Run via

    $ node server.js

Works. Store works with default redis (`brew install redis` on OS X).

## What I learnt

NodeJS is horrible. These nasty-nasty unhuman callback async api even to
retrieve post params from request. It's evil.

![](http://i.minus.com/ibdr6PfAeXfoZI.jpg)
