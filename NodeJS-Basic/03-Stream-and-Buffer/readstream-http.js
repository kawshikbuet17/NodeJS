const http = require('http');

const server = http.createServer((req, res)=>{
    if(req.url === '/'){
        //generate a input box to take input
        //we can provide input after running this code
        //and then browsing localhost:3000
        res.write('<html><head><title>Form</title></head>');
        res.write(`<body>
                    <form method="post" action="/process">
                    <input name="message">
                    </input>
                    </form>
                    </body>`)
        res.end();
    }
    else if(req.url === '/process' && req.method === 'POST'){ 
        //post method because data which is being input, coming by post method

        // console.log(req.data);
        //interestingly req.data doesn't contain data which comes by post method
        //so this will output undefined
        //we could get the data by this if data would come whole at once
        //but data will come by streaming method


        const body = [];

        //to get data, we have to listen data as events
        req.on('data', (chunk)=>{
            // console.log(chunk.toString());
            //this will print encoded version of data which is received chunk by chunk

            //push chunk to body array
            body.push(chunk);
        });

        //we have to listen end of data
        //to know that the stream has been ended
        req.on('end', ()=>{
            console.log('stream finished');

            //print data after the stream finished
            //Buffer is a nodejs default object
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
            //this will print the encoded version of data
        })
        
        res.write('Thank you for submitting');
        res.end();
    }
    else{
        res.write('Not Found');
        res.end();
    }
});

server.listen(3000);
console.log('listening on port 3000');


//run this file
//browse localhost:3000
//input something in the inputbox
//press enter
//look at the node console