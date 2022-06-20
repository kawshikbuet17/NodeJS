//fs module
const fs = require('fs');

//file write
fs.writeFileSync('./02-Server-and-Core-Modules/fs-module/myfile.txt', 'Hello Programmers 1');
fs.writeFileSync('./02-Server-and-Core-Modules/fs-module/myfile.txt', 'Hello Programmers 2');
fs.appendFileSync('./02-Server-and-Core-Modules/fs-module/myfile.txt', 'Hello Programmers 3');

//file read
const data = fs.readFileSync('02-Server-and-Core-Modules/fs-module/myfile.txt');
console.log(data.toString());

//Note: here readFileSync, writeFileSync why?
//using sync will block the other threads while IO operation
//if not using sync, it will work async way. won't block the other threads
//recommended: to use async

//to use async read write
//this won't block the other threads
fs.readFile('02-Server-and-Core-Modules/fs-module/myfile.txt', (err, data)=>{
    //this is a callback function
    //this works when the operation is complete
    //here only one of err/data will be null
    //if err, then data is null
    //if data, then err is null
    console.log(data.toString());
});
console.log("This will print earlier than the previous data.toString()")