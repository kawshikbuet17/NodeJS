console.log("Hello World")

//browser has a thing named window
//node has kind of simillar thing named global
console.log(global);

///this is a builtin function of "Global"
setTimeout(() => {
    console.log("Printing this after 2000ms");
}, 2000);


//this will output undefined
//var won't be attach in global
//but in browser console, var is attached with windows
//and can be accessed as window.<var_name> or simply by <var_name>
var a = 5;
console.log(global.a);


console.log(__dirname);
console.log(__filename);


//import something from another file
//that file must export
const people = require('./people');
console.log(people);
console.log(people.people);
console.log(people.a);
people.test()


//using lodash package to work with imported things
const people2 = require('./people2');
const _ = require('lodash');
console.log(_.last(people2)); //get last value of an array, last is a lodash function
