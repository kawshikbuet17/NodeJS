var people = ['kawshik', 'kumar', 'paul'];
var a = 6;

function test(){
    console.log("test");
}

//see module output before export
// console.log(module);

//export something from this file
module.exports = people;

//see module output after export
// console.log(module);

//export multiple things
module.exports = {
    people: people,
    a: a,
    test: test
};

//see module output after export multiple things
// console.log(module);