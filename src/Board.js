// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
    
      //get row from board (this)
      var board = this.rows();
      var currentRow = board[rowIndex];
      //define variable counter and set to false 
      var bound = false;
      //loop through each index in row
      for(var i = 0; i < currentRow.length; i++){
        //check what value is in index
        //if index is 1 and counter is true
        if(currentRow[i] === 1){
          if(bound){
            return true;
          //return true
          } else {
          //set bound to true
            bound = true;
          }//else
        }//if
      }//for 
      return false; // fixme
    
    },
    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      // grab table
      var board = this.rows();
      // iterate through all the rows
      for (var i=0; i<board.length; i++){
        // call previous function on each value
        // if true
        if ( this.hasRowConflictAt(i) ){
          // return true
          return true;
        }
      }
      return false; // fixme
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      // call board
      var board = this.rows();
      // declare variable found, set to false
      var found = false;
      // iterate through board, one row at a time
      for (var i=0; i<board.length; i++){
        // check colIndex in row if it's one
        if (board[i][colIndex]){
          // if found is true
          if (found){
            // return true
            return true;
          } else {
          // else
            // set found to true
            found = true;
          }
        }
      }
      return false; // fixme
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      //declare variable, store boardj
      var board = this.rows();
      // if board has no rows
      if (!board.length){
        // reurn false
        return false;
      }
      //loop through all index in first row
      for(var i = 0; i < board[0].length; i++){
        //if statement - hasColConflictAt index in loop
        if(this.hasColConflictAt(i)){
          //return true if true
          return true;
        }
      }
      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    // colIndex = majorDiagonalColumnIndexAtFirstRow
    hasMajorDiagonalConflictAt: function(colIndex) {
      // pull out the board
      var board = this.rows();
      // variable called found set to false
      var found = false;
      // loop through rows, set i to 0, max should be less than board.length - colIndex, incrementing
      for (var i=0; i<board.length - colIndex; i++){
        // check board[i][colIndex + i] is 1
        if (board[i][colIndex + i]){
          // if found is true
          if (found){
            // return true
            return true;
          // else 
          } else {
            // set found to true 
            found = true;
          }
        }
      }
      return false; // fixme
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      // pull out ye olde board
      var board = this.rows();
      // loop through rows
      for (var i=0; i<board.length; i++){
        // for each square, check if hasMajorDiagonalConflictAt
        if ( this.hasMajorDiagonalConflictAt(i) ){
          // return true
          return true;
        }
      }
      return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    // colIndex = minorDiagonalColumnIndexAtFirstRow
    hasMinorDiagonalConflictAt: function(colIndex) {
      var board = this.rows();
      // variable called found set to false
      var found = false;
      // loop through rows, set i to 0, max should be less than board.length - colIndex, incrementing
      for (var i = 0; i <= colIndex; i++){
        // check board[i][colIndex + i] is 1
        if (board[i][colIndex - i]){
          // if found is true
          if (found){
            // return true
            return true;
          // else 
          } else {
            // set found to true 
            found = true;
          }
        }
      }
      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      // pull out ye olde board
      var board = this.rows();
      // loop through rows
      for (var i=0; i<board.length; i++){
        // for each square, check if hasMajorDiagonalConflictAt
        if ( this.hasMinorDiagonalConflictAt(i) ){
          // return true
          return true;
        }
      }
      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
