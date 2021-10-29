//The class is responsible for creating an "Event" that contains an array of functions 
//that can be triggered at once when the event is relevant.

class Event {
    constructor() {
      this.listeners = []; //An array of functions
    }
    //Adding a function to an array
    addListener(listener) {
      this.listeners.push(listener);
    }

    //Activates all the functions in the array "listeners" and sends to them the argument it received
    trigger(params) {
      this.listeners.forEach(listener => { listener(params); });
    }
  }
  
export default Event;
  