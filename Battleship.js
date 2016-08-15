// declare a variable for the location of the td
var board = [[0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0]];

// Value for ship at location

var numberOfShips = 0;
// declare the amount of total torpedos left
var torpedosLeft = 24;
var row;
var column;
var counterOfHits = 0;
// var answers = [];
// variable to show value of a ship to equal -1 on our board
var ship = -1;

 //make the document ready with jQuery
$(document).ready(function() {

  //purpose: create a table that 10 Tr's and 10 Td's
  //signature: takes nothing and appends a TR with 10 TD's
  //example: createTable() ->
  function createTable() {
    //for each row up to 10
    for (var row=0; row<10; row++) {
      //call the table and append Tr's
      $("#theTable").append("<tr></tr>");
      //for each column up to 10
      for (var column=0; column<10; column++) {
        //grab the last tr and append a td
        $("tr").last().append("<td id = " + row + column + "></td>");

      }

    }
  };
  createTable();
  placeShip();
  // revealShips();
  //when the user clicks it will run a function
  $("td").on("click",function(){
    // if there are any torpedos left
    if (torpedosLeft >= 0) {
      // create variable to call on the id that is a string --->(for example: "44")
      var clicked = $(this).attr("id");
      // split the id of one string into two seperate array elements ---> same example: 4,4
      clicked.split("");
      // the array elements will appear
      console.log(clicked);
      // if the first index and the second index of the board is of the same value of board [row] [column] is -1
      if (board[clicked[0]][clicked[1]] === ship){
        //create a color when user misses (red)
        $(("#" + clicked[0] + clicked[1])).addClass("hitColor");
        //increase the counter of hits by 1
        counterOfHits ++;
        // print out box id
        console.log($("#" + clicked[0] + clicked[1]));
        // or else, add the miss Color (grey)
      } else {
        $(this).addClass("missColor");
      }
      //when the amount of hits is 5, text will appear that the user wins
      if (counterOfHits===5) {
        $("#result").text("You win; you da man");
      }
      //if the amount of hits is less than 5 and their are no more torpedos, text will appear that the user loses
      if(counterOfHits < 5 && torpedosLeft === 0){
        $("#result").text("You are not the man, YOU LOSE");
        //show user where the ships are
        revealShips();
      }

      //this prints out the amount of Torpedos that the user has
      $("#torpedoCounter").text(torpedosLeft);
      //text will appear to show user how many hits they have
      $("#hitCounter").text("Hits: " + counterOfHits);
        //turns the fireTorpedo off (a shot)
      $(this).off("click");
    // calls the function to decrease torpedo total
    fireTorpedo($(this).attr("id"));



}
  });

}); // end document ready



//purpose: randomly place 5 ships
//signature: takes nothing and gives back an index
//example: placeShip() -> board index[x,y]

function placeShip(){
  while(numberOfShips < 2){
    var row = Math.floor(Math.random() * 10);
    var column = Math.floor(Math.random() * 10);
    if(numberOfShips == 0){
      placeShipVertical(row, column);
    } else {
      placeShipHorizontal(row, column);
    }
  }
}


