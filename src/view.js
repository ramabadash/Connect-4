import Event from './event';

//The class is responsible for building the board, updating the board after moves, announcing a win or a draw

class View {
  constructor() {
    //A new Event that contains a function that expects to have index and activates the model's play function
    this.playEvent = new Event(); 
  }

  //The function builds an empty panel, with 49 cells
  render() {
    const board = document.createElement('div');
    board.className = 'board';

    this.cells = Array(49).fill().map((_, i) => {
      const cell = document.createElement('div');
      cell.className = 'cell';

      //Adding eventListener by clicking "Cell" triggers the model's play function indirectly.
      cell.addEventListener('click', () => {
        this.playEvent.trigger(i);
      });

      board.appendChild(cell);

      return cell;
    });
    //Create an area for a win / draw
    this.message = document.createElement('div');
    this.message.className = 'message';
    
    document.body.appendChild(board);
    document.body.appendChild(this.message);
  }

  //Changes the background of the cell according to the information received about the player
  updateCell(data) {
    this.cells[data.move].style.backgroundColor = data.player;
  }
  //Victory announcement
  victory(winner) {
    this.message.innerHTML = `${winner} wins!`;
  }
  //Draw announcement
  draw() {
    this.message.innerHTML = "It's a draw!";
  }
}

export default View;
