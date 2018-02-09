var canvas = document.querySelector("canvas");
var surface = canvas.getContext("2d");

var mapSize = 1600;

var player = {x:mapSize/2-24, y:mapSize/2-24};
player.image = new Image();
player.image.src = "img/playerR.png"
var playerSpeed = 1;

var leftPressed = false;
var rightPressed = false;
var upPressed = false;
var downPressed = false;

var imgStr = 	["floorM", "floorU", "floorD", "floorL", "floorR", "floorTopL", "floorTopR", "floorBotL", "floorBotR",
/*Starts at 9*/  "floorHorL", "floorHorM", "floorHorR", "floorVertU", "floorVertM", "floorVertD", "floorDot",
/*Starts at 16*/ "wallX", "wallY", "cornerTopL", "cornerTopR", "cornerBotL", "cornerBotR",
/*Starts at 22*/ "waterM", "waterU", "waterD", "waterL", "waterR", "waterTopL", "waterTopR", "waterBotL", "waterBotR",
/*Starts at 31*/ "waterHorL", "waterHorM", "waterHorR", "waterVertU", "waterVertM", "waterVertD", "waterDot",
/*Starts at 38*/ "farmU", "farmM", "farmD"];
var images = [];

var map =
[
	[18,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,19],
	[17,5,1,1,11,27,23,23,23,28,5,1,1,1,1,1,1,1,10,1,10,1,10,6,17],
	[17,3,0,4,27,22,22,22,22,30,3,0,0,0,0,0,0,4,38,13,38,13,38,13,17],
	[17,3,0,4,25,22,22,22,26,5,0,0,0,0,0,0,0,4,39,13,39,13,39,13,17],
	[17,3,0,8,25,22,22,22,26,3,0,0,0,0,0,0,0,4,39,13,39,13,39,13,17],
	[17,3,4,27,22,22,22,22,30,3,0,0,0,0,0,0,0,4,39,13,39,13,39,13,17],
	[17,3,4,25,22,22,22,26,5,0,0,0,0,0,0,0,0,4,39,13,39,13,39,13,17],
	[17,3,4,25,22,22,22,26,3,0,0,0,0,0,0,0,0,4,39,13,39,13,39,13,17],
	[17,3,4,25,22,22,22,26,3,0,0,0,0,0,0,0,0,4,40,13,40,13,40,13,17],
	[17,3,4,25,22,22,22,26,3,0,0,0,0,0,0,0,0,0,1,0,1,0,1,4,17],
	[17,3,4,25,22,22,22,26,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,17],
	[17,3,4,25,22,22,22,26,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,17],
	[17,3,4,25,22,22,22,26,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,17],
	[17,3,4,25,22,22,22,26,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,17],
	[17,3,4,25,22,22,22,26,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,17],
	[17,3,4,25,22,22,22,26,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,17],
	[17,3,4,25,22,22,22,26,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,17],
	[17,3,4,25,22,22,22,26,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,17],
	[17,3,4,25,22,22,22,26,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,17],
	[17,3,8,25,22,22,22,26,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,17],
	[17,13,27,22,22,22,22,30,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,17],
	[17,13,25,22,22,22,26,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,17],
	[17,14,25,22,22,22,30,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,17],
	[17,31,24,24,24,30,9,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,8,17],
	[20,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,21],
	
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
	//checkCollision();
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
	updateInterval = setInterval(update, 1000/fps);
}

function movePlayer()
{
	
	if (leftPressed && player.x > 64)
	    player.x -= playerSpeed;
	if (rightPressed && player.x < mapSize - 112)
	    player.x += playerSpeed;
	if (upPressed && player.y > 64)
		player.y -= playerSpeed;
	if (downPressed && player.y < mapSize - 112)
   		player.y += playerSpeed;
}

/*function checkCollision()
{
	if (!( player.y > rock.y+64 || player.y+64 < rock.y || player.x > rock.x+64 || player.x+64 < rock.x ))
		console.log("collision");
}*/

function onKeyDown(event)
{
	switch (event.keyCode)
	{
	    case 65: // A
	    	leftPressed = true;
	    	player.image.src = "img/playerL.png" 
	    	break;
	    case 68: // D
	    	rightPressed = true;
	    	player.image.src = "img/playerR.png"
	    	break;
	    case 87: // W
	    	upPressed = true;
	    	player.image.src = "img/playerU.png"
	    	break;
	    case 83: // S
	    	downPressed = true;
	    	player.image.src = "img/playerD.png"
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
	surface.clearRect(0,0,mapSize,mapSize);
	surface.setTransform(1,0,0,1,0,0);
	surface.translate(-player.x + canvas.width/2-24, -player.y + canvas.height/2-24);

	for (var row = 0; row < ROWS; row++)
	{
		for ( var col = 0; col < COLS; col++)
		{
			surface.drawImage(map[row][col].img,map[row][col].x,map[row][col].y, 64, 64);
		}
	}
	surface.drawImage(player.image, player.x, player.y, 48, 48);
}