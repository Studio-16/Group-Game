var canvas = document.querySelector("canvas");
var surface = canvas.getContext("2d");

var elemInventory = document.getElementById("inventory");
var canvasInventory = elemInventory.getContext('2d');

var elemCraft= document.getElementById("craft");
var canvasCraft = elemCraft.getContext('2d');
var craftInvOpen = false;

var mapSizeX = 3200;
var mapSizeY = 2944;

var player = {x:mapSizeX/2-24, y:mapSizeY/2-24, idle:true, frame:0, dir:2, speed:1, xSize:48, ySize:64}
player.image = new Image();
player.image.src = "img/characterSheet.png";
var oldPosition = {x:player.x, y:player.y};

var enemy = {speed:.5, x:1416, y:512, dx:0, dy:0, angle:0, distance:0, xSpeed:0, ySpeed:0}
enemy.image = new Image();
enemy.image.src = "img/enemy.png";

var boomerang = {speed:1.5, x:0, y:0, dx:0, dy:0, angle:0, distance:0, xSpeed:0, ySpeed:0, thrown:false, timeThrown:0, frame:0, currentFrame:0, maxFrames:15, size:32}
boomerang.image = new Image();
boomerang.image.src = "img/boomerangSheet.png"

var crftPlus = {}
crftPlus.image = new Image();
crftPlus.image.src = "img/craftingPlus.png";

var crftEqual = {}
crftEqual.image = new Image();
crftEqual.image.src = "img/craftingEquals.png";

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
var craftInv = [];

var mapFarm = [];
var mapCollidable = [];
	
var imgStr = 	["floorM", "floorU", "floorD", "floorL", "floorR", "floorTopL", "floorTopR", "floorBotL", "floorBotR",
/*Starts at 9*/  "floorHorL", "floorHorM", "floorHorR", "floorVertU", "floorVertM", "floorVertD", "floorDot",
/*Starts at 16*/ "wallX", "wallY", "cornerTopL", "cornerTopR", "cornerBotL", "cornerBotR",
/*Starts at 22*/ "waterM", "waterU", "waterD", "waterL", "waterR", "waterTopL", "waterTopR", "waterBotL", "waterBotR",
/*Starts at 31*/ "waterHorL", "waterHorM", "waterHorR", "waterVertU", "waterVertM", "waterVertD", "waterDot",
/*Starts at 38*/ "farmU", "farmM", "farmD",
/*Starts at 41*/ "mFloorM", "mFloorU", "mFloorD", "mFloorL", "mFloorR", "mFloorTopL", "mFloorTopR", "mFloorBotL", "mFloorBotR",
/*Starts at 50*/ "mFloorHorL", "mFloorHorM", "mFloorHorR", "mFloorVertU", "mFloorVertM", "mFloorVertD", "mFloorDot",
/*Starts at 57*/ "tWallM", "tWallU", "tWallD", "tWallL", "tWallR", "wall",
/*Starts at 63*/ "doorU", "doorD", "doorL", "doorR"];
var images = [];

