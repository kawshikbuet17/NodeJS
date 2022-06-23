//dependencies
const {sampleHandler} = require('./handlers/routeHandlers/sampleHandler');


const routes = {
    //'url': call which function
    'sample': sampleHandler,
};

module.exports = routes;