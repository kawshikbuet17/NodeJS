const http = require('http');

const server = http.createServer((req, res)=>{
    res.write('Hello Programmers');
    res.write('How are you doing?');
    res.end();
});

server.listen(3000);
console.log('listening on port 3000');

//run this code
//and browse localhost:3000
//website will show Hello ProgrammersHow are you doing?