var map =
[
	[18,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,19],
	[17,46,42,42,42,42,42,42,42,42,42,47,16,50,47,16,46,42,42,47,16,46,42,42,42,47,16,46,42,42,42,47,16,46,42,42,42,47,16,46,42,47,16,53,16,53,16,53,17],
	[17,54,16,44,49,16,48,45,16,54,16,54,16,16,54,16,48,41,43,43,43,49,16,56,16,48,51,49,16,48,45,16,16,44,45,16,16,44,42,43,43,43,51,41,51,45,16,54,17],
	[17,54,16,54,18,16,19,54,16,54,16,54,16,46,45,16,16,54,16,16,16,16,16,16,16,16,16,16,16,16,48,52,16,48,41,47,16,44,45,16,16,16,16,54,16,54,16,54,17],
	[17,54,16,56,16,53,16,54,16,54,16,54,16,48,43,49,16,48,49,16,48,51,43,43,51,45,16,46,51,42,42,45,16,16,48,41,51,42,45,16,16,53,16,54,16,54,16,54,17],
	[17,54,62,62,62,54,62,54,62,56,62,56,62,62,54,62,48,43,49,62,48,49,62,48,51,43,43,51,45,62,46,51,42,42,45,62,62,48,41,51,42,45,62,54,62,54,62,54,17],
	[17,48,51,47,62,54,62,54,62,62,62,62,62,46,49,62,62,62,62,62,62,62,62,62,62,62,62,62,48,51,49,62,48,43,41,52,62,62,54,62,48,45,62,56,62,48,51,45,17],
	[17,62,62,48,51,45,62,48,51,42,51,47,62,54,62,62,46,42,47,62,46,47,62,46,42,42,47,62,62,62,62,62,62,62,54,62,62,46,47,62,62,54,62,62,62,62,62,54,17],
	[17,53,62,62,62,54,62,62,62,54,62,54,62,44,51,51,43,43,41,51,41,41,42,41,41,41,41,42,51,42,42,42,51,42,41,52,62,44,45,62,46,45,62,46,47,62,44,45,17],
	[17,48,51,47,62,48,54,54,42,49,62,54,62,56,62,62,62,62,56,62,48,43,43,43,43,43,43,49,62,48,43,49,62,48,49,62,62,48,49,62,48,43,51,41,43,47,62,56,17],
	[17,62,62,54,62,62,62,62,54,62,62,54,18,16,16,16,16,16,16,16,16,16,16,16,63,16,16,16,16,16,16,16,16,16,16,16,19,62,62,62,62,62,62,56,62,48,49,62,17],
	[17,47,62,44,51,51,42,51,45,62,46,45,18,5,1,1,11,27,23,23,23,28,5,1,1,1,1,1,1,1,10,1,10,1,10,6,17,46,47,62,53,62,62,62,62,62,62,62,17],
	[17,54,62,54,62,62,54,62,54,62,44,45,17,3,0,4,27,22,22,22,22,30,3,0,0,0,0,0,0,4,38,13,38,13,38,13,17,44,45,62,48,47,62,53,62,46,42,52,17],
	[17,54,62,48,47,62,54,62,54,62,44,45,17,3,0,4,25,22,22,22,26,5,0,0,0,0,0,0,0,4,39,13,39,13,39,13,17,44,45,62,62,54,62,44,42,43,45,62,17],
	[17,54,62,62,54,62,56,62,54,62,48,45,17,3,0,8,25,22,22,22,26,3,0,0,0,0,0,0,0,4,39,13,39,13,39,13,17,48,45,62,46,49,62,44,45,62,44,47,17],
	[17,44,47,62,54,62,62,62,54,62,62,45,17,3,4,27,22,22,22,22,30,3,0,0,0,0,0,0,0,4,39,13,39,13,39,13,17,62,54,62,54,62,62,44,49,62,44,45,17],
	[17,44,45,62,48,51,47,62,44,47,62,54,17,3,4,25,22,22,22,26,5,0,0,0,0,0,0,0,0,4,39,13,39,13,39,13,17,46,45,62,54,47,62,54,62,62,44,45,17],
	[17,44,45,62,62,62,54,62,44,49,62,54,17,3,4,25,22,22,22,26,3,0,0,0,0,0,0,0,0,4,39,13,39,13,39,13,17,44,45,62,44,41,51,41,47,62,44,45,17],
	[17,44,43,51,47,62,54,62,54,62,62,54,17,3,4,25,22,22,22,26,3,0,0,0,0,0,0,0,0,4,40,13,40,13,40,13,17,44,49,62,44,45,62,48,45,62,44,49,17],
	[17,54,62,62,54,62,54,62,54,62,46,45,17,3,4,25,22,22,22,26,3,0,0,0,0,0,0,0,0,0,1,0,1,0,1,4,17,54,62,62,48,45,62,62,54,62,54,62,17],
	[17,54,62,46,49,62,54,62,54,62,44,45,17,3,4,25,22,22,22,26,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,17,44,47,62,62,54,62,46,45,62,44,52,17],
	[17,54,62,54,62,62,48,51,41,42,41,45,17,3,4,25,22,22,22,26,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,17,44,45,62,46,45,62,44,41,51,45,62,17],
	[17,54,62,54,62,53,62,62,44,43,41,45,65,3,4,25,22,22,22,26,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,66,44,45,62,44,49,62,44,45,62,48,49,17],
	[17,54,62,54,62,48,51,51,45,62,54,55,17,3,4,25,22,22,22,26,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,17,44,45,62,54,62,62,44,49,62,62,62,17],
	[17,53,62,54,62,62,62,62,54,62,48,45,17,3,4,25,22,22,22,26,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,17,44,49,62,44,47,62,54,62,62,46,42,62],
	[17,46,51,49,62,50,43,42,41,47,62,54,17,3,4,25,22,22,22,26,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,17,54,62,62,44,45,62,44,47,62,48,41,62],
	[17,54,62,62,62,62,62,48,41,49,62,54,17,3,4,25,22,22,22,26,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,17,44,47,62,44,45,62,44,45,62,62,54,17],
	[17,54,62,46,42,47,62,62,54,62,62,54,17,3,4,25,22,22,22,26,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,17,48,45,62,44,45,62,44,43,42,42,45,17],
	[17,54,62,54,62,48,47,62,44,52,62,54,17,3,4,25,22,22,22,26,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,17,62,54,62,44,45,62,56,62,48,43,49,17],
	[17,54,62,54,62,62,54,62,54,62,62,54,17,3,8,25,22,22,22,26,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,17,46,49,62,44,45,62,62,62,62,62,62,17],
	[17,54,62,44,47,62,54,62,44,47,62,54,17,13,27,22,22,22,22,30,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,17,54,62,62,44,45,62,50,42,47,62,53,17],
	[17,54,62,44,45,62,54,62,44,49,62,54,17,13,25,22,22,22,26,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,17,44,47,62,44,49,62,62,44,43,42,45,17],
	[17,54,62,44,45,62,54,62,54,62,62,54,17,27,22,22,22,22,30,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,17,48,41,42,45,62,62,46,49,62,44,49,17],
	[17,54,62,44,45,62,54,62,54,62,62,56,17,29,24,24,24,30,9,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,8,17,62,48,43,43,52,62,56,62,62,54,62,17],
	[17,54,62,44,45,62,54,62,44,47,62,62,20,16,16,16,16,16,16,16,16,16,16,16,64,16,16,16,16,16,16,16,16,16,16,16,21,62,62,62,62,62,62,62,62,62,44,47,17],
	[17,54,62,44,43,51,41,51,41,45,62,48,43,42,42,42,42,42,42,42,42,42,42,42,42,42,42,42,42,42,42,42,47,62,46,51,51,51,51,51,51,51,51,51,52,62,62,54,17],
	[17,54,62,54,62,62,54,62,44,45,62,62,62,48,43,41,43,43,43,49,62,48,43,43,43,43,43,49,62,48,49,62,48,42,49,62,62,62,62,62,62,62,62,62,62,62,46,45,17],
	[17,54,62,54,62,46,49,62,44,43,52,62,62,62,62,54,62,62,62,62,62,62,62,62,62,62,62,62,62,62,62,62,62,54,62,62,46,42,51,47,62,46,51,42,47,62,44,49,17],
	[17,54,62,54,62,54,62,62,54,62,62,62,53,62,46,41,51,51,51,51,42,42,47,62,62,46,51,51,51,52,62,53,62,54,62,50,43,45,62,48,51,45,62,48,49,62,54,62,17],
	[17,54,62,54,62,54,62,46,49,62,44,42,43,51,43,49,62,62,62,62,48,43,45,62,62,54,62,62,54,62,62,54,62,54,62,62,62,54,62,62,62,54,62,62,62,62,44,47,17],
	[17,54,62,54,62,54,62,54,62,62,44,45,62,62,62,62,62,46,47,62,62,62,48,42,42,49,62,46,45,62,46,41,51,43,51,51,51,49,62,62,46,43,51,51,52,62,44,45,17],
	[17,54,62,54,62,54,62,54,62,50,41,41,51,51,51,51,51,43,43,51,47,62,62,48,49,62,62,44,49,62,48,49,62,62,62,62,62,62,62,46,49,62,62,62,62,62,44,45,17],
	[17,54,62,54,62,54,62,54,62,62,44,45,62,62,62,62,62,62,62,62,48,47,62,62,62,62,46,49,62,62,62,62,62,46,42,51,42,42,51,45,62,62,46,51,47,62,48,45,17],
	[17,54,62,62,50,49,62,48,47,62,48,41,42,42,42,42,42,42,47,62,62,48,51,51,51,51,49,62,62,62,50,51,42,43,49,62,48,45,62,48,52,62,54,62,54,62,62,54,17],
	[17,44,47,62,62,62,62,62,54,62,62,48,43,43,43,43,43,43,41,47,62,62,62,62,62,62,62,62,53,62,62,62,54,62,62,62,62,54,62,62,62,62,54,62,44,47,62,54,17],
	[17,48,43,51,51,51,51,51,43,52,62,62,62,62,62,62,62,62,48,43,51,51,51,51,51,51,51,51,43,51,51,51,43,51,51,52,62,48,51,51,51,51,49,62,44,45,62,54,17],
	[20,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,21],	
];


