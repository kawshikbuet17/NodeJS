//this is a class
const EventEmitter = require('events');

const emitter = new EventEmitter();

//register a listener for bellRing event
emitter.on('bellRing', function(){
    console.log('bellRing listener. this is listener 1');
});

//more than one listener can be registerred
emitter.on('bellRing', ()=>{
    console.log('bellRing listener. this is listener 2');
});

//raise an event
emitter.emit('bellRing');

//raise event can be done also using a timer
// setTimeout(() => {
//     emitter.emit('bellRing');
// }, 2000);

//Note: sequence is : 1. register listener 2. raise an event



//event with parameters
const emitter2 = new EventEmitter();

emitter2.on('bellRing2', (param)=>{
    console.log(`bellRing2 listener. param here is ${param}`)
});

setTimeout(() => {
    emitter2.emit('bellRing2', 'PARAMETER');
}, 2000);



//event with multiple parameters (better to pass as an object)
const emitter3 = new EventEmitter();

emitter3.on('bellRing3', ({param1, param2, param3})=>{
    console.log(`bellRing3 listener. param here is ${param1}, ${param2}, ${[param3]}`)
});

setTimeout(() => {
    emitter3.emit('bellRing3', {
        param1: 'PARAMETER 1',
        param2: 'PARAMETER 2',
        param3: 'PARAMETER 3'
    });
}, 2000);



//raise event from another file
const School = require('./school');
const school = new School();

//School class has EventEmitter, so no need to create new object
school.on('classBell', ({param1, param2, param3})=>{
    console.log(`Class Bell event Listener. Params are ${param1}, ${param2}, ${[param3]}`)
});
school.startPeriod();

//Note: Event listen and emnit must be by same object
//otherwise event won't be recognised. 
//so we should code like the School Class here