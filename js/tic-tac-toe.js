//Counter to hold the game values
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

//Player 1 & score
var player1score = 0;
var player2score = 0;

//Player 2 or computer
var againstComputer = 0;

//Game count
var totalGames = 0;
var drawCount = 0;


/*-------------------------------------------------------------------------------------------------
Game cell Display
-------------------------------------------------------------------------------------------------*/
$('.gameCell').click(function(){

console.log("inside .gameCell");

	//Get the Cell ID to find empty cells
	var name = $(this).attr('id');

	name = name.substring(4);


	//When the game cell is empty valid move
	if(star[name] == 0 && gameWinner == 0)
	{

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
			
			//When there is Winner
			if(gameWinner == 1 || gameWinner == -1)
			{
				//Player 1 is the winner
				if(gameWinner == 1)
				{
					//increments the Player 1 score
					player1score = player1score + 1;
					var count = 'Player 1 -' +player1score.toString();
					$('#play1val').text(count);
				}
				//Player 2 or computer is the winner 
				else if(gameWinner == -1)
				{
					player2score = player2score + 1;
					//increments the compuetr score
					if(againstComputer == 1)
					{
						var count = 'Computer -' +player2score.toString();
					}
					//increments the Player 2 score
					else if(againstComputer == 0)
					{
						var count = 'Player 2 -' +player2score.toString();
					}
					$('#play2val').text(count);
				}
				
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

			$('#drawval').text('Tie Games -' + drawCount);

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

			$('#drawval').text('Tie Games -' + drawCount);

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

	//Updates the winner cell with different color
	if(gameWinner == 1)
	{

		for(var index = 0; index < 3; index++)
		{
			var cellname = 'cell' + winnerArray[index];
			
			$('#'+cellname).css("background-image", "url(../images/Player1_win.jpg)");

		}
	}
	else if(gameWinner == -1)
	{

		for(var index = 0; index < 3; index++)
		{
			var cellname = 'cell' + winnerArray[index];

			$('#'+cellname).css("background-image", "url(../images/Player2_win.jpg)");
		}
	}

	
}

/*-------------------------------------------------------------------------------------------------
Start new game
-------------------------------------------------------------------------------------------------*/
$('#newgame').click(function() {
	
	if(counter == 0)
	{
		alert("Nothing to reset");
	}
	else
	{
		//Reset all the variables
		resetValues();
	}

});

/*-------------------------------------------------------------------------------------------------
Reset counter and start new game
-------------------------------------------------------------------------------------------------*/
$('#resetcount').click(function() {
	
	if(counter == 0)
	{
		alert("Nothing to reset");
	}
	else
	{
		//Reset all the variables
		resetValues();

		//Reset winner counter
		resetScore();
	}

});

$('#computer').click(function() {

	var count = 0;

	if (this.checked)
	{ 
		againstComputer = 1;
		$('#play2val').text('Computer -' +count);
	}
	else
	{
		againstComputer = 0;
		$('#play2val').text('Player 2 -' +count);
	}

	//reset all the counters and images when Player option is changed
	resetValues();
	resetScore();

});

/*-------------------------------------------------------------------------------------------------
Reset the current values for Start new game option
-------------------------------------------------------------------------------------------------*/
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

	//Reset the cell images
	$('.gameCell').css('background-color', 'white');
	$('.gameCell').css('background-image', '');

	
}

/*-------------------------------------------------------------------------------------------------
Reset the counter for Resetting the whole series
-------------------------------------------------------------------------------------------------*/
function resetScore()
{
	//reset the score
	player1score = 0;
	player2score = 0;

	var count = 0;
	$('#play1val').text('Player 1 -' +count);
	
	$('#drawval').text('Tie Games -' +count);
	$('#totalval').text('Total Games - ' +count);

	// Player 2 or Computer will be displayed - depending on the option
	if(againstComputer == 1)
	{
		$('#play2val').text('Computer -' +count);
	}
	else if(againstComputer == 0)
	{
		$('#play2val').text('Player 2 -' +count);
	}
}

/*-------------------------------------------------------------------------------------------------
When played against computer detects computer move
-------------------------------------------------------------------------------------------------*/
function computerMove()
{
	var index=-1;

	console.log("computerMove"+counter);

	//Executes for the first computer move
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

	}
	//When 2 player moves where made
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
	}

	//when Player 1 does not occupy any 2 cell straight
	if(index == -1)
	{
		//checks for the first avaiable cell
		for(var i =0;i<=max_value;i++)
		{
			if(star[i] == 0)
			{
				index = i;
			}
		}
	}

	var cellname = 'cell' + index;

	$('#'+cellname).css("background-image", "url(../images/Player2.jpeg)");

	//Assigns the cell to compuetr
	star[index] = -1;
}

