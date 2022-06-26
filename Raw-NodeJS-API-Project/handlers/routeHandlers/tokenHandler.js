//dependencies
const data = require('../../lib/data');
const {hash} = require('../../helpers/utilities');
const {createRandomString} = require('../../helpers/utilities');
const {parseJSON} = require('../../helpers/utilities');


//module scaffolding
const handler = {};

handler.tokenHandler = (requestProperties, callback) => {
    const acceptedMethods = ['get', 'post', 'put', 'delete'];

    //indexOf returns the index number
    //if exists then the index number is greater then -1, because index starts with 0
    if (acceptedMethods.indexOf(requestProperties.method) > -1) {
        handler._token[requestProperties.method](requestProperties, callback);
    } else {
        //405 not allowed
        callback(405);
    }
};


handler._token = {};

handler._token.post = (requestProperties, callback) => {
    //a folder named .data/tokens must be created previously

    /*
    For Testing (Postman)
    Create an User (or use a previously created user)
    http://localhost:3000/user POST method
    as Body and JSON
    {
        "firstName": "Kawshik",
        "lastName": "Paul",
        "phone": "01516763KKP",
        "password": "kkp",
        "tosAgreement": true
    }

    http://localhost:3000/token POST method
    as Body and JSON
    {
        "phone": "01516763KKP",
        "password": "kkp"
    }

    a token will be generated
    */

    const phone = typeof (requestProperties.body.phone) === 'string' && requestProperties.body.phone.trim().length === 11 ? requestProperties.body.phone : false;

    const password = typeof (requestProperties.body.password) === 'string' && requestProperties.body.password.trim().length > 0 ? requestProperties.body.password : false;

    if(phone && password){
        data.read('users', phone, (err, userData)=>{
            let hashedpassword = hash(password);

            if(hashedpassword === parseJSON(userData).password){
                let tokenId = createRandomString(20);
                let expires = Date.now() + 60 * 60 * 1000; //1hr lifetime of token (milisec)
                
                //create a Object for token
                let tokenObject = {
                    'phone': phone,
                    'id': tokenId,
                    'expires': expires,
                }

                //store the token
                data.create('tokens', tokenId, tokenObject, (err2)=>{
                    if(!err2){
                        callback(200, tokenObject);
                    }else{
                        callback(500, {
                            error: 'There was a problem in the server side',
                        });
                    }
                });

            }else{
                callback(400, {
                    error: 'Password is not valid',
                });
            }
        });
    }else{
        callback(400, {
            error: 'You have a problem in your request',
        });
    }
};

handler._token.get = (requestProperties, callback) => {
    /*
        For testing (postman)
        http://localhost:3000/token?id=knn5glkolpyh74lzv1mx GET method
        if token id is valid, token information is shown as response
    */

    //check the token id of the query string is valid
    const id = typeof (requestProperties.queryStringObject.id) === 'string' && requestProperties.queryStringObject.id.trim().length === 20 ? requestProperties.queryStringObject.id : false;

    if(id){
        //lookup the token
        data.read('tokens', id, (err, tokenData)=>{
            //const token = tokenData; //object shouldn't be copied like this

            //this is called spread operator
            //this copies the data immutably
            //object must be single level (not object in object)
            const token = { ...parseJSON(tokenData)};

            if(!err && token){
                callback(200, token);
            }else{
                callback(404, {
                    'error': 'Requested token was not found',
                });
            }
        });
    }else{
        callback(404, {
            'error': 'Requested token was not found',
        });
    }
};

handler._token.put = (requestProperties, callback) => {
    //in PUT method, if user requests `true`
    //token expire time is extended

    /*
        For testing (postman)
        http://localhost:3000/token PUT method

        as Body and JSON
        {
            "id": "psmswq77mjjtrl0f6dih",
            "extend": true
        }

        this will extend the token expire time till currentTime+1hr
    */

    const id = typeof (requestProperties.body.id) === 'string' && requestProperties.body.id.trim().length === 20 ? requestProperties.body.id : false;

    const extend = typeof (requestProperties.body.extend) === 'boolean' && requestProperties.body.extend === true ? true : false;

    if(id && extend){
        data.read('tokens', id, (err, tokenData)=>{
            let tokenObject = parseJSON(tokenData);
            if(tokenObject.expires > Date.now()){
                tokenObject.expires = Date.now() + 60 * 60 * 1000;

                //store the updated token
                data.update('tokens', id, tokenObject, (err2)=>{
                    if(!err2){
                        callback(200);
                    }else{
                        callback(500, {
                            'error': 'There was a server side error',
                        })
                    }
                })
            }else{
                callback(400, {
                    'error': 'Token already expired',
                });
            }
        });
    }else{
        callback(400, {
            'error': 'There was a problem in your request',
        });
    }
};

handler._token.delete = (requestProperties, callback) => {
    
    //Testing
    //http://localhost:3000/token?id=knn5glkolpyh74lzv1mx DELETE method (postman)
    //token file will be deleted

    //check the token id of the query string is valid
    const id = typeof (requestProperties.queryStringObject.id) === 'string' && requestProperties.queryStringObject.id.trim().length === 20 ? requestProperties.queryStringObject.id : false;

    if(id){
        //lookup the token in file system .data
        data.read('tokens', id, (err, tokenData)=>{
            if(!err && tokenData){
                data.delete('tokens', id, (err2)=>{
                    if(!err2){
                        callback(200, {
                            'message': 'Token was successfully deleted',
                        });
                    }else{
                        callback(500, {
                            'error':'There was a server side error',
                        });
                    }
                });
            }else{
                callback(500, {
                    'error': 'There was a server side error',
                })
            }
        });
    }else{
        callback(400, {
            'error': 'There was a problem in your request',
        });
    }
};

//verify token
//phone number is given
//token id is given
//callback true if that token id has that phone number and token unexpired
handler._token.verify = (id, phone, callback)=>{
    data.read('tokens', id, (err, tokenData)=>{
        if(!err && tokenData){
            if(parseJSON(tokenData).phone === phone && parseJSON(tokenData).expires > Date.now()){
                callback(true);
            }else{  
                callback(false);
            }
        }else{
            callback(false);
        }
    });
}

module.exports = handler;