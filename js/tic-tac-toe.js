var counter = 0;
var max_value = 8;
var star = new Array();
star[0] = 0;
star[1] = 0;
star[2] = 0;
star[3] = 0;
star[4] = 0;
star[5] = 0;
star[6] = 0;
star[7] = 0;
star[8] = 0;

//Winner Array
var winnerArray = new Array();
winnerArray[0] = -1;
winnerArray[1] = -1;
winnerArray[2] = -1;

var player1 = 1;
var player2 = -1;
var emptyCell = 0;
var gameWinner = 0;

var player1score = 0;
var player2score = 0;
var againstComputer = 0;

var totalGames = 0;
var drawCount = 0;

$.fn.pulsate = function( number, time){
 //  for(var i = 0; i < number; i++){

 	this.fadeIn(time).delay(2000).fadeOut(time).stop();
   //	this.animate({width:120,height:120}).animate(width:"",height:"");
      // this.fadeIn(time).fadeOut(time);
      // if(i != number - 1) this.delay(time);
//   }
   return this;
}

$( '.gameCell').hover(
  function() {
    $( this ).append( $( "<span> ***</span>" ) );
  }, function() {
    $( this ).find( "span:last" ).remove();
  }
);

/*-------------------------------------------------------------------------------------------------
Game cell Display
-------------------------------------------------------------------------------------------------*/
$('.gameCell').click(function(){

console.log("inside .gameCell");

	//Get the Cell ID to find empty cells
	var name = $(this).attr('id');

	name = name.substring(4);

//	console.log(name.substring(4));

var iterstring = name;

	var containerstring = "#cell" + iterstring.toString()
	var container = $(containerstring);

	

	//container.pulsate(4,500);

// 	container.animate({
//   height: "toggle",
//   opacity: .5
// }, "slow" );

// container.animate({
//     width: [ "toggle", "swing" ],
//     height: [ "toggle", "swing" ],
//     opacity: "toggle"
//   }, 5000, "linear");

	//When the game cell is empty valid move
	if(star[name] == 0 && gameWinner == 0)
	{
		console.log(gameWinner);

		//double checking the maximum count
		if(counter <= max_value)
		{

			//when counter value is even - Player 1
			if(counter%2 == 0)
			{
				//Assign Player 1 image and mark the cell as Not empty
				$(this).css("background-image", "url(../images/Player1.jpeg)");
				star[name] = player1;

				//when 3 or more cells are occupied by a player - check for Winner
				if(counter >= 4)
				{
					findWinner(player1);
				}


				//When played against the computer - checks for empty cells and no winner - then computer makes a move
				if(againstComputer == 1 && counter <= max_value && gameWinner == 0)
				{
					//Calutates the computer move
					computerMove();
					//when 3 or more cells are occupied by a player - check for Winner
					if(counter >= 4)
					{
						findWinner(player2);
					}

					//Incrementing the cell counter for the computer player
					counter = counter + 1;
				}
					
				
			}
			//When two player are playing
			else if(againstComputer == 0)
			{

				//Assign Player 2 image and mark the cell as Not empty
				$(this).css("background-image", "url(../images/Player2.jpeg)");
				star[name] = player2;

				//when 3 or more cells are occupied by a player - check for Winner
				if(counter >= 4)
				{
					findWinner(player2);
				}
			}
			

			if(gameWinner == 1 || gameWinner == -1)
			{
				if(gameWinner == 1)
				{
					player1score = player1score + 1;
					var count = 'Player 1 -' +player1score.toString();
					$('#play1val').text(count);
				}
				else if(gameWinner == -1)
				{
					player2score = player2score + 1;
					var count = 'Player 2 -' +player2score.toString();
					$('#play2val').text(count);
				}
				console.log("inside color change grid");

				//Call animate winner cell to animate the 3 cells

				AnimateWinnerCell();

				totalGames = totalGames + 1;
				$('#totalval').text('Total Games - ' +totalGames);

				//var container = $('#' + winnerArray[0].toString());
				//$(container).css("background-color",#1DD32F);
			}

			//Incrementing the used cell counter
			counter = counter + 1;
		}
		//when maximum moves are reached
		else
		{
			//Draw - when no winner and no empty cells
			drawCount = drawCount + 1;
			console.log(drawCount);

			$('#drawval').text('Draw Games -' + drawCount);

			totalGames = totalGames + 1;
			$('#totalval').text('Total Games -' +totalGames);

			//Clear the Tic-Tac-Toe cells
			resetValues();
			console.log("No moves left");
		}
	}
	//When the game cell is already occupied
	else
	{
		//Clear the Tic-Tac-Toe cells
		resetValues();
		console.log("Cheater !!!");
	}

	// When the last cell is clicked - Draw counter and Total game incremented
	if(counter> max_value)
	{
		//Draw - when no winner and no empty cells
			drawCount = drawCount + 1;
			console.log(drawCount);

			$('#drawval').text('Draw Games -' + drawCount);

			totalGames = totalGames + 1;
			$('#totalval').text('Total Games -' +totalGames);
	}

	//console.log("Inside Game Cell");

	//$(this).css('background-color') = #ffffff;
	
	//console.log($(this).attr('id'));

	});