var ROWS = map.length;
var COLS = map[0].length;

window.addEventListener("keydown", onKeyDown);
window.addEventListener("keyup", onKeyUp);

window.addEventListener("click", clickItem);
canvas.addEventListener("mousedown", playerAttack);

//window.addEventListener("playerAttack", mouseDown);

createMap();
aud_Music.play();

var fps = 60;
var updateInterval;

function update()
{
	render();
	movePlayer();
	animate();
	checkCollision();
	objectMovement();
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
				map[row][col] == 36 || map[row][col] == 37 || map[row][col] == 57 || map[row][col] == 58 ||
				map[row][col] == 59 || map[row][col] == 60 || map[row][col] == 61 || map[row][col] == 62) 
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



function  getMousePos(canvas, event) 
{
	var rect = canvas.getBoundingClientRect(),
    scaleX = canvas.width / rect.width,
    scaleY = canvas.height / rect.height; 
	return {
    x: (event.clientX - rect.left) * scaleX,
    y: (event.clientY - rect.top) * scaleY
  }
}

function boomerangTimer()
{
	boomerang.timeThrown++;
}

function stunTimer()
{
	enemy.stunTime++;
	if (enemy.stunTime > 2)
	{
		enemy.stun = false;
		enemy.stunTime = 0;
		clearInterval(timeStunned);
	}
}

