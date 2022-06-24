//dependencies
const data = require('../../lib/data');
const {hash} = require('../../helpers/utilities');
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
    callback(200);
};

handler._users.put = (requestProperties, callback) => {

};

handler._users.delete = (requestProperties, callback) => {

};


module.exports = handler;