/*-------------------------------------------------------------------------------------------------
Find Winner
-------------------------------------------------------------------------------------------------*/
function findWinner(player)
{
	//console.log("here is the winner");
	if(star[0] == player && star[1] == player && star[2] == player)
	{
		console.log("1");
		gameWinner = player;
		winnerArray[0] = 0;
		winnerArray[1] = 1;
		winnerArray[2] = 2;
	}
	else if(star[3] == player && star[4] == player && star[5] == player)
	{
		console.log("2");
		gameWinner = player;
		winnerArray[0] = 3;
		winnerArray[1] = 4;
		winnerArray[2] = 5;
	}
	else if(star[6] == player && star[7] == player && star[8] == player)
	{
		console.log("3");
		gameWinner = player;

		winnerArray[0] = 6;
		winnerArray[1] = 7;
		winnerArray[2] = 8;
	}
	else if(star[0] == player && star[3] == player && star[6] == player)
	{
		console.log("4");
		gameWinner = player;

		winnerArray[0] = 0;
		winnerArray[1] = 3;
		winnerArray[2] = 6;
	}
	else if(star[1] == player && star[4] == player && star[7] == player)
	{
		console.log("5");
		gameWinner = player;

		winnerArray[0] = 1;
		winnerArray[1] = 4;
		winnerArray[2] = 7;
	}
	else if(star[2] == player && star[5] == player && star[8] == player)
	{
		console.log("6");
		gameWinner = player;

		winnerArray[0] = 2;
		winnerArray[1] = 5;
		winnerArray[2] = 8;
	}
	else if(star[0] == player && star[4] == player && star[8] == player)
	{
		console.log("7");
		gameWinner = player;

		winnerArray[0] = 0;
		winnerArray[1] = 4;
		winnerArray[2] = 8;

		console.log("Winner Array is : " + winnerArray[0]+"::"+winnerArray[1]+"::"+winnerArray[2] +"::"+gameWinner);
	}
	else if(star[2] == player && star[4] == player && star[6] == player)
	{
		console.log("8");
		gameWinner = player;

		winnerArray[0] = 2;
		winnerArray[1] = 4;
		winnerArray[2] = 6;
	}

	if(gameWinner == player1 || gameWinner == player2)
	{
		
		console.log("Winner Array is : " + winnerArray[0]+"::"+winnerArray[1]+"::"+winnerArray[2] +"::"+gameWinner);
	}
}

/*-------------------------------------------------------------------------------------------------
Color picker
-------------------------------------------------------------------------------------------------*/
$('.colors').click(function() {

	// Figure out which color we should use
	var chosen_color = $(this).css('background-color');

	// Change the background color of the canvas
	$('#canvas').css('background-color', chosen_color);
	
	// Also change the texture choices
	$('.textures').css('background-color', chosen_color);

});

/*-------------------------------------------------------------------------------------------------
Animate Winner cell
-------------------------------------------------------------------------------------------------*/
function AnimateWinnerCell()
{
	console.log("inside AnimateWinnerCell");


	if(gameWinner == 1)
	{

		for(var index = 0; index < 3; index++)
		{
			var cellname = 'cell' + winnerArray[index];
			console.log(cellname);

			$('#'+cellname).css("background-image", "url(../images/Player1_win.jpg)");
		}
	}
	else if(gameWinner == -1)
	{

		for(var index = 0; index < 3; index++)
		{
			var cellname = 'cell' + winnerArray[index];
			console.log(cellname);

			$('#'+cellname).css("background-image", "url(../images/Player2_win.jpg)");
		}
	}

	
}

/*-------------------------------------------------------------------------------------------------
Start new game
-------------------------------------------------------------------------------------------------*/
$('#newgame').click(function() {
	
	console.log("new game button");
	//Reset all the variables
	resetValues();

});

/*-------------------------------------------------------------------------------------------------
Reset counter and start new game
-------------------------------------------------------------------------------------------------*/
$('#resetcount').click(function() {
	
	
	//Reset all the variables
	resetValues();

	//Reset winner counter
	resetScore();

});