function placeShipVertical(row, column){
    if (canPlaceShipVertical(row, column) === true && canPlaceShipHorizontal(row, column) === true && canPlaceShipVertical(row+1, column) === true && canPlaceShipHorizontal(row+1, column) === true && canPlaceShipVertical(row+2, column) === true && canPlaceShipHorizontal(row+2, column) === true && canPlaceShipVertical(row+3, column) === true && canPlaceShipHorizontal(row+3, column) === true && canPlaceShipVertical(row+4, column) === true && canPlaceShipHorizontal(row+4, column)){
      //adding one to the numberOfShips count
      numberOfShips += 1;
      //put in the values for rows & columns into the board, and make it equal to ship
      board[row][column] = ship;
      board[row+1][column] = ship;
      board[row+2][column] = ship;
      board[row+3][column] = ship;
      board[row+4][column] = ship;
    }
}
//
//
// // purpose:
// // signature:
// // example:
function placeShipHorizontal(row,  column){
  if (canPlaceShipVertical(row, column) === true && canPlaceShipHorizontal(row, column) === true && canPlaceShipVertical(row, column+1) === true && canPlaceShipHorizontal(row, column+1) === true && canPlaceShipVertical(row, column+2) === true && canPlaceShipHorizontal(row, column+2) === true && canPlaceShipVertical(row, column+3) === true && canPlaceShipHorizontal(row, column+3) === true && canPlaceShipVertical(row, column+4) === true && canPlaceShipHorizontal(row, column+4)){
    //adding one to the numberOfShips count
    numberOfShips += 1;
    //put in the values for rows & columns into the board, and make it equal to ship
    board[row][column] = ship;
    board[row][column+1] = ship;
    board[row][column+2] = ship;
    board[row][column+3] = ship;
    board[row][column+4] = ship;
  }
  // End Drew's test code
}






//purpose: make torpedos decrease on clicks
//signature: put in a number and gives a number
//example: fireTorpedo(25) -> 24
// function fireTorpedo ()
function fireTorpedo (){
  torpedosLeft -= 1;
}

// Purpose: to find the location/coordinates of the placed ships and add a class to the td
 // Signature: nothing --> string
 // Example: revealShips() --> $('#' + row + col).addClass("reveal")
 function revealShips() {
  // each row up to 10
   for (var row = 0; row < 10; row ++) {
    //  each column up to 10
     for (var col = 0; col < 10; col ++) {
      //  if view of board equals ship (both will be -1)
       if (board[row][col] === ship) {
        //the id will add a class of reveal to change the color of the ships to show them where they were
        $("#" + row + col).addClass("reveal");
        }
      }
    }
  }


  // Purpose: checks board column for a ship and eliminates the space around it
   // Signature: (number, number)--> boolean
   // Example: canPlaceShipVertical(1,2) -> false if ship is at position (1,2) which means
   // board[1][1], board[1][2], board[1][3] will also return false
  function canPlaceShipVertical(row, col) {
    //if row is 9
    if (row === 9){
      //return boolean to check if the spot one row to the left of where the ship was placed is not equal to ship
      return board[row-1][col] != ship &&
             board[row][col] != ship &&
             col < 9;
      //if row is 0
    } else if (row === 0) {
        //return boolean to check if the spot one row to the right of where the ship was placed is not equal to ship
      return board[row+1][col] != ship &&
             board[row][col] != ship &&
             col < 9;
    }
    // where we are not at the boundary of the board
    else {
      //return boolean to check if the spot one row to the right, one spot to the left, and the spot of where the ship was placed is not equal to ship
      return (board[row-1][col] != ship) &&
             (board[row][col] != ship) &&
             (board[row+1][col] != ship) &&
             col < 9;
    }
  }

  // Purpose: checks board row for a ship and eliminates the space around it
   // Signature: (number, number)--> boolean
   // Example: canPlaceShipHorizontal(5,1) -> false if ship is at position (5,1) which means
   // board[5][1], board[5][2], board[5][3] will also return false
  function canPlaceShipHorizontal(row, col) {
    //if column is 9
    if (col === 9){
        //return boolean to check if the spot one column to the bottom of where the ship was placed is not equal to ship
      return board[row][col-1] != ship &&
             board[row][col] != ship &&
             col < 9;
    } else if (col === 0) {
        //return boolean to check if the spot one column above of where the ship was placed is not equal to ship
      return board[row][col+1] != ship &&
             board[row][col] != ship &&
             col < 9;
    }
    // where we are not at the boundary of the board
    else {
      //return boolean to check if the spot one column above, one spot below, and the spot of where the ship was placed is not equal to ship
      return (board[row][col-1] != ship) &&
             (board[row][col] != ship) &&
             (board[row][col+1] != ship) &&
             col < 9;
    }
  }
