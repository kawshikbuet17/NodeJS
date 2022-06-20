const EventEmitter = require('events');

class School extends EventEmitter{
    startPeriod(){
        console.log('Class started');

        //raise an event when bell ring
        //raise an event
        setTimeout(() => {
            //emitter.emit will now work as this.emit
            //because we have extended the EventEmitter class
            this.emit('classBell', {
                param1: 'Class 1',
                param2: 'Class 2',
                param3: 'Class 3'
            });
        }, 2000);
    }
}

module.exports = School;