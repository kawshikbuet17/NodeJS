//dependencies
const data = require('../../lib/data');
const {hash} = require('../../helpers/utilities');
const {parseJSON} = require('../../helpers/utilities');
const tokenHandler = require('./tokenHandler');

//module scaffolding
const handler = {};

handler.checkHandler = (requestProperties, callback) => {
    const acceptedMethods = ['get', 'post', 'put', 'delete'];

    //indexOf returns the index number
    //if exists then the index number is greater then -1, because index starts with 0
    if (acceptedMethods.indexOf(requestProperties.method) > -1) {
        handler._check[requestProperties.method](requestProperties, callback);
    } else {
        //405 not allowed
        callback(405);
    }
};


handler._check = {};

handler._check.post = (requestProperties, callback) => {
    //validate inputs
    
};

handler._check.get = (requestProperties, callback) => {
};

handler._check.put = (requestProperties, callback) => {
};

handler._check.delete = (requestProperties, callback) => {
};


module.exports = handler;