//dependencies

//module scaffolding
const handler = {};

//receive requestProperties
//send callback
//callback includes statusCode and payload
handler.sampleHandler = (requestProperties, callback)=>{
    console.log(requestProperties);
    
    //callback with statusCode and payload
    callback(200, {
        message: 'This is a sample url',
    });
};

module.exports = handler;