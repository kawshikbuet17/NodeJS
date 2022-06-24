//dependencies
const url = require('url');
const {StringDecoder} = require('string_decoder');
const routes = require('../routes');
const {notFoundHandler} = require('../handlers/routeHandlers/notFoundHandler');
const {parseJSON} = require('./utilities');


//module scaffolding
const handler = {};


//handle Request Response
handler.handleReqRes = (req, res)=>{
    //request handle

    //get the url and parse it
    const parsedUrl = url.parse(req.url, true); //true for considering query string. such as ../?a=5&b=7
    //false will ignore the query string
    
    //browse this http://localhost:3000/about?a=5&b=7
    //and notice the console
    // console.log(parsedUrl);

    const path = parsedUrl.pathname;
    //console.log(path); //print pathname

    //concern: /about, about/, /about/ are same
    //so we must ignore the unwanted slash
    //to do this, we have to use regular expression
    //this regex will ignore the starting slash and ending slash
    //won't ignore then slash of middle of something
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');
    // console.log(trimmedPath);

    //to know GET method or POST method
    const method = req.method.toLowerCase();

    //to get query string
    //such as ../?a=5&b=7
    //it is got as an object
    const queryStringObject = parsedUrl.query;
    // console.log(queryStringObject);

    //headers means metadata
    //which comes with the requests
    //we can also send custom additional meta data with the request
    const headersObject = req.headers;
    console.log(headersObject);

    //combine all these
    const requestProperties = {
        parsedUrl,
        path,
        trimmedPath,
        method,
        queryStringObject,
        headersObject,
    };

    //GET request data is sent as query string
    //but in POST request data is sent with request body
    //if in frontend, a form is filled up, the form data is sent as request body
    //this is called request payload also
    //this data comes as stream and buffer
    //we have to decode it
    //to test this, provide data from postman (as body and POST request)
    const decoder = new StringDecoder('utf-8');
    let realData = '';

    //chose for which handler to call for a request
    //if path is found in routes, then go thereby
    //otherwise go to notFoundHandler
    //chosenHandler will be a function
    const chosenHandler = routes[trimmedPath] ?  routes[trimmedPath] : notFoundHandler;


    req.on('data', (buffer)=>{
        realData += decoder.write(buffer);
    });
    req.on('end', ()=>{
        realData += decoder.end();
        // console.log(realData);

        //add realData to requestProperties
        //the data is to add as body
        //realData is string
        //we have to parse it to json
        //user can provide wrong data in req
        //so we have to handle it also
        //if error, then we will get blank object
        //if correct, then we will get valid json object
        requestProperties.body = parseJSON(realData);

        //call chosenHandler
        //pass all the combined properties of request
        //receive callback from the handler. here which are statusCode and payload
        chosenHandler(requestProperties, (statusCode, payload)=>{
            //if statusCode is number, then ok
            //else set statusCode 500
            statusCode = typeof(statusCode) === 'number' ? statusCode : 500;
            
            //if payload is received as object, then ok
            //else set an empty payload
            payload = typeof(payload) === 'object' ? payload : {};

            //stringify payload
            const payloadString = JSON.stringify(payload);

            //return the final response

            //usually response payload is sent as a string, but if we want to mention the type of payload, we have to set header
            //this application.json will set the type of sending data to response is to json instead of string
            res.setHeader('Content-Type', 'application/json');
            //set statusCode in response
            res.writeHead(statusCode);
            //set payloadString in response
            res.end(payloadString);
        });
    });
}

module.exports = handler;