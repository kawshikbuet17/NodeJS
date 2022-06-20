const fs = require('fs');

// const ourReadStream = fs.createReadStream(`${__dirname}/bigdata.txt`, 'utf8');
// ourReadStream.on('data', (chunk)=>{
//     console.log(chunk);
// });

const ourReadStream = fs.createReadStream(`${__dirname}/bigdata.txt`);

//readstream listen for printing data
ourReadStream.on('data', (chunk)=>{
    console.log(chunk.toString());
});


const ourWriteStream = fs.createWriteStream(`${__dirname}/output.txt`);

//readstream listen for writing data
ourReadStream.on('data', (chunk)=>{
    ourWriteStream.write(chunk);
});



//write using pipe to do the same thing easier, it will handle the chunks automatically
ourReadStream.pipe(ourWriteStream);