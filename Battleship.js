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

  //when the user clicks it will run a function
  $("td").on("click",function(){

    var elementId;

    // charAt...

    // parseInt...

    // board[row][column] === SHIP

    if (there was a ship at location) {
      //whenever a td is clicked, add the color in the class
      $(this).addClass("hitColor");
      // TODO increse numberOfShipSunk
    } else {
      $(this).addClass("missColor");
    }
    // calls the function to decrease torpedo total
    fireTorpedo($(this).attr("id"));
    //this prints out the amount of Torpedos that the user has
    $("#torpedoCounter").text("Torpedo Counter: " + torpedosLeft);
    //turns the fireTorpedo (a shot)
    $(this).off("click");

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

// defining how many ships are sunk
var numberOfShipSunk = 0;

// Value for empty location
var EMPTY = 0;

// Value for ship at location
var SHIP = 1;

// Value for sunk ship at location
var SUNK_SHIP = -1;

//purpose: randomly place 5 ships
//signature: takes nothing and gives back an index
//example: placeShip() -> board index[x,y]
// function placeShip()
function placeShip(){
  for (var shipIndex=0; shipIndex<5; shipIndex++) {
    var row = Math.floor(Math.random() * 10);
    var column = Math.floor(Math.random() * 10);
    board[row][column] = SHIP;
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
