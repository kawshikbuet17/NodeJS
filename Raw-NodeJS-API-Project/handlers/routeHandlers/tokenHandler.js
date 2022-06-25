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
    
};

handler._token.put = (requestProperties, callback) => {
    
};

handler._token.delete = (requestProperties, callback) => {
    
};


module.exports = handler;