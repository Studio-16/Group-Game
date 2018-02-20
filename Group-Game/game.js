var canvas = document.querySelector("canvas");
var surface = canvas.getContext("2d");
var canvasInventory = document.getElementById("inventory").getContext('2d');

var mapSize = 1600;

var player = {x:mapSize/2-24, y:mapSize/2-24, idle:true, frame:0, dir:2, speed:1, xSize:48, ySize:64}
player.image = new Image();
player.image.src = "img/characterSheet.png";
var oldPosition = {x:player.x, y:player.y};

var enemy = {speed:.5, x:1416, y:512, dx:0, dy:0, angle:0, distance:0, xSpeed:0, ySpeed:0}
enemy.image = new Image();
enemy.image.src = "img/enemy.png";

var foodPickup = {x:1152, y:512}
foodPickup.image = new Image();
foodPickup.image.src = "img/carrot.png";

var currentFrame = 0;
var maxFrames = 60;

var leftPressed = false;
var rightPressed = false;
var upPressed = false;
var downPressed = false;

var endTime = 19;
var currentTime = 0;
var endTimer = setInterval(endGameTimer, 1000);

var inventory = [];
var mapFarm = [];
var mapCollidable = [];

var imgStr = 	["floorM", "floorU", "floorD", "floorL", "floorR", "floorTopL", "floorTopR", "floorBotL", "floorBotR",
/*Starts at 9*/  "floorHorL", "floorHorM", "floorHorR", "floorVertU", "floorVertM", "floorVertD", "floorDot",
/*Starts at 16*/ "wallX", "wallY", "cornerTopL", "cornerTopR", "cornerBotL", "cornerBotR",
/*Starts at 22*/ "waterM", "waterU", "waterD", "waterL", "waterR", "waterTopL", "waterTopR", "waterBotL", "waterBotR",
/*Starts at 31*/ "waterHorL", "waterHorM", "waterHorR", "waterVertU", "waterVertM", "waterVertD", "waterDot",
/*Starts at 38*/ "farmU", "farmM", "farmD",
/*Starts at 41*/ "mFloorM", "mFloorU", "mFloorD", "mFloorL", "mFloorR", "mFloorTopL", "mFloorTopR", "mFloorBotL", "mFloorBotR",
/*Starts at 50*/ "mFloorHorL", "mFloorHorM", "mFloorHorR", "mFloorVertU", "mFloorVertM", "mFloorVertD", "mFloorDot"];
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
	enemyMovement();
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
			if (map[row][col] == 16 || map[row][col] == 17 || map[row][col] == 18 || map[row][col] == 19 ||
				map[row][col] == 20 || map[row][col] == 21 || map[row][col] == 22 || map[row][col] == 23 || 
				map[row][col] == 24 || map[row][col] == 25 || map[row][col] == 26 || map[row][col] == 27 ||
				map[row][col] == 28 || map[row][col] == 29 || map[row][col] == 30 || map[row][col] == 31 || 
				map[row][col] == 32 || map[row][col] == 33 || map[row][col] == 34 || map[row][col] == 35 ||
				map[row][col] == 36 || map[row][col] == 37) 
			{
				mapCollidable.push(tile);
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
	if (leftPressed)
	{
	    player.x -= player.speed;
	    player.dir = 3;
	}
	if (rightPressed)
	{
	    player.x += player.speed;
	    player.dir = 1;
	}
	if (upPressed)
	{
		player.y -= player.speed;
		player.dir = 0;
	}
	if (downPressed)
	{
   		player.y += player.speed;
   		player.dir = 2;
	}
	if(player.idle == true)
		player.frame = 0;
}

function enemyMovement()
{
	enemy.dx = player.x - enemy.x;
	enemy.dy = player.y - enemy.y;
	enemy.distance = Math.sqrt(enemy.dx*enemy.dx + enemy.dy*enemy.dy);
	enemy.angle = Math.atan2(enemy.dy, enemy.dx)* 180/Math.PI;
	enemy.speedX = enemy.speed * (enemy.dx / enemy.distance);
	enemy.speedY = enemy.speed * (enemy.dy / enemy.distance);
	if (enemy.distance < 400)
	{
		enemy.x += enemy.speedX;
		enemy.y += enemy.speedY;
	}
	console.log("dx: "+enemy.dx);
	console.log("dy: "+enemy.dy);
	console.log("Distance: "+enemy.distance);
	console.log("Angle: "+enemy.angle)
}

function checkCollision()
{
	if (player.x + player.xSize > foodPickup.x && player.x < foodPickup.x + 64 && player.y + player.ySize > foodPickup.y && player.y < foodPickup.y + 64)
	{
		if (!inventory.includes(foodPickup)) 
			{
				inventory.push(foodPickup);
				console.log("Food Collected");
			}
			console.log("Collide With Food");
	}
	if (player.x + player.xSize > enemy.x + 20 && player.x < enemy.x + 28 && player.y + player.ySize > enemy.y + 28 && player.y < enemy.y + 50)
	{
		clearInterval(updateInterval);
		clearInterval(endTimer);
		document.getElementById("endGame").style.color = "red";
		document.getElementById("endGame").innerHTML = "You Died...";
		console.log("Collide With Enemy");
	}
	for (var ctr = 0; ctr < mapCollidable.length; ctr++) 
	{
		if (player.x + player.xSize > mapCollidable[ctr].x && player.x < mapCollidable[ctr].x + 64 && player.y + player.ySize > mapCollidable[ctr].y && player.y < mapCollidable[ctr].y + 64) 
		{
			player.x = oldPosition.x;
			player.y = oldPosition.y;
			console.log("Collide With Tile");
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
	
	if (currentTime <= endTime) 
	{
		document.getElementById("timer").innerHTML = "Time Left: " + timeMinutes + " : " + timeSeconds;
		currentTime++;
	}
	else if (currentTime > endTime) 
		gameOver();	
}

function gameOver() 
{
	clearInterval(updateInterval);
	clearInterval(endTimer);

	if (inventory.includes(foodPickup))
		document.getElementById("endGame").innerHTML = "You Got The Food! You Win!";
	else 
		document.getElementById("endGame").innerHTML = "Game Over! You Lose!";
}

function render()
{
	surface.clearRect(0,0,mapSize,mapSize);
	surface.setTransform(1,0,0,1,0,0);
	surface.translate(-player.x + canvas.width/2-24, -player.y + canvas.height/2-24);

	for (var row = 0; row < ROWS; row++)
	{
		for ( var col = 0; col < COLS; col++)
			surface.drawImage(map[row][col].img,map[row][col].x,map[row][col].y, 64, 64);
	}
	for (var ctr = 0; ctr < inventory.length; ctr++) 
		canvasInventory.drawImage(inventory[ctr].image, (ctr * 64), (ctr * 64), 64, 64);

	if (!inventory.includes(foodPickup))
		surface.drawImage(foodPickup.image, foodPickup.x, foodPickup.y);

	surface.drawImage(player.image, player.frame*48, player.dir*64, 48, 64, player.x, player.y, player.xSize, player.ySize);
	surface.drawImage(enemy.image, enemy.x, enemy.y);
}