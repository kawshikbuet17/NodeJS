//dependencies
const http = require('http');

//app object - module scaffolding
const app = {};

//configuration
app.config = {
    port: 3000
};

//create server
app.createServer = ()=>{
    const server = http.createServer(app.handleReqRes);
    server.listen(app.config.port, ()=>{
        console.log(`listening to port ${app.config.port}`);
    });
};

//handle Request Response
app.handleReqRes = (req, res)=>{
    //response handle
    res.end('Hello World');
}

//start the server
app.createServer();


//use `nodemon index` to run instead of `node index`, then server need not to be run each time after editing
//use postman / browser and go to http://localhost:3000