$('#computer').click(function() {

	console.log("computer");

	if (this.checked)
	{ 
		againstComputer = 1;
		console.log('checked');
	}
	else
	{
		againstComputer = 0;
		console.log("unchecked");
	}



});



function resetValues()
{
	//empty cell counter
	counter = 0;

	//All the cell entries
	star[0] = 0;
	star[1] = 0;
	star[2] = 0;
	star[3] = 0;
	star[4] = 0;
	star[5] = 0;
	star[6] = 0;
	star[7] = 0;
	star[8] = 0;

	//Winner array
	winnerArray[0] = -1;
	winnerArray[1] = -1;
	winnerArray[2] = -1;

	gameWinner = 0;
	//$('.gameCell').css("background-image", "url(../images/empty.jpeg)");

	$('.gameCell').css('background-color', 'white');
	$('.gameCell').css('background-image', '');

	
}

function resetScore()
{
	//reset the score
	player1score = 0;
	player2score = 0;

	var count = 0;
	$('#play1val').text('Player 1 -' +count);
	$('#play2val').text('Player 2 -' +count);
	$('#drawval').text('Draw Games -' +count);
	$('#totalval').text('Total Games - ' +count);
}

function computerMove()
{
	var index=-1;

	console.log("computerMove"+counter);

	if(counter == 0)
	{
		if(star[4] == 0)
		{
			index = 4;
		}
		else
		{
			index = 0;
		}

		console.log("inside index inside if"+index);
	}
	else
	{
		if(star[0] == 1 && star[1] == 1 && star[2] == 0)
		{
			index = 2;
		}
		else if(star[0] == 1 && star[2] == 1 && star[1] == 0)
		{
			index = 1;
		}
		else if(star[0] == 1 && star[3] == 1 && star[6] == 0)
		{
			index = 6;
		}
		else if(star[0] == 1 && star[6] == 1 && star[3] == 0)
		{
			index = 3;
		}
		else if(star[0] == 1 && star[4] == 1 && star[8] == 0)
		{
			index = 8;
		}
		else if(star[0] == 1 && star[8] == 1 && star[4] == 0)
		{
			index = 4;
		}
		else if(star[4] == 1 && star[8] == 1 && star[0] == 0)
		{
			index = 0;
		}
		else if(star[3] == 1 && star[6] == 1 && star[0] == 0)
		{
			index = 0;
		}
		else if(star[1] == 1 && star[2] == 1 && star[0] == 0)
		{
			index = 0;
		}
		else if(star[2] == 1 && star[5] == 1 && star[8] == 0)
		{
			index = 8;
		}
		else if(star[2] == 1 && star[8] == 1 && star[4] == 0)
		{
			index = 4;
		}
		else if(star[5] == 1 && star[8] == 1 && star[2] == 0)
		{
			index = 2;
		}
		else if(star[6] == 1 && star[7] == 1 && star[8] == 0)
		{
			index = 8;
		}
		else if(star[8] == 1 && star[7] == 1 && star[6] == 0)
		{
			index = 6;
		}
		else if(star[6] == 1 && star[8] == 1 && star[7] == 0)
		{
			index = 7;
		}
		else if(star[1] == 1 && star[4] == 1 && star[7] == 0)
		{
			index = 7;
		}
		else if(star[7] == 1 && star[4] == 1 && star[1] == 0)
		{
			index = 1;
		}
		else if(star[1] == 1 && star[7] == 1 && star[4] == 0)
		{
			index = 4;
		}
		else if(star[3] == 1 && star[4] == 1 && star[5] == 0)
		{
			index = 5;
		}
		else if(star[3] == 1 && star[5] == 1 && star[4] == 0)
		{
			index = 4;
		}
		else if(star[5] == 1 && star[4] == 1 && star[3] == 0)
		{
			index = 3;
		}
		else if(star[2] == 1 && star[4] == 1 && star[6] == 0)
		{
			index = 6;
		}
		else if(star[2] == 1 && star[6] == 1 && star[4] == 0)
		{
			index = 4;
		}
		else if(star[6] == 1 && star[4] == 1 && star[2] == 0)
		{
			index = 2;
		}
		console.log("inside index else"+index);
		console.log("inside "+star[index]);
	}

	if(index == -1)
	{
		console.log("inside index -1");
		for(var i =0;i<=max_value;i++)
		{
			if(star[i] == 0)
			{
				index = i;
			}
		}
	}

	var cellname = 'cell' + index;
	console.log("cellname"+cellname);

	$('#'+cellname).css("background-image", "url(../images/Player2.jpeg)");

	star[index] = -1;
	console.log("Player2:"+index);
}

