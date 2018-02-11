var canvas = document.querySelector("canvas");
var surface = canvas.getContext("2d");

var mapSize = 1600;

var player = {x:mapSize/2-24, y:mapSize/2-24, idle:true, frame:0, dir:2, speed:1, xSize:48, ySize:64};
player.image = new Image();
player.image.src = "img/characterSheet.png"
var oldPosition = {x:player.x, y:player.y};

var currentFrame = 0;
var maxFrames = 60;

var leftPressed = false;
var rightPressed = false;
var upPressed = false;
var downPressed = false;

var endTime = 9;
var currentTime = 0;
var endTimer = setInterval(endGameTimer, 1000);

var inventory = [];
var mapFarm = [];
var mapWater = [];

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
	[17,27,22,22,22,22,30,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,17],
	[17,29,24,24,24,30,9,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,8,17],
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
	animate();
	checkCollision();
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
			if (map[row][col] == 22 || map[row][col] == 23 || map[row][col] == 24 || map[row][col] == 25 ||
				map[row][col] == 26 || map[row][col] == 27 || map[row][col] == 28 || map[row][col] == 29 || 
				map[row][col] == 30 || map[row][col] == 31 || map[row][col] == 32 || map[row][col] == 33 || 
				map[row][col] == 34 || map[row][col] == 35 || map[row][col] == 36 || map[row][col] == 37) 
			{
				mapWater.push(tile);
			}
			if (map[row][col] == 38 || map[row][col] == 39 || map[row][col] == 40) 
			{
				mapFarm.push(tile);
			}
			map[row][col] = tile;		
		}
	}
	updateInterval = setInterval(update, 1000/fps);
}

function movePlayer()
{	
	if (leftPressed && player.x > 64)
	{
	    player.x -= player.speed;
	    player.dir = 3;
	}
	if (rightPressed && player.x < mapSize - 112)
	{
	    player.x += player.speed;
	    player.dir = 1;
	}
	if (upPressed && player.y > 64)
	{
		player.y -= player.speed;
		player.dir = 0;
	}
	if (downPressed && player.y < mapSize - 128)
	{
   		player.y += player.speed;
   		player.dir = 2;
	}
	if(player.idle == true)
		player.frame = 0;
}

function checkCollision()
{
	for (var ctr = 0; ctr < mapFarm.length; ctr++) 
	{
		if (player.x + player.xSize > mapFarm[ctr].x && player.x < mapFarm[ctr].x + 64 && player.y + player.ySize > mapFarm[ctr].y && player.y < mapFarm[ctr].y + 64) 
		{
			if (!inventory.includes("Food")) 
			{
				inventory.push("Food");
				console.log("Food Collected");
			}
			console.log("Collide With Farm");
		}
	}
	for (var ctr = 0; ctr < mapWater.length; ctr++) 
	{
		if (player.x + player.xSize > mapWater[ctr].x && player.x < mapWater[ctr].x + 64 && player.y + player.ySize > mapWater[ctr].y && player.y < mapWater[ctr].y + 64) 
		{
			player.x = oldPosition.x;
			player.y = oldPosition.y;
			console.log("Collide With Water");
		}
	}	
	oldPosition.x = player.x;
	oldPosition.y = player.y;
}

function onKeyDown(event)
{
	switch (event.keyCode)
	{
	    case 65: // A
	    	leftPressed = true;
	    	player.idle = false;
	    	break;
	    case 68: // D
	    	rightPressed = true;
	    	player.idle = false;
	    	break;
	    case 87: // W
	    	upPressed = true;
	    	player.idle = false;
	    	break;
	    case 83: // S
	    	downPressed = true;
	    	player.idle = false;
	    	break;
	}
}

function onKeyUp(event)
{
	switch (event.keyCode)
	{
	    case 65: // A
	    	leftPressed = false;
	    	player.idle = true; 
	    	break;
	    case 68: // D
	    	rightPressed = false;
	    	player.idle = true; 
	    	break;
	    case 87: // W
	    	upPressed = false;
	    	player.idle = true; 
	    	break;
	    case 83: // S
	    	downPressed = false;
	    	player.idle = true; 
	    	break;
	}
}

function animate()
{
	if (leftPressed || rightPressed || upPressed || downPressed)
	{
		currentFrame++;
		if (currentFrame == maxFrames)
		{
			player.frame++;
			currentFrame = 0;
			if (player.frame == 3)
				player.frame = 1;
		}
	}
}

function endGameTimer() 
{
	var timeMinutes = Math.floor((endTime - currentTime)/60);
	var timeSeconds = (endTime - currentTime) - timeMinutes * 60;
	
	if (currentTime <= endTime) {
		document.getElementById("timer").innerHTML = "Time Left: " + timeMinutes + " : " + timeSeconds;
		currentTime++;
	}
	else if (currentTime > endTime) {
		gameOver();
	}	
}

function gameOver() 
{
	clearInterval(endTimer);
	if (inventory.includes("Food"))
	{
		document.getElementById("endGame").innerHTML = "You Got The Food! You Win!";
		clearInterval(updateInterval);	
	}
	else 
	{
		document.getElementById("endGame").innerHTML = "Game Over! You Lose!";
		clearInterval(updateInterval);
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
	surface.drawImage(player.image, player.frame*48, player.dir*64, 48, 64, player.x, player.y, player.xSize, player.ySize);
}