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
  revealShips()
  //when the user clicks it will run a function
  $("td").on("click",function(){
    // if there are any torpedos left
    if (torpedosLeft >= 0) {
      // create variable to call on the id that is a string --->("44")
      var clicked = $(this).attr("id");
      // split the id of one string into two seperate arrau elements ---> 4,4
      clicked.split("");
      // the array elements will appear
      console.log(clicked);
      // if the first index and the second index of the board is of the same value of board [row] [column] is -1
      if (board[clicked[0]][clicked[1]] === showShips){
        //create a color when user misses
        $(("#" + clicked[0] + clicked[1])).addClass("hitColor");
        counterOfHits ++;
        console.log($("#" + clicked[0] + clicked[1]));
      } else {
        $(this).addClass("missColor");
      }
      if (counterOfHits===5) {
        $("#result").text("You win; you da man");
      }
      if(counterOfHits < 5 && torpedosLeft === 0){
        $("#result").text("You are not the man, YOU LOSE");
        revealShips();
      }

      //this prints out the amount of Torpedos that the user has
      $("#torpedoCounter").text("Torpedo Counter: " + torpedosLeft);
      $("#hitCounter").text("Hits: " + counterOfHits);
        //turns the fireTorpedo off (a shot)
      $(this).off("click");
    // calls the function to decrease torpedo total
    fireTorpedo($(this).attr("id"));



}
  });

}); // end document ready

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
var SHIP = 0;
var row;
var column;
var counterOfHits = 0;
var answers = [];
// variable to show value of a ship to equal -1 on our board
var showShips = -1;

//purpose: randomly place 5 ships
//signature: takes nothing and gives back an index
//example: placeShip() -> board index[x,y]
// function placeShip()
function placeShip(){
  {
    while(SHIP < 5){
    var row = Math.floor(Math.random() * 10);
    var column = Math.floor(Math.random() * 10);
    //if the rows & columns are the same as a prior ship or they are 1 row or column next to, then this will return false, and place ship needs to get a different row & column until it's true
    if (checkCanPlaceShipVertical(row, column) ===false || checkCanPlaceShipHorizontal(row, column)===false){
      continue;
    }
    SHIP = SHIP + 1;
    board[row][column] = showShips;
    }
  }
}




// declare the amount of total torpedos left
var torpedosLeft = 25;
//purpose: make torpedos decrease on clicks
//signature: put in p and gives a number
//example: fireTorpedo(x,y) ->
// function fireTorpedo (x,y)
function fireTorpedo (){
  torpedosLeft -= 1;
}

// Purpose: to find the location/coordinates of the placed ships and add a class to the td
 // Signature: nothing --> string
 // Example: revealShips() --> $('#' + x + y).addClass("hereTheyAre")
 function revealShips() {
  // each row up to 10
   for (var row = 0; row < 10; row ++) {
    //  each column up to 10
     for (var col = 0; col < 10; col ++) {
      //  if view of board equals showShips (both will be -1)
       if (board[row][col] === showShips) {
        //the id will add a class of reveal to change the color of the ships to show them where they were
        $("#" + row + col).addClass("reveal");
        }
      }
    }
  }


  // Purpose: checks board column for a ship and eliminates the space around it
   // Signature: (number, number)--> boolean
   // Example: checkCanPlaceShipVertical(1,2) -> false if ship is at position (1,2) which means
   // board[1][1], board[1][2], board[1][3] will also return false
  function checkCanPlaceShipVertical(row, col) {
    if (row === 9){
      return board[row-1][col] != showShips;
    } else if (row === 0) {
      return board[row+1][col] != showShips;
    }
    else {
      // where we are not at the boundary of the board
      return (board[row-1][col] != showShips) &&
             (board[row][col] != showShips) &&
             (board[row+1][col] != showShips);
    }
  }

  // Purpose: checks board row for a ship and eliminates the space around it
   // Signature: (number, number)--> boolean
   // Example: checkCanPlaceShipHorizontal(5,1) -> false if ship is at position (5,1) which means
   // board[5][1], board[5][2], board[5][3] will also return false
  function checkCanPlaceShipHorizontal(row, col) {
    if (col === 9){
      return board[row][col-1] != showShips;
    } else if (col === 0) {
      return board[row][col+1] != showShips;
    }
    else {
      // where we are not at the boundary of the board
      return (board[row][col-1] != showShips) &&
             (board[row][col] != showShips) &&
             (board[row][col+1] != showShips);
    }
  }
