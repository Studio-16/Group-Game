var canvas = document.querySelector("canvas");
var surface = canvas.getContext("2d");

var player = {x:canvas.width/2-24, y:canvas.height/2-24};
player.image = new Image();
player.image.src = "img/playerR.png"
var playerSpeed = 1;

var leftPressed = false;
var rightPressed = false;
var upPressed = false;
var downPressed = false;

var mapSize = 960;

var imgStr = ["floorM", "floorU", "floorD", "floorL", "floorR", "floorTopL", "floorTopR", "floorBotL", "floorBotR", "wallX", "wallY", "cornerTopL", "cornerTopR", "cornerBotL", "cornerBotR"];
var images = [];

var map =
[
	[11,9,9,9,9,9,9,9,9,9,9,9,9,9,12],
	[10,5,1,1,1,1,1,1,1,1,1,1,1,6,10],
	[10,3,0,0,0,0,0,0,0,0,0,0,0,4,10],
	[10,3,0,0,0,0,0,0,0,0,0,0,0,4,10],
	[10,3,0,0,0,0,0,0,0,0,0,0,0,4,10],
	[10,3,0,0,0,0,0,0,0,0,0,0,0,4,10],
	[10,3,0,0,0,0,0,0,0,0,0,0,0,4,10],
	[10,3,0,0,0,0,0,0,0,0,0,0,0,4,10],
	[10,3,0,0,0,0,0,0,0,0,0,0,0,4,10],
	[10,3,0,0,0,0,0,0,0,0,0,0,0,4,10],
	[10,3,0,0,0,0,0,0,0,0,0,0,0,4,10],
	[10,3,0,0,0,0,0,0,0,0,0,0,0,4,10],
	[10,3,0,0,0,0,0,0,0,0,0,0,0,4,10],
	[10,7,2,2,2,2,2,2,2,2,2,2,2,8,10],
	[13,9,9,9,9,9,9,9,9,9,9,9,9,9,14]
	
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

function Screen(tag, width, height) 
{
	this.width = width;
	this.height = height;
	this.top = 0;
	this.left = 0;
}

function movePlayer()
{
	
	if (leftPressed && player.x > 0)
	    player.x -= playerSpeed;
	if (rightPressed && player.x < mapSize - 48)
	    player.x += playerSpeed;
	if (upPressed && player.y > 0)
		player.y -= playerSpeed;
	if (downPressed && player.y < mapSize - 48)
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
	surface.translate(-player.x + canvas.width/2-24, -player.y + canvas.width/2-24);

	for (var row = 0; row < ROWS; row++)
	{
		for ( var col = 0; col < COLS; col++)
		{
			surface.drawImage(map[row][col].img,map[row][col].x,map[row][col].y, 64, 64);
		}
	}
	surface.drawImage(player.image, player.x, player.y, 48, 48);
}