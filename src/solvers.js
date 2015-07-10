/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

// [ [1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1] ]


// helper that makes new matrix
window.makeBoard = function(n){
  // create a new board
  var board = Array(n);
  // populate board with board with arrays containing 0's
  for (var i=0; i<n; i++){
    // loop 1 creates arrays at each index
    board[i] = [];
    for (var j=0; j<n; j++){
      // loop 2 fills each array with n 0's
      board[i][j] = 0;
    }
  }
  return board;
}

// helper that creates a copy of the current board for safekeeping
window.copy = function(board){
  // make a new board
  var newBoard = [];
  // loop through each row
  for (var i=0; i<board.length; i++) {
    // splice each row and add to new board
    newBoard.push( board[i].slice() );
  }
  // return new board
  return newBoard;
}

// helper that checks for all lower rows for future conflicts and blocks those spots off
window.preConflictRes = function(board, currentRowIndex, currentColumnIndex) {
  // loop through rows starting at one, i less than board.length - currentRowIndex, incremeting by 1
  for (var i=1; i<(board.length - currentRowIndex); i++){
    // set board[currentRowIndex + i][currentColumnIndex] to 2
    board[currentRowIndex + i][currentColumnIndex] = 2;
    // if currentColumnIndex + i is < board.length
    if ( (currentColumnIndex + i) < board.length ){
      // set board[currentRowIndex + i][currentColumnIndex + i] to 2
      board[currentRowIndex + i][currentColumnIndex + i] = 2;
    }
    // if currentColumnIndex - i >= 0
    if ( (currentColumnIndex - i) >= 0 ){
      // set board[currentRowIndex + i][currentColumnIndex - i] to 2
      board[currentRowIndex + i][currentColumnIndex - i] = 2;
    }
  }
}

window.findNRooksSolution = function(n) {
  var solution = []; //fixme
  var temp = [];

  for(var i = 0; i < n; i++){
    temp.push(0);
  }

  for(var i = 0; i < n; i++){
    solution.push(temp.slice());
  }

  // var counter set to 0
  var counter = 0;

  // recursive helper - no args
  var recursiveHelp = function(){
    //  piece in chess board at counter/counter
    solution[counter][counter] = 1;
    // if chess board has more than 1 row 
    if(counter < n - 1){
      counter++;
      // recursive call to helper 
      recursiveHelp();
    }
  }

  recursiveHelp();


  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  return n === 1 ? 1 : n * window.countNRooksSolutions(n - 1);
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {

  if (n === 2){
    return [[],[]];
  } else if (n === 3){
    return [[],[],[]];
  }

  // define variable to track if a solution has been found
  var found = false;

  var board = makeBoard(n);
  // make helper function that copies a board to another board

  // make helper function for predictive conflict resolution that accepts 3 arguments: board, currentRowIndex, currentColumnIndex

  // make recursive helper that accepts a board and a currentRowIndex
  var recursiveSearch = function(currentBoard, currentRowIndex){
    // if currentRowIndex is length of board
    if (currentRowIndex === n){
      // overwrite main board object with current solution
      board = currentBoard;
      // set found variable on 75 to true
      found = true;
      // return statement to pass up execution
      return;
    }
    // iterate over currentRow of board
    for (var i=0; i<currentBoard[currentRowIndex].length; i++){
      // make a copy by calling helper function
      var copyBoard = copy(currentBoard);
      // if value in i in currentRowIndex of board is 0
      if ( currentBoard[currentRowIndex][i] === 0 ){
        // replace with a 1
        currentBoard[currentRowIndex][i] = 1;
        // run out predictive conflict resolution helper function
        preConflictRes(currentBoard, currentRowIndex, i);
        // call recursive helper by passing in board and currentRowIndex + 1
        recursiveSearch(currentBoard, currentRowIndex + 1);
        // if found is set to true
        if (found){
          // break
          break;
        }
        // overwrite argument board with copy from line 133
        currentBoard = copyBoard;
      }
    }
    return;
  }

  // call recursive function with first row
  recursiveSearch(board, 0);

  // loop through rows in main board
  for (var i=0; i<board.length; i++){
    for (var j=0; j<board[i].length; j++){
      // if value at current index is a 2
      if (board[i][j] === 2){
        // replace with a 0
        board[i][j] = 0;
      }
    }
  }

  return board;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;

  // create a new board
  var board = makeBoard(n);

  // make recursive helper that accepts a board and a currentRowIndex
  var recursiveSearch = function(currentBoard, currentRowIndex){
    // if currentRowIndex is length of board
    if (currentRowIndex === n){
      // increment solution
      solutionCount++;
      // return statement to pass up execution
      return;
    }
    // iterate over currentRow of board
    for (var i=0; i<currentBoard[currentRowIndex].length; i++){
      // make a copy by calling helper function
      var copyBoard = copy(currentBoard);
      // if value in i in currentRowIndex of board is 0
      if ( currentBoard[currentRowIndex][i] === 0 ){
        // replace with a 1
        currentBoard[currentRowIndex][i] = 1;
        // run out predictive conflict resolution helper function
        preConflictRes(currentBoard, currentRowIndex, i);
        // call recursive helper by passing in board and currentRowIndex + 1
        recursiveSearch(currentBoard, currentRowIndex + 1);
        // overwrite argument board with copy from line 133
        currentBoard = copyBoard;
      }
    }
    return;
  }

  // call recursive function with first row
  recursiveSearch(board, 0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