function playerAttack(e)
{
	if (boomerang.thrown == false)
	{
		var mousePosition = getMousePos(canvas, e);
		boomerang.x = player.x;
		boomerang.y = player.y;	
		boomerang.thrown = true;
		boomerang.dx = mousePosition.x - canvas.width/2;
		boomerang.dy = mousePosition.y - canvas.height/2;
		boomerang.angle = Math.atan2(boomerang.dx,boomerang.dy)*180/Math.PI;
		boomerang.distance = Math.sqrt(boomerang.dx*boomerang.dx + boomerang.dy*boomerang.dy);
		boomerang.speedX = boomerang.speed * (boomerang.dx / boomerang.distance);
		boomerang.speedY = boomerang.speed * (boomerang.dy / boomerang.distance);
		
		//Debug Boomerang Movement
		/*console.log("Attack");
		console.log("dx: "+boomerang.dx);
		console.log("dy: "+boomerang.dy);
		console.log("Distance: "+boomerang.distance);
		console.log("Angle: "+boomerang.angle);
		console.log("x: "+mousePosition.x);
		console.log("y: "+mousePosition.y);*/

		boomerangTime = setInterval(boomerangTimer, 1000);
	}
}

function objectMovement()
{
	enemy.dx = player.x - enemy.x;
	enemy.dy = player.y - enemy.y;
	enemy.distance = Math.sqrt(enemy.dx*enemy.dx + enemy.dy*enemy.dy);
	enemy.angle = Math.atan2(enemy.dy, enemy.dx)* 180/Math.PI;
	enemy.speedX = enemy.speed * (enemy.dx / enemy.distance);
	enemy.speedY = enemy.speed * (enemy.dy / enemy.distance);	
	if (enemy.distance < 500 && enemy.stun == false)
	{
		enemy.x += enemy.speedX;
		enemy.y += enemy.speedY;
	}
	// Debug Enemy AI
	/*console.log("dx: "+enemy.dx);
	console.log("dy: "+enemy.dy);
	console.log("Distance: "+enemy.distance);
	console.log("Angle: "+enemy.angle)*/
	if (boomerang.timeThrown > .2)
	{
		boomerang.dx = player.x - boomerang.x;
		boomerang.dy = player.y - boomerang.y;
		boomerang.angle = Math.atan2(boomerang.dx,boomerang.dy)*180/Math.PI;
		boomerang.distance = Math.sqrt(boomerang.dx*boomerang.dx + boomerang.dy*boomerang.dy);
		boomerang.speedX = boomerang.speed * (boomerang.dx / boomerang.distance);
		boomerang.speedY = boomerang.speed * (boomerang.dy / boomerang.distance);
	}
	if (boomerang.thrown == true)
	{
		boomerang.x += boomerang.speedX;
		boomerang.y += boomerang.speedY;
	}
}

function openCraftMenu() {
	craftInvOpen = !craftInvOpen;
	
	if (craftInvOpen) {
		elemCraft.style.display = "block";
	}
	else {
	elemCraft.style.display = "none";
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

	if (boomerang.thrown == true)
	{
		boomerang.currentFrame++;
		if (boomerang.currentFrame == boomerang.maxFrames)
		{
			boomerang.frame++;
			boomerang.currentFrame = 0;
			if (boomerang.frame == 7)
				boomerang.frame = 0;
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
	aud_Music.pause();	
	
	if (inventory.includes(axePickup)) {
		aud_Win.play();
		document.getElementById("endGame").innerHTML = "You Got The Axe! You Win!";
	}
	else {
		aud_Lose.play();
		document.getElementById("endGame").innerHTML = "Game Over! You Lose!";
	}
}

function render()
{
	surface.clearRect(0,0,mapSizeX,mapSizeY);
	canvasCraft.clearRect(0,0, elemCraft.width, elemCraft.height);
	canvasInventory.clearRect(0,0, elemInventory.width, elemInventory.height);
	
	surface.setTransform(1,0,0,1,0,0);
	surface.translate(-player.x + canvas.width/2-24, -player.y + canvas.height/2-24);

	for (var row = 0; row < ROWS; row++)
		{
			for ( var col = 0; col < COLS; col++)
				surface.drawImage(map[row][col].img,map[row][col].x,map[row][col].y, 64, 64);
		}

	for (var ctr = 0; ctr < inventory.length; ctr++) {
			inventory[ctr].x = ctr * 64;
			inventory[ctr].y = 0;
			canvasInventory.drawImage(inventory[ctr].image, inventory[ctr].x, inventory[ctr].y, 64, 64);
		}
		
	if (craftInvOpen) {
			canvasCraft.drawImage(crftPlus.image, 64, 0, 64, 64);
			canvasCraft.drawImage(crftEqual.image, 192, 0, 64, 64);
		}
		
	for (var ctr = 0; ctr < craftInv.length; ctr++) {
			craftInv[ctr].x = ctr * 128;
			craftInv[ctr].y = 0;
			canvasCraft.drawImage(craftInv[ctr].image, craftInv[ctr].x, craftInv[ctr].y, 64, 64);
		}
		
		
	if (!inventory.includes(foodPickup) || !craftInv.includes(foodPickup))
			surface.drawImage(foodPickup.image, foodPickup.x, foodPickup.y);
		
	if (!treePickup.used)
			surface.drawImage(treePickup.image, treePickup.x, treePickup.y);
		
	
	surface.drawImage(player.image, player.frame*48, player.dir*64, 48, 64, player.x, player.y, player.xSize, player.ySize);
	surface.drawImage(enemy.image, enemy.x, enemy.y);

	if (boomerang.thrown == true)
		surface.drawImage(boomerang.image, boomerang.frame*68, 0, 68, 68, boomerang.x, boomerang.y, boomerang.size, boomerang.size);

}