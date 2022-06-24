//dependencies
const data = require('../../lib/data');
const {hash} = require('../../helpers/utilities');
const {parseJSON} = require('../../helpers/utilities');
const { handleReqRes } = require("../../helpers/handleReqRes");

//module scaffolding
const handler = {};

handler.userHandler = (requestProperties, callback) => {
    const acceptedMethods = ['get', 'post', 'put', 'delete'];

    //indexOf returns the index number
    //if exists then the index number is greater then -1, because index starts with 0
    if (acceptedMethods.indexOf(requestProperties.method) > -1) {
        handler._users[requestProperties.method](requestProperties, callback);
    } else {
        //405 not allowed
        callback(405);
    }
};


handler._users = {};

handler._users.post = (requestProperties, callback) => {
    //get data from POST method request
    //here .trim to eliminate unnecessary white spaces
    const firstName = typeof (requestProperties.body.firstName) === 'string' && requestProperties.body.firstName.trim().length > 0 ? requestProperties.body.firstName : false;

    const lastName = typeof (requestProperties.body.lastName) === 'string' && requestProperties.body.lastName.trim().length > 0 ? requestProperties.body.lastName : false;

    const phone = typeof (requestProperties.body.phone) === 'string' && requestProperties.body.phone.trim().length === 11 ? requestProperties.body.phone : false;

    const password = typeof (requestProperties.body.password) === 'string' && requestProperties.body.password.trim().length > 0 ? requestProperties.body.password : false;

    const tosAgreement = typeof (requestProperties.body.tosAgreement) === 'boolean' ? requestProperties.body.tosAgreement : false;

    //check all values are true or not
    if(firstName && lastName && phone && password && tosAgreement){
        //make sure that the user doesn't already exist
        //here ./data/users/phone.json is a filename of an user
        data.read('users', phone, (err1)=>{
            //if read error, then no user with this
            //so can be created
            if(err1){
                //create a json object
                let userObject = {
                    //if both are same
                    //firstName, //this can be written also
                    firstName: firstName,
                    lastName: lastName,
                    phone: phone,
                    password: hash(password),
                    tosAgreement: tosAgreement,
                }

                //store the user to .data
                //'.data/users' folder must be created manually
                //phone.json will be the filename
                //userObject must be passed from postman by POST method
                /*
                    Test Input from Postman
                    http://localhost:3000/user
                    method POST
                    type the following Object in body section
                    as RAW and JSON

                    {
                        "firstName": "Kawshik",
                        "lastName": "Paul",
                        "phone": "01516763KKP",
                        "password": "kkp",
                        "tosAgreement": true
                    }
                */

                //now create user
                data.create('users', phone, userObject, (err2)=>{
                    if(!err2){
                        callback(200, {
                            'message': 'User was created successfully',
                        })
                    }else{
                        callback(500, {
                            'error': 'Could not create user',
                        });
                    }
                });

            }else{
                callback(500, {
                    'error': 'There was a problem in server side',
                });
            }
        });
    }else{
        callback(400, {
            error: 'You have a problem in your request',
        });
    }
};

handler._users.get = (requestProperties, callback) => {
    //http://localhost:3000/user?phone=01516763KKP GET method
    //if this is requested, we will send the 01516763KKP user data to client as response
    //phone=01516763KKP is called the query string
    //check the phone number of the query string is valid

    const phone = typeof (requestProperties.queryStringObject.phone) === 'string' && requestProperties.queryStringObject.phone.trim().length === 11 ? requestProperties.queryStringObject.phone : false;

    if(phone){
        //lookup the user
        data.read('users', phone, (err, u)=>{
            //const user = u; //object shouldn't be copied like this

            //this is called spread operator
            //this copies the data immutably
            //object must be single level (not object in object)
            const user = { ...parseJSON(u)};

            if(!err && user){
                delete user.password;
                callback(200, user);
            }
        });
    }else{
        callback(404, {
            'error': 'Requested user was not found',
        });
    }

};

handler._users.put = (requestProperties, callback) => {
        /*
        For testing
        http://localhost:3000/user PUT method (postman)
        as body (RAW, JSON)
        {
            "firstName": "Kawshik Kumar",
            "lastName": "Paul",
            "phone": "01516763KKP",
            "password": "kkp new pswd"
        }
         */

        //check the phone number is valid
        const phone = typeof (requestProperties.body.phone) === 'string' && requestProperties.body.phone.trim().length === 11 ? requestProperties.body.phone : false;

        const firstName = typeof (requestProperties.body.firstName) === 'string' && requestProperties.body.firstName.trim().length > 0 ? requestProperties.body.firstName : false;

        const lastName = typeof (requestProperties.body.lastName) === 'string' && requestProperties.body.lastName.trim().length > 0 ? requestProperties.body.lastName : false;

        const password = typeof (requestProperties.body.password) === 'string' && requestProperties.body.password.trim().length > 0 ? requestProperties.body.password : false;

        if(phone){
            if( firstName || lastName || password){
                //lookup the user in our file .data
                data.read('users', phone, (err, uData)=>{
                    const userData = { ...parseJSON(uData)};
                    if(!err && userData){
                        if(firstName){
                            userData.firstName = firstName;
                        }
                        if(lastName){
                            userData.lastName = lastName;
                        }
                        if(password){
                            userData.password = hash(password);
                        }

                        //store to file system .data
                        data.update('users', phone, userData, (err2)=>{
                            if(!err2){
                                callback(200, {
                                    'message': 'User was updated successfully',
                                });
                            }else{
                                callback(400, {
                                    'error': 'There is a problem in server side',
                                });
                            }
                        });
                    }else{
                        callback(400, {
                            'error': 'You have a problem in your request',
                        });
                    }
                });

            }else{
                callback(400, {
                    'error': 'You have a problem in your request',
                });
            }
        }else{
            callback(400, {
                'error': 'Invalid phone number. Please try again',
            });
        }
};

handler._users.delete = (requestProperties, callback) => {

};


module.exports = handler;