const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res)=>{
    const myReadStream = fs.createReadStream(__dirname+'/bigdata.txt', 'utf8');
    myReadStream.pipe(res);
    //client will get the data of bigdata.txt as response
    //run this code
    //browse localhost:3000
    //you will understand
    //so the server read the file, then send the data to the client as response chunk by chunk
    //client received data as a stream
    //not whole file data at once
});
server.listen(3000);
console.log('listening on port 3000');