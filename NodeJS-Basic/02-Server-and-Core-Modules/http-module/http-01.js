const http = require('http');

const server = http.createServer();
//server is an event emitter
//that means this has .on, .listen features

server.on('connection', ()=>{
    console.log('New connection ...');
});

server.listen(3000);
console.log('listening on port 3000');

//Now open browser
//run this code
//and browse localhost:3000

