//dependencies

//module scaffolding
const handler = {};

//receive requestProperties
//send callback
//callback includes statusCode and payload
handler.notFoundHandler = (requestProperties, callback)=>{
    console.log(requestProperties);
    
    //callback with statusCode and payload
    callback(404, {
        message: 'Your requested URL was not found',
    });
};

module.exports = handler;