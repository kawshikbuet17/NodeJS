//dependencies
const http = require('http');
const url = require('url');
const {StringDecoder} = require('string_decoder');

//app object - module scaffolding
const app = {};

//configuration
app.config = {
    port: 3000
};

//create server
app.createServer = ()=>{
    const server = http.createServer(app.handleReqRes);
    server.listen(app.config.port, ()=>{
        console.log(`listening to port ${app.config.port}`);
    });
};

//handle Request Response
app.handleReqRes = (req, res)=>{
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

    //GET request data is sent as query string
    //but in POST request data is sent with request body
    //if in frontend, a form is filled up, the form data is sent as request body
    //this is called request payload also
    //this data comes as stream and buffer
    //we have to decode it
    //to test this, provide data from postman (as body and POST request)
    const decoder = new StringDecoder('utf-8');
    let realData = '';
    req.on('data', (buffer)=>{
        realData += decoder.write(buffer);
    });
    req.on('end', ()=>{
        realData += decoder.end();
        console.log(realData);

        //response handle
        res.end('Hello World');
    });
}

//start the server
app.createServer();


//use `nodemon index` to run instead of `node index`, then server need not to be run each time after editing
//use postman / browser and go to http://localhost:3000