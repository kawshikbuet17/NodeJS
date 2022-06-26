//dependencies
const data = require('../../lib/data');
const {hash} = require('../../helpers/utilities');
const {parseJSON, createRandomString} = require('../../helpers/utilities');
const tokenHandler = require('./tokenHandler');
const {maxChecks} = require('../../helpers/environments');

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
    /*
        For Testing (postman)
        1. a user must be created previously
        2. must have an unexpired token must
        http://localhost:3000/check POST method
        in Body
        {
            "protocol": "http",
            "url": "google.com",
            "method": "GET",
            "successCodes": [200, 201],
            "timeoutSeconds": 2
        }
        in Header
        add token = token_id
     */
    
    //validate inputs
    //validate protocol http or https
    let protocol = typeof(requestProperties.body.protocol) === 'string' && ['http', 'https'].indexOf(requestProperties.body.protocol) > -1 ? requestProperties.body.protocol : false;

    //validate url
    let url = typeof(requestProperties.body.url) === 'string' &&  requestProperties.body.url.trim().length > 0 ? requestProperties.body.url : false;

    //validate method
    let method = typeof(requestProperties.body.method) === 'string' && ['GET', 'POST', 'PUT', 'DELETE'].indexOf(requestProperties.body.method) > -1 ? requestProperties.body.method : false;

    //validate success codes
    //in JS, type of array is object
    //success codes is an array
    let successCodes = typeof(requestProperties.body.successCodes) === 'object' && requestProperties.body.successCodes instanceof Array ? requestProperties.body.successCodes : false;

    //validate timeout seconds
    //check if integer
    //check if in boundary [1,5] seconds
    let timeoutSeconds = typeof(requestProperties.body.timeoutSeconds) === 'number' && requestProperties.body.timeoutSeconds % 1 === 0 && requestProperties.body.timeoutSeconds >= 1 && requestProperties.body.timeoutSeconds <= 5 ?  requestProperties.body.timeoutSeconds : false;

    if(protocol && url && method && successCodes && timeoutSeconds){
        //client will provide token with the request
        let token = typeof(requestProperties.headersObject.token) === 'string' ? requestProperties.headersObject.token : false;

        //lookup the user phone by reading the token
        data.read('tokens', token, (err1, tokenData)=>{
            if(!err1 && tokenData){
                let userPhone = parseJSON(tokenData).phone;
                
                //lookup the user data
                data.read('users', userPhone, (err2, userData)=>{
                    if(!err2 && userData){
                        tokenHandler._token.verify(token, userPhone, (tokenIsValid)=>{
                            if(tokenIsValid){
                                let userObject = parseJSON(userData);
                                let userChecks = typeof(userObject.checks) === 'object' && userObject.checks instanceof Array ? userObject.checks : [];

                                if(userChecks.length < maxChecks){
                                    let checkId = createRandomString(20);
                                    let checkObject = {
                                        'id': checkId,
                                        'userPhone': 'phone',
                                        'protocol': protocol,
                                        'url': url,
                                        'method': method,
                                        'successCodes': successCodes,
                                        'timeoutSeconds': timeoutSeconds,
                                    };

                                    //save the object
                                    data.create('checks', checkId, checkObject, (err3)=>{
                                        if(!err3){
                                            //add checkid to the user's object
                                            userObject.checks = userChecks;
                                            userObject.checks.push(checkId);

                                            //save the new user data
                                            data.update('users', userPhone, userObject, (err4)=>{
                                                if(!err4){
                                                    //return the data about the new check
                                                    callback(200, checkObject);
                                                }else{
                                                    callback(500, {
                                                        'error': 'There was a error in the server side',
                                                    });
                                                }
                                            })
                                        }else{
                                            callback(500, {
                                                'error': 'There was a error in the server side',
                                            });
                                        }
                                    });
                                }else{
                                    callback(401, {
                                        'error': 'User has already reached max check limit',
                                    });
                                }
                            }else{
                                callback(403, {
                                    'error': 'Authentication problem',
                                });
                            }
                        });
                    }else{
                        callback(403, {
                            'error': 'User not found',
                        })
                    }
                });
            }else{
                callback(403, {
                    'error': 'Authentication problem',
                });
            }
        })
    }else{
        callback(400, {
            'error': 'You have a problem in your request',
        })
    }

};

handler._check.get = (requestProperties, callback) => {
};

handler._check.put = (requestProperties, callback) => {
};

handler._check.delete = (requestProperties, callback) => {
};


module.exports = handler;