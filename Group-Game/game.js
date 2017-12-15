var canvas = document.querySelector("canvas");
var surface = canvas.getContext("2d");

var player = document.getElementById("player");
var playerX = canvas.width/2;
var playerY = canvas.height/2;
var playerSpeed = 1;

var leftPressed = false;
var rightPressed = false;
var upPressed = false;
var downPressed = false;

var imgStr = ["wall_1", "transparent", "wall"];
var images = [];

var map =
[
	[0,0,0,0,0,0,0,0,0,0,0],
	[0,1,1,1,0,1,1,1,1,1,0],
	[0,1,0,1,0,1,0,1,0,1,0],
	[0,1,0,1,1,1,0,1,0,1,0],
	[0,1,0,1,0,0,0,1,0,1,0],
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
	for(var i = 0; i < imgStr.length; i++)
	{
		images[i] = new Image();
		images[i].src = "img/"+imgStr[i]+".png";
	}
	
	for (var row = 0; row < ROWS; row++)
	{
		
		for (var col = 0; col < COLS; col++)
		{
			var tile = {};
			tile.x = 64*col;
			tile.y = 64*row;
			tile.img = images[map[row][col]];
			map[row][col] = tile;		
		}
	}
	updateInterval = setInterval(update, 1000/fps); // Start off at 30 frames per second.
}

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
	    	player.src = "img/playerL.png" 
	    	break;
	    case 68: // D
	    	rightPressed = true;
	    	player.src = "img/playerR.png"
	    	break;
	    case 87: // W
	    	upPressed = true;
	    	player.src = "img/playerU.png"
	    	break;
	    case 83: // S
	    	downPressed = true;
	    	player.src = "img/playerD.png"
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
	surface.drawImage(player, playerX-24, playerY-24, 48, 48);
}