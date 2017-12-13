var canvas = document.querySelector("canvas"); // Creates a link to the canvas element in html
var surface = canvas.getContext("2d"); // Sets the context of the canvas to 2d, thus creating a surface on which to draw.

var player = document.getElementById("player");
var playerX = 256;
var playerY = 256;
var playerSpeed = 10;

var leftPressed = false;
var rightPressed = false;
var upPressed = false;
var downPressed = false;

var map =
[
	[0,0,0,0,0,0,0,0,0,0,0],
	[0,1,1,1,0,1,1,1,1,1,0],
	[0,1,0,1,0,1,0,1,0,1,0],
	[0,1,0,1,1,1,0,1,0,1,0],
	[0,1,0,0,0,0,0,1,0,1,0],
	[0,1,0,1,0,0,1,1,0,0,0],
	[0,1,0,1,0,0,0,0,0,1,0],
	[0,1,0,1,1,1,1,1,0,1,0],
	[0,1,0,0,1,0,0,0,0,1,0],
	[0,1,1,1,1,1,1,1,1,1,0],
	[0,0,0,0,0,0,0,0,0,0,0]
];

var ROWS = map.length;
var COLS = map[0].length;

var wall = 0;
var floor = 1;

window.addEventListener("keydown", onKeyDown);
window.addEventListener("keyup", onKeyUp);

createMap();

var fps = 60;
var updateInterval;

function update()
{
	render();
	movePlayer();
}

function createMap()
{
	wall = new Image(0);
	wall.src = "img/wall.png";
	floor = new Image();
	floor.src = "img/grass.png";
	map = [];
	for (var row = 0; row < ROWS; row++)
	{
		map[row] = [];
		for (var col = 0; col < COLS; col++)
		{
			if(map = [0])
			{
				var tile = {};
				tile.x = 64*col;
				tile.y = 64*row;
				tile.img = wall;
				map[row][col] = tile;
			}
			else
			{
				var tile1 = {};
				tile1.x = 64*col;
				tile1.y = 64*row;
				tile1.img = wall;
				map[row][col] = tile1;
			}
			
		}
	}
	// Generate map in here.
	updateInterval = setInterval(update, 1000/fps); // Start off at 30 frames per second.
}

function movePlayer()
{
    if (leftPressed == true)
    	playerX -= playerSpeed;
  	if (rightPressed == true)
   		playerX += playerSpeed;
  	if (upPressed == true)
  		playerY -= playerSpeed;
 	if (downPressed == true)
    	playerY += playerSpeed;
}

function onKeyDown(event)
{
	switch (event.keyCode)
	{
	    case 65: // A
	    	leftPressed = true; 
	    	break;
	    case 68: // D
	    	rightPressed = true;
	    	break;
	    case 87: // W
	    	upPressed = true;
	    	break;
	    case 83: // S
	    	downPressed = true;
	    	break;
	}
}

function onKeyUp(event)
{
	switch (event.keyCode)
	{
	    case 65: // A
	    	leftPressed = false; 
	    	break;
	    case 68: // D
	    	rightPressed = false;
	    	break;
	    case 87: // W
	    	upPressed = false;
	    	break;
	    case 83: // S
	    	downPressed = false;
	    	break;
	}
}

function render()
{
	surface.clearRect(0,0,canvas.width,canvas.height);

	for (var row = 0; row < ROWS; row++)
	{
		for ( var col = 0; col < COLS; col++)
		{
			surface.drawImage(map[row][col].img,map[row][col].x,map[row][col].y);
		}
	}

	surface.drawImage(player, playerX-32, playerY-32);

	player.style.left = playerX+"px";
 	player.style.top = playerY+"px";
}