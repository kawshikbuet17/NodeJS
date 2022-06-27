//dependencies
const http = require('http');
const {handleReqRes} = require('./helpers/handleReqRes');
const environment = require('./helpers/environments');
const data = require('./lib/data');
const { sendTwilioSms } = require('./helpers/notifications');

//app object - module scaffolding
const app = {};

//testing file system
//manually create .data/test folder
//our code can create file, not folder till now
// data.create('test', 'newFile', {'name':'KKP', 'dept':'BUET CSE'}, (err)=>{
//     console.log('error is', err);
// });

//testing file read
//reading from previously created file .data/test/newFile
// data.read('test', 'newFile', (err, data)=>{
//     console.log('error = ', err);
//     console.log('data = ', data);
// });


//testing file update
//update a file which is previously written
// data.update('test', 'newFile', {'name':'kawshikbuet17', 'studentid':'1705043'}, (err)=>{
//     console.log(err);
// });


//testing file delete
// data.delete('test', 'newFile', (err)=>{
//     console.log('error = ', err);
// });


//testing twilio
//provide here real phone number
//last 3 digit is hidden by me for privacy concern
sendTwilioSms('01516763KKP', 'Hello World, Twilio API working successfully. This is message from KKP', (err)=>{
    console.log('this is twilio error', err);
});

//create server
app.createServer = ()=>{
    const server = http.createServer(app.handleReqRes);
    server.listen(environment.port, ()=>{
        console.log(`listening to port ${environment.port}`);
    });
};

//handle Request Response
app.handleReqRes = handleReqRes;

//start the server
app.createServer();


//use postman / browser and go to http://localhost:<Environment Variable Selected Port>
//to run use `npm run staging` or `npm run production`
//to be more specific run `SET NODE_ENV=staging&nodemon index`