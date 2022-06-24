//dependencies

const { handleReqRes } = require("../../helpers/handleReqRes");

//module scaffolding
const handler = {};

handler.userHandler = (requestProperties, callback)=>{
    const acceptedMethods = ['get', 'post', 'put', 'delete'];

    //indexOf returns the index number
    //if exists then the index number is greater then -1, because index starts with 0
    if(acceptedMethods.indexOf(requestProperties.method) > -1){
        handler._users[requestProperties.method](requestProperties, callback);
    }else{
        //405 not allowed
        callback(405);
    }
};


handler._users = {};

handler._users.post = (requestProperties, callback)=>{

};

handler._users.get = (requestProperties, callback)=>{
    callback(200);
};

handler._users.put = (requestProperties, callback)=>{

};

handler._users.delete = (requestProperties, callback)=>{

};


module.exports = handler;