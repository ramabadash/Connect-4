import Connect4 from './model';
import View from './view';

// The class is responsible for linking the view to the model. He is assisted for this in a class event.
//Adds to each "event" in view or in model a function on which the "trigger" is made.

class Controller {
  constructor() {
    this.model = new Connect4();
    this.view = new View();

    this.view.playEvent.addListener(move => { this.model.play(move); }); //Making a move
    this.view.restartEvent.addListener(() => { //restart the game
      document.querySelector('.board').remove();
      document.querySelector('.message').remove();
      document.querySelector('h1').remove();
      document.querySelector('h2').remove();

      const app = new Controller();
      app.run();
    });

    this.model.updateCellEvent.addListener(data => { this.view.updateCell(data); }); //Update the move in the interface
    this.model.victoryEvent.addListener(winner => { this.view.victory(winner); }); //A victory was achieved
    this.model.drawEvent.addListener(() => { this.view.draw(); }); //A draw was reached
  }
  //build the board
  run() {
    this.view.render();
  }
}

export default Controller;
