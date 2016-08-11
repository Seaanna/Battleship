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
    // if there are any torpedos left
    if (torpedosLeft >= 0) {
      // create variable to call on the id that is a string --->("44")
      var clicked = $(this).attr("id");
      // split the id of one string into two seperate arrau elements ---> 4,4
      clicked.split("");
      // the array elements will appear
      console.log(clicked);
      // if the first index and the second index of the board is of the same value of board [row] [column] is -1
      if (board[clicked[0]][clicked[1]] === -1){
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

//purpose: randomly place 5 ships
//signature: takes nothing and gives back an index
//example: placeShip() -> board index[x,y]
// function placeShip()
function placeShip(){
  while(SHIP < 5){
    var row = Math.floor(Math.random() * 10);
    var column = Math.floor(Math.random() * 10);
    SHIP = SHIP + 1;
    board[row][column] = -1;
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
