var canvas = document.querySelector("canvas");
var surface = canvas.getContext("2d");

var elemInventory = document.getElementById("inventory");
var canvasInventory = elemInventory.getContext('2d');

var elemCraft= document.getElementById("craft");
var canvasCraft = elemCraft.getContext('2d');
var craftInvOpen = false;

var mapSize = 1600;

var player = {x:mapSize/2-24, y:mapSize/2-24, idle:true, frame:0, dir:2, speed:1, xSize:48, ySize:64}
player.image = new Image();
player.image.src = "img/characterSheet.png";
var oldPosition = {x:player.x, y:player.y};

var enemy = {speed:.5, x:1416, y:512, dx:0, dy:0, angle:0, distance:0, xSpeed:0, ySpeed:0}
enemy.image = new Image();
enemy.image.src = "img/enemy.png";

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
/*Starts at 57*/ "tWallM", "tWallU", "tWallD", "tWallL", "tWallR", "wall"];
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

window.addEventListener("click", clickItem);

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

function playerAttack()
{

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
	surface.clearRect(0,0,mapSize,mapSize);
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
}