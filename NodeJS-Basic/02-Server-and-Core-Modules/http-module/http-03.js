const http = require('http');

const server = http.createServer((req, res)=>{
    if(req.url === '/'){
        res.write('Hello Programmers');
        res.write('This is root home page');
        res.end();
    }
    else if(req.url === '/about'){
        res.write('This is about us page');
        res.end();
    }
    else{
        res.write('Not Found');
        res.end();
    }

    //but in real life application
    //url or route can be millions
    //it's not possible to write all using if else
    //solution is using framework (express js)
});

server.listen(3000);
console.log('listening on port 3000');

//run this code
//and browse localhost:3000
//then browse localhost:3000/about