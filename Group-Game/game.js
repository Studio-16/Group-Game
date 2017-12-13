var canvas = document.querySelector("canvas"); // Creates a link to the canvas element in html
var surface = canvas.getContext("2d"); // Sets the context of the canvas to 2d, thus creating a surface on which to draw.

var player = document.getElementById("player");
var playerX = canvas.width/2;
var playerY = canvas.height/2;
var playerSpeed = 5;

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
	[0,1,0,1,0,1,1,1,0,0,0],
	[0,1,0,1,0,0,0,0,0,1,0],
	[0,1,0,1,1,1,1,1,0,1,0],
	[0,1,0,0,1,0,0,0,0,1,0],
	[0,1,1,1,1,1,1,1,1,1,0],
	[0,0,0,0,0,0,0,0,0,0,0]
];

var ROWS = map.length;
var COLS = map[0].length;

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
	wall = new Image();
	wall.src = "img/wall_1.png";
	floor = new Image();
	floor.src = "img/transparent.png";
	
	for (var row = 0; row < ROWS; row++)
	{
		
		for (var col = 0; col < COLS; col++)
		{
			if(map[row][col])
			{
			var tile = {};
			tile.x = 64*col;
			tile.y = 64*row;
			tile.img = floor;
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

console.log(wall);

function movePlayer()
{
    if (leftPressed && playerX > 32)
    	playerX -= playerSpeed;
  	if (rightPressed && playerX < canvas.width - 32)
   		playerX += playerSpeed;
  	if (upPressed && playerY > 32)
  		playerY -= playerSpeed;
 	if (downPressed && playerY < canvas.height - 32)
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
			surface.drawImage(map[row][col].img,map[row][col].x,map[row][col].y, 64, 64);
		}
	}

	surface.drawImage(player, playerX-32, playerY-32, 64, 64);

	
}