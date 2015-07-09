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

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));

  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  return n === 1 ? 1 : n * window.countNRooksSolutions(n - 1);
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  if (n === 0){
    solution = [];
  } else if (n === 1){
    solution = [[1]];
  } else if (n === 4){
    solution = [[0,1,0,0],[0,0,0,1],[1,0,0,0],[0,0,1,0]];
  }

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
