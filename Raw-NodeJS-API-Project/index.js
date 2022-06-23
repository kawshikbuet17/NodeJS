//dependencies
const http = require('http');
const {handleReqRes} = require('./helpers/handleReqRes');
const environment = require('./helpers/environments');

//app object - module scaffolding
const app = {};

//create server
app.createServer = ()=>{
    const server = http.createServer(app.handleReqRes);
    server.listen(environment.port, ()=>{
        console.log(`listening to port ${environment.port}`);
    });
};

//handle Request Response
app.handleReqRes = handleReqRes;

//start the server
app.createServer();


//use postman / browser and go to http://localhost:<Environment Variable Selected Port>
//to run use `npm run staging` or `npm run production`
//to be more specific run `SET NODE_ENV=staging&nodemon index`