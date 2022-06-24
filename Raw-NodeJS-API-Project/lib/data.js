//dependencies
const fs = require('fs');
const path = require('path');
const lib = {};

//base dir of the data folder
lib.basedir = path.join(__dirname, '../.data/');

//write data to file
lib.create = function(dir, file, data, callback){
    fs.open(lib.basedir+dir+'/'+file+'.json', 'wx', (err, fileDescriptor)=>{
        if(!err && fileDescriptor){
            //convert data to string
            const stringData = JSON.stringify(data);

            //write data to file
            fs.writeFile(fileDescriptor, stringData, (err2)=>{
                if(!err2){
                    fs.close(fileDescriptor, (err3)=>{
                        if(!err3){
                            callback(false);
                        }else{
                            callback('Error closing the new file');
                        }
                    });
                }else{
                    callback('Error writing to new file');
                }
            });
        }else{
            callback('Could not create new file. It may already exists');
        }
    });
};


//read data from file
lib.read = (dir, file, callback)=>{
    fs.readFile(lib.basedir+dir+'/'+file+'.json', 'utf8', (err, data)=>{
        callback(err, data);
    });
}

module.exports = lib;