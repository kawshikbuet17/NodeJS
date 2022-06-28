const server = require('./lib/server');
const workers = require('./lib/worker');

//app object - module scaffolding
const app = {};

app.init = () =>{
    //start the server
    server.init();

    //start the worker
    workers.init();
}

app.init();

//export the app
module.exports = app;

//use postman / browser and go to http://localhost:<Environment Variable Selected Port>
//to run use `npm run staging` or `npm run production`
//to be more specific run `SET NODE_ENV=staging&nodemon index`