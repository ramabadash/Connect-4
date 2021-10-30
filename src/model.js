import Event from './event';

//The class is responsible for making moves, checking wins and draws and replacing players

class Connect4 {
  constructor() {
    this.board = Array(49).fill(); //7*7 board
    this.currentPlayer = 'yellow'; //yellow start
    this.finished = false; // game is not finished
    this.scores = localStorage.getItem('scores'); //Local storage for scores history

    //A new Event that contains a function that receives information (object) with a player and an indexת
    //and activates the updateCell function of the view.
    this.updateCellEvent = new Event(); 
    //A new event that contains a function that receives a player and activates the victory function of the view.
    this.victoryEvent = new Event(); 
    //A new event that contains a function without arguments and activates the draw function of the view.
    this.drawEvent = new Event(); 
  }

  // Player makes a move - clicking the board
  play(move) {
    //Is it possible to make a move.
    // game not finished && An existing index was clicked && The index is empty
    if (this.finished || move < 0 || move > 48 || this.board[move]) return false; 

    //Positions the player in the lowest available position in the column he clicked on.
    while(!this.board[move] && move < 42 && !this.board[move+7]){
      if(!this.board[move+7]) move+=7;
    }
    
    this.board[move] = this.currentPlayer; //Updating the array
    this.updateCellEvent.trigger({ move: move, player: this.currentPlayer }); //Updates the view via the controller

    this.finished = this.victory() || this.draw(); //Checks whether there is a win or a draw following the move.

    if (!this.finished) { this.switchPlayer(); } //If the game is not over, switch player.

    return true;
  }

  //Check if a player has won
  victory() {
    //All the positions that lead to victory
    const lines = [
      [0, 1, 2, 3], [41, 40, 39, 38],[7, 8, 9, 10], [34, 33, 32, 31], [14, 15, 16, 17], [27, 26, 25, 24], 
      [21, 22, 23, 24], [20, 19, 18, 17], [28, 29, 30, 31], [13, 12, 11, 10], [35, 36, 37, 38], [6, 5, 4, 3], 
      [0, 7, 14, 21], [41, 34, 27, 20], [1, 8, 15, 22], [40, 33, 26, 19], [2, 9, 16, 23], [39, 32, 25, 18], 
      [3, 10, 17, 24], [38, 31, 24, 17], [4, 11, 18, 25], [37, 30, 23, 16], [5, 12, 19, 26], [36, 29, 22, 15], 
      [6, 13, 20, 27], [35, 28, 21, 14], [0, 8, 16, 24], [41, 33, 25, 17], [7, 15, 23, 31], [34, 26, 18, 10], 
      [14, 22, 30, 38], [27, 19, 11, 3], [35, 29, 23, 17], [6, 12, 18, 24], [28, 22, 16, 10], [13, 19, 25, 31], 
      [21, 15, 9, 3], [20, 26, 32, 38], [36, 30, 24, 18], [5, 11, 17, 23], [37, 31, 25, 19], [4, 10, 16, 22], 
      [2, 10, 18, 26], [39, 31, 23, 15], [1, 9, 17, 25], [40, 32, 24, 16], [9, 7, 25, 33], [8, 16, 24, 32], 
      [11, 7, 23, 29], [12, 18, 24, 30], [1, 2, 3, 4], [5, 4, 3, 2], [8, 9, 10, 11], [12, 11, 10, 9],
      [15, 16, 17, 18], [19, 18, 17, 16], [22, 23, 24, 25], [26, 25, 24, 23], [29, 30, 31, 32], [33, 32, 31, 30], 
      [36, 37, 38, 39], [40, 39, 38, 37], [7, 14, 21, 28], [8, 15, 22, 29], [9, 16, 23, 30], [10, 17, 24, 31], 
      [11, 18, 25, 32], [12, 19, 26, 33], [13, 20, 27, 34], [42, 35, 28, 21], [43, 36, 29, 22], [44, 37, 30, 23],
      [45, 38, 31, 24], [46, 39, 32, 25], [47, 40, 33, 26],[48, 41, 34, 27], [48, 47, 46, 45], [47, 46, 45, 44],
      [46, 45, 44, 43], [45, 44, 43, 42], [42, 36, 30, 24], [43, 37, 31, 25], [44, 38, 32, 26], [45, 39, 33, 27], 
      [48, 40, 32, 24], [47, 39, 31, 23], [46, 38, 30, 22], [45, 37, 29, 21] 
      ];

    //Check if there are 4 identical squares in the positions in the board according to the positions of the array.
    const victory = lines.some(l => this.board[l[0]]
      && this.board[l[0]] === this.board[l[1]]
      && this.board[l[1]] === this.board[l[2]]
      && this.board[l[2]] === this.board[l[3]]);
    //Announce the winner useing View class
    if (victory) {
      this.victoryEvent.trigger(this.currentPlayer);
      this.updateScores();
    }
    return victory;
  }

  //A case of a draw
  draw() {
    const draw = this.board.every(i => i); //If the whole board is full
    //Announce a draw useing View class
    if (draw) {
      this.drawEvent.trigger();
    }

    return draw;
  }
  //switch players -> red or yellow
  switchPlayer() {
    this.currentPlayer = this.currentPlayer === 'yellow' ? 'red' : 'yellow';
  }
  updateScores() {
    const currentScore = JSON.parse(localStorage.getItem("scores"));
    currentScore[this.currentPlayer] += 1;
    localStorage.setItem("scores", JSON.stringify(currentScore) )
  }
}

export default Connect4;
