import Event from './event';

//The class is responsible for building the board, updating the board after moves, announcing a win or a draw

class View {
  constructor() {
    //A new Event that contains a function that expects to have index and activates the model's play function
    this.playEvent = new Event();
    //Start new game
    this.restartEvent = new Event(); 
  }

  //The function builds an empty panel, with 49 cells
  render() {
    //header
    const header = document.createElement("h1");
    header.textContent = "Let's Play CONNECT-4";
    //score board
    const scoreBoard = document.createElement("h2");
    const currentScore = JSON.parse(localStorage.getItem("scores")); 
    scoreBoard.textContent = `Score Boad: \n Yellow: ${currentScore.yellow} \n Red: ${currentScore.red}`;
    
    const resetScoreboardBtn = document.createElement("button");
    resetScoreboardBtn.textContent = "Reset Scoreboard";
    resetScoreboardBtn.addEventListener("click", () => { 
      localStorage.setItem("scores", JSON.stringify({"yellow" : 0, "red": 0}));
      this.restartEvent.trigger();
    });
    scoreBoard.appendChild(resetScoreboardBtn);
    
    //board
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
    
    //appent all elements
    document.body.appendChild(header);
    document.body.appendChild(scoreBoard);
    document.body.appendChild(board);
    document.body.appendChild(this.message);
  }

  //Changes the background of the cell according to the information received about the player
  updateCell(data) {
    this.cells[data.move].style.backgroundColor = data.player;
  }
  //Victory announcement
  victory(winner) {
    this.message.textContent = `${winner} wins!`;
    this.restart(); //append restart button
  }
  //Draw announcement
  draw() {
    this.message.textContent = "It's a draw!";
    this.restart(); //append restart button
  }
  //Restart the data and start new gmae
  restart() {
    const btn = document.createElement('button');
    btn.textContent = 'Play Again';
    btn.addEventListener('click', () => {
      this.restartEvent.trigger();
    });
    this.message.appendChild(btn);
  }
}

export default View;
