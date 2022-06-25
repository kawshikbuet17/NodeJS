//dependencies
const {sampleHandler} = require('./handlers/routeHandlers/sampleHandler');
const {userHandler} = require('./handlers/routeHandlers/userHandler');
const {tokenHandler} = require('./handlers/routeHandlers/tokenHandler');


const routes = {
    //'url': call which function
    sample: sampleHandler,
    user: userHandler,
    token: tokenHandler,
};

module.exports = routes;


//http://localhost:3000/user GET = client wants user data
//http://localhost:3000/user POST = client wants to create user
//http://localhost:3000/user PUT = client wants update user data
//http://localhost:3000/user DELETE = client wants to delete user
//all these done using postman