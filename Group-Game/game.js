var canvas = document.querySelector("canvas");
var surface = canvas.getContext("2d");

var elemInventory = document.getElementById("inventory");
var canvasInventory = elemInventory.getContext('2d');

var elemCraft= document.getElementById("craft");
var canvasCraft = elemCraft.getContext('2d');
var craftInvOpen = false;

var elemHealth = document.getElementById("health");
var canvasHealth = elemHealth.getContext('2d');

var elemRestart = document.getElementById("restart");
var canvasRestart = elemRestart.getContext('2d');

var elemPause = document.getElementById("pause");
var canvasPause = elemPause.getContext('2d');


var mapSizeX = 3136;
var mapSizeY = 3008;
var area = 0;

var player = {x:mapSizeX/2-24, y:mapSizeY/2-100, idle:true, frame:0, dir:2, speed:1, xSize:48, ySize:64}
player.image = new Image();
player.image.src = "img/characterSheet.png";
var oldPosition = {x:player.x, y:player.y};

var enemy = {speed:.5, x:2184, y:1152, dx:0, dy:0, angle:0, distance:0, xSpeed:0, ySpeed:0, stun:false, dead:false, stunTime:0, size:32}
enemy.image = new Image();
enemy.image.src = "img/enemy.png";
var enemyOldPosition = {x:enemy.x, y:enemy.y};

var boomerang = {speed:1.5, x:0, y:0, dx:0, dy:0, angle:0, distance:0, xSpeed:0, ySpeed:0, thrown:false, timeThrown:0, frame:0, currentFrame:0, maxFrames:15, size:32}
boomerang.image = new Image();
boomerang.image.src = "img/boomerangSheet.png"

var weapon = {x:0, y:0, attack:false, dirX:0, dirY:0, vert:0, hor:0, frame:0, currentFrame:0, maxFrames:15, xSize:0, ySize:0}
weapon.image = new Image();
weapon.image.src = "img/axeSheet1.png";

var foodPickup = {x:1920, y:1100, width:64, height:64, used:false}
foodPickup.image = new Image();
foodPickup.image.src = "img/carrot.png";

var tree = {x: 1408, y:1536, width:64, height:64, used:false}
tree.image = new Image();
tree.image.src = "img/treeSingle.png";

var sign = {x:1280, y:1280, width:64, height:64}
sign.image = new Image();
sign.image.src = "img/sign.png";

var stickPickup = {x:456, y:128, width:64, height:64, used:false}
stickPickup.image = new Image();
stickPickup.image.src = "img/stick.png";

var rockPickup = {x:456, y:768, width:64, height:64, used:false}
rockPickup.image = new Image();
rockPickup.image.src = "img/rock.png";

var axePickup = {x:0, y:0, width:64, height:64, used:false}
axePickup.image = new Image();
axePickup.image.src = "img/axe.png";

var logPickup = {x:0, y:0, width:64, height:64, used:false}
logPickup.image = new Image();
logPickup.image.src = "img/logs.png";

var crftPlus = {}
crftPlus.image = new Image();
crftPlus.image.src = "img/craftingPlus.png";

var crftEqual = {}
crftEqual.image = new Image();
crftEqual.image.src = "img/craftingEquals.png";

var playerHealth = 3;

var heart = {}
heart.image = new Image();
heart.image.src = "img/heart.png";

var currentFrame = 0;
var maxFrames = 60;

var leftPressed = false;
var rightPressed = false;
var upPressed = false;
var downPressed = false;

var endTime = 180;
var currentTime = 0;
var endTimer;

var inventory = [];
var craftInv = [];

var mapFarm = [];
var mapCollidable = [];
var mapCollidableArea1 = [];
var mapCollidableArea2 = [];
var warpZone0 = [];
var warpZone1 = [];
var warpZone2 = [];

var aud_Music = new Audio ("audio/mus_Main.mp3");
aud_Music.loop = true;
aud_Music.volume = 0.25;
	
var aud_Death = new Audio ("audio/snd_Death.wav");
aud_Death.volume = 0.5;

var aud_Monster = new Audio("audio/snd_Monster.wav");
aud_Monster.loop = true;
aud_Monster.volume = 0.5;

var aud_Win = new Audio ("audio/mus_Win.wav");
aud_Win.volume = 0.5;

var aud_Lose = new Audio("audio/mus_Lose.wav");
aud_Lose.volume = 0.5;

var textBoxOpen = false;
	
var imgStr = 	["floorM", "floorU", "floorD", "floorL", "floorR", "floorTopL", "floorTopR", "floorBotL", "floorBotR",
/*Starts at 9*/  "floorHorL", "floorHorM", "floorHorR", "floorVertU", "floorVertM", "floorVertD", "floorDot",
/*Starts at 16*/ "wallX", "wallY", "cornerTopL", "cornerTopR", "cornerBotL", "cornerBotR",
/*Starts at 22*/ "waterM", "waterU", "waterD", "waterL", "waterR", "waterTopL", "waterTopR", "waterBotL", "waterBotR",
/*Starts at 31*/ "waterHorL", "waterHorM", "waterHorR", "waterVertU", "waterVertM", "waterVertD", "waterDot",
/*Starts at 38*/ "farmU", "farmM", "farmD",
/*Starts at 41*/ "mFloorM", "mFloorU", "mFloorD", "mFloorL", "mFloorR", "mFloorTopL", "mFloorTopR", "mFloorBotL", "mFloorBotR",
/*Starts at 50*/ "mFloorHorL", "mFloorHorM", "mFloorHorR", "mFloorVertU", "mFloorVertM", "mFloorVertD", "mFloorDot",
/*Starts at 57*/ "tWallM", "tWallU", "tWallD", "tWallL", "tWallR", "wall",
/*Starts at 63*/ "doorU", "doorD", "doorL", "doorR", "warpArea1", "warpArea2", "bridge"];
var images = [];

var map =
[
	[18,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,67,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,19],
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
	[17,47,62,44,51,51,42,51,45,62,46,45,17,5,1,1,11,27,23,23,23,28,5,1,1,1,1,1,1,1,10,1,10,1,10,6,17,46,47,62,53,62,62,62,62,62,62,62,17],
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
	[20,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,68,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,21],	
];

var mapBridge =
[
	[18,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,67,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,19],
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
	[17,47,62,44,51,51,42,51,45,62,46,45,17,5,1,1,11,27,23,23,23,28,5,1,1,1,1,1,1,1,10,1,10,1,10,6,17,46,47,62,53,62,62,62,62,62,62,62,17],
	[17,54,62,54,62,62,54,62,54,62,44,45,17,3,0,4,27,22,22,22,22,30,3,0,0,0,0,0,0,4,38,13,38,13,38,13,17,44,45,62,48,47,62,53,62,46,42,52,17],
	[17,54,62,48,47,62,54,62,54,62,44,45,17,3,0,4,25,22,22,22,26,5,0,0,0,0,0,0,0,4,39,13,39,13,39,13,17,44,45,62,62,54,62,44,42,43,45,62,17],
	[17,54,62,62,54,62,56,62,54,62,48,45,17,3,0,8,25,22,22,22,26,3,0,0,0,0,0,0,0,4,39,13,39,13,39,13,17,48,45,62,46,49,62,44,45,62,44,47,17],
	[17,44,47,62,54,62,62,62,54,62,62,45,17,3,4,27,22,22,22,22,30,3,0,0,0,0,0,0,0,4,39,13,39,13,39,13,17,62,54,62,54,62,62,44,49,62,44,45,17],
	[17,44,45,62,48,51,47,62,44,47,62,54,17,3,4,25,22,22,22,26,5,0,0,0,0,0,0,0,0,4,39,13,39,13,39,13,17,46,45,62,54,47,62,54,62,62,44,45,17],
	[17,44,45,62,62,62,54,62,44,49,62,54,17,3,4,25,22,22,22,26,3,0,0,0,0,0,0,0,0,4,39,13,39,13,39,13,17,44,45,62,44,41,51,41,47,62,44,45,17],
	[17,44,43,51,47,62,54,62,54,62,62,54,17,3,4,25,22,22,22,26,3,0,0,0,0,0,0,0,0,4,40,13,40,13,40,13,17,44,49,62,44,45,62,48,45,62,44,49,17],
	[17,54,62,62,54,62,54,62,54,62,46,45,17,3,4,25,22,22,22,26,3,0,0,0,0,0,0,0,0,0,1,0,1,0,1,4,17,54,62,62,48,45,62,62,54,62,54,62,17],
	[17,54,62,46,49,62,54,62,54,62,44,45,17,3,4,25,22,22,22,26,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,17,44,47,62,62,54,62,46,45,62,44,52,17],
	[17,54,62,54,62,62,48,51,41,42,41,45,17,3,4,69,69,69,69,69,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,17,44,45,62,46,45,62,44,41,51,45,62,17],
	[17,54,62,54,62,53,62,62,44,43,41,45,65,3,4,69,69,69,69,69,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,66,44,45,62,44,49,62,44,45,62,48,49,17],
	[17,54,62,54,62,48,51,51,45,62,54,55,17,3,4,69,69,69,69,69,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,17,44,45,62,54,62,62,44,49,62,62,62,17],
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
	[20,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,68,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,21],	
];

var mapArea1 =
[
	/*[115, 101, 101, 101, 101, 101, 101, 101, 101, 116],
	[102, 105, 106, 106, 106, 106, 106, 106, 107, 103],
	[102, 108, 109, 109, 109, 109, 109, 109, 110, 103],
	[102, 108, 109, 109, 109, 109, 109, 109, 110, 103],
	[102, 108, 109, 109, 109, 109, 109, 109, 110, 103],
	[102, 108, 109, 109, 109, 109, 109, 109, 110, 103],
	[102, 108, 109, 109, 109, 109, 109, 109, 110, 103],
	[102, 108, 109, 109, 109, 109, 109, 109, 110, 103],
	[102, 108, 112, 112, 112, 112, 112, 112, 113, 103],
	[117, 104, 104, 104, 104, 104, 104, 104, 104, 118],*/
	[18,16,16,16,16,16,16,16,16,16,16,16,16,16,19],
	[17,0,0,0,0,0,0,0,0,0,0,0,0,0,17],
	[17,0,0,0,0,0,0,0,0,0,0,0,0,0,17],
	[17,0,0,0,0,0,0,0,0,0,0,0,0,0,17],
	[17,0,0,0,0,0,0,0,0,0,0,0,0,0,17],
	[17,0,0,0,0,0,0,0,0,0,0,0,0,0,17],
	[17,0,0,0,0,0,0,0,0,0,0,0,0,0,17],
	[17,0,0,0,0,0,0,0,0,0,0,0,0,0,17],
	[17,0,0,0,0,0,0,0,0,0,0,0,0,0,17],
	[17,0,0,0,0,0,0,0,0,0,0,0,0,0,17],
	[17,0,0,0,0,0,0,0,0,0,0,0,0,0,17],
	[17,0,0,0,0,0,0,0,0,0,0,0,0,0,17],
	[17,0,0,0,0,0,0,0,0,0,0,0,0,0,17],
	[17,0,0,0,0,0,0,0,0,0,0,0,0,0,17],
	[20,16,16,16,16,16,16,68,16,16,16,16,16,16,21],
];

var mapArea2 =
[
	[18,16,16,16,16,16,16,67,16,16,16,16,16,16,19],
	[17,0,0,0,0,0,0,0,0,0,0,0,0,0,17],
	[17,0,0,0,0,0,0,0,0,0,0,0,0,0,17],
	[17,0,0,0,0,0,0,0,0,0,0,0,0,0,17],
	[17,0,0,0,0,0,0,0,0,0,0,0,0,0,17],
	[17,0,0,0,0,0,0,0,0,0,0,0,0,0,17],
	[17,0,0,0,0,0,0,0,0,0,0,0,0,0,17],
	[17,0,0,0,0,0,0,0,0,0,0,0,0,0,17],
	[17,0,0,0,0,0,0,0,0,0,0,0,0,0,17],
	[17,0,0,0,0,0,0,0,0,0,0,0,0,0,17],
	[17,0,0,0,0,0,0,0,0,0,0,0,0,0,17],
	[17,0,0,0,0,0,0,0,0,0,0,0,0,0,17],
	[17,0,0,0,0,0,0,0,0,0,0,0,0,0,17],
	[17,0,0,0,0,0,0,0,0,0,0,0,0,0,17],
	[20,16,16,16,16,16,16,16,16,16,16,16,16,16,21],
];

var ROWS = map.length;
var COLS = map[0].length;
var ROWSAREA1 = mapArea1.length;
var COLSAREA1 = mapArea1[0].length;
var ROWSAREA2 = mapArea2.length;
var COLSAREA2 = mapArea2[0].length;

window.addEventListener("keydown", onKeyDown);
window.addEventListener("keyup", onKeyUp);

window.addEventListener("click", clickItem);

canvas.addEventListener("mousedown", boomerangAttack);

createMap();

aud_Music.play();

var fps = 60;
var updateInterval;

function update()
{
	if (mainMenuOpen || optMenuOpen)
		renderMenu();
	
	else {
		if (!pauseMenuOpen) {
			render();
			movePlayer();
			animate();
			checkCollision();
			objectMovement();
		}
	}
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
			if (map[row][col] == 67)
			{
				warpZone1.push(tile);
			}
			if (map[row][col] == 68)
			{
				warpZone2.push(tile);
			}
			if (map[row][col] == 38 || map[row][col] == 39 || map[row][col] == 40) 
			{
				mapFarm.push(tile);
			}
			map[row][col] = tile;		
		}
	}

	for (var row = 0; row < ROWSAREA1; row++)
	{	
		for (var col = 0; col < COLSAREA1; col++)
		{
			var tile = {};
			tile.x = 64*col;
			tile.y = 64*row;
			tile.img = images[mapArea1[row][col]];
			if (mapArea1[row][col] == 16 || mapArea1[row][col] == 17 || mapArea1[row][col] == 18 || mapArea1[row][col] == 19 ||
				mapArea1[row][col] == 20 || mapArea1[row][col] == 21 || mapArea1[row][col] == 22 || mapArea1[row][col] == 23 || 
				mapArea1[row][col] == 24 || mapArea1[row][col] == 25 || mapArea1[row][col] == 26 || mapArea1[row][col] == 27 ||
				mapArea1[row][col] == 28 || mapArea1[row][col] == 29 || mapArea1[row][col] == 30 || mapArea1[row][col] == 31 || 
				mapArea1[row][col] == 32 || mapArea1[row][col] == 33 || mapArea1[row][col] == 34 || mapArea1[row][col] == 35 ||
				mapArea1[row][col] == 36 || mapArea1[row][col] == 37 || mapArea1[row][col] == 57 || mapArea1[row][col] == 58 ||
				mapArea1[row][col] == 59 || mapArea1[row][col] == 60 || mapArea1[row][col] == 61 || mapArea1[row][col] == 62) 
			{
				mapCollidableArea1.push(tile);
			}
			if (mapArea1[row][col] == 68)
			{
				warpZone0.push(tile);
			}
			mapArea1[row][col] = tile;		
		}
	}

	for (var row = 0; row < ROWSAREA2; row++)
	{	
		for (var col = 0; col < COLSAREA2; col++)
		{
			var tile = {};
			tile.x = 64*col;
			tile.y = 64*row;
			tile.img = images[mapArea2[row][col]];
			if (mapArea2[row][col] == 16 || mapArea2[row][col] == 17 || mapArea2[row][col] == 18 || mapArea2[row][col] == 19 ||
				mapArea2[row][col] == 20 || mapArea2[row][col] == 21 || mapArea2[row][col] == 22 || mapArea2[row][col] == 23 || 
				mapArea2[row][col] == 24 || mapArea2[row][col] == 25 || mapArea2[row][col] == 26 || mapArea2[row][col] == 27 ||
				mapArea2[row][col] == 28 || mapArea2[row][col] == 29 || mapArea2[row][col] == 30 || mapArea2[row][col] == 31 || 
				mapArea2[row][col] == 32 || mapArea2[row][col] == 33 || mapArea2[row][col] == 34 || mapArea2[row][col] == 35 ||
				mapArea2[row][col] == 36 || mapArea2[row][col] == 37 || mapArea2[row][col] == 57 || mapArea2[row][col] == 58 ||
				mapArea2[row][col] == 59 || mapArea2[row][col] == 60 || mapArea2[row][col] == 61 || mapArea2[row][col] == 62) 
			{
				mapCollidableArea2.push(tile);
			}
			if (mapArea2[row][col] == 67)
			{
				warpZone0.push(tile);
			}
			mapArea2[row][col] = tile;		
		}
	}

	updateInterval = setInterval(update, 1000/fps);
}

function getMousePos(canvas, event) 
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

function boomerangAttack(e)
{
	if (!mainMenuOpen) {
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
			boomerangTime = setInterval(boomerangTimer, 1000);
		}
	}
}

function meleeAttack() 
{
	if (!mainMenuOpen && inventory.includes(axePickup)) 
	{
		if(player.dir == 0) 
		{
			weapon.image.src = "img/axeSheet1.png";
			weapon.xSize = 128;
			weapon.ySize = 64;
			weapon.vert = 0;
			weapon.dirX = -32;
			weapon.dirY = -48; 
		}
		if(player.dir == 1) 
		{
			weapon.image.src = "img/axeSheet2.png";
			weapon.xSize = 64;
			weapon.ySize = 128;
			weapon.hor = 1;
			weapon.dirX = 32;
			weapon.dirY = -12; 
		}
		if(player.dir == 2) 
		{
			weapon.image.src = "img/axeSheet1.png";
			weapon.xSize = 128;
			weapon.ySize = 64;
			weapon.vert = 1;
			weapon.dirX = -48;
			weapon.dirY = 64; 
		}
		if(player.dir == 3) 
		{
			weapon.image.src = "img/axeSheet2.png";
			weapon.xSize = 64;
			weapon.ySize = 128;
			weapon.hor = 0;
			weapon.dirX = -48;
			weapon.dirY = -24; 
		}	
		weapon.attack = true;
		console.log("attack");
	}	
}

function interactWith()
{
	if (player.x + player.xSize - 8 > sign.x - 32 && player.x < sign.x + 88 && player.y + player.ySize > sign.y - 32 && player.y < sign.y + 66)
	{
		if (inventory.includes(logPickup)) {
			mapCollidable = [];
			
			map = mapBridge;
			
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
					else if (map[row][col] == 67)
					{
						warpZone1.push(tile);
					}
					else if (map[row][col] == 68)
					{
						warpZone2.push(tile);
					}
					else if (map[row][col] == 38 || map[row][col] == 39 || map[row][col] == 40) 
					{
						mapFarm.push(tile);
					}
					map[row][col] = tile;		
				}
			}

			var remove = inventory.indexOf(logPickup);
		    if (remove !== -1) {
		        inventory.splice(remove, 1);
		    }
			console.log("Building Bridge");
		}

		else if (textBoxOpen == false) {
			textBoxOpen = true
			if (lang == "EN") 
				document.getElementById("textBox").innerHTML = "Tip: Use logs to build a bridge here. First you'll need an axe!";
			
			else if (lang == "FR") 
				document.getElementById("textBox").innerHTML = "Conseil: Utilisez les journaux pour construire un pont ici. D'abord, vous aurez besoin d'une hache!";

			document.getElementById("textBox").style.visibility = "visible";
			console.log("interact");
		}
		else {
			document.getElementById("textBox").style.visibility = "hidden";
			textBoxOpen = false;
			console.log("interactFalse");
		}
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
	if (enemy.distance < 500 && enemy.stun == false && enemy.dead == false)
	{
		aud_Monster.play();
		enemy.x += enemy.speedX;
		enemy.y += enemy.speedY;
	}
	else {
		aud_Monster.pause();
	}

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

function checkCollision()
{
	if (player.x + player.xSize > foodPickup.x && player.x < foodPickup.x + 64 && player.y + player.ySize > foodPickup.y && player.y < foodPickup.y + 64)
	{
		if (!inventory.includes(foodPickup)) 
			if (!craftInv.includes(stickPickup))
				inventory.push(foodPickup);
	}

	if (player.x + player.xSize > stickPickup.x && player.x < stickPickup.x + 64 && player.y + player.ySize > stickPickup.y && player.y < stickPickup.y + 64 && area == 1)
	{
		if (!stickPickup.used) {
				inventory.push(stickPickup);
				stickPickup.used = true;
			}
	}	

	if (player.x + player.xSize > rockPickup.x && player.x < rockPickup.x + 64 && player.y + player.ySize > rockPickup.y && player.y < rockPickup.y + 64 && area == 2)
	{
		if (!rockPickup.used) {
				inventory.push(rockPickup);
				rockPickup.used = true;
			}
	}

	if (player.x + player.xSize - 8 > tree.x && player.x < tree.x + 56 && player.y + player.ySize > tree.y && player.y < tree.y + 32 && tree.used == false)
	{
		player.x = oldPosition.x;
		player.y = oldPosition.y;
	}	

	if (player.x + player.xSize - 8 > sign.x - 32 && player.x < sign.x + 88 && player.y + player.ySize > sign.y - 32 && player.y < sign.y + 66)
	{
		if (player.x + player.xSize - 8 > sign.x && player.x < sign.x + 56 && player.y + player.ySize > sign.y && player.y < sign.y + 32)
		{
			player.x = oldPosition.x;
			player.y = oldPosition.y;
		}
	}
	else {
		textBoxOpen = false;
		document.getElementById("textBox").style.visibility = "hidden";
	}	
	
	if (player.x + player.xSize > enemy.x + 20 && player.x < enemy.x + 28 && player.y + player.ySize > enemy.y + 28 && player.y < enemy.y + 50 && enemy.dead == false)
	{	
		playerHealth--;
		player.x += enemy.speedX*200;
		player.y += enemy.speedY*200;
		if (playerHealth <= 0) {
			canvasHealth.clearRect(0,0, elemHealth.width, elemHealth.height);
			playerDead();
		}		
	}

	if (area == 0)
	{
		for (var ctr = 0; ctr < mapCollidable.length; ctr++) 
		{
			if (player.x + player.xSize - 8 > mapCollidable[ctr].x && player.x < mapCollidable[ctr].x + 56 && player.y + player.ySize > mapCollidable[ctr].y && player.y < mapCollidable[ctr].y + 32) 
			{
				player.x = oldPosition.x;
				player.y = oldPosition.y;
			}
		}	
		for (var ctr = 0; ctr < mapCollidable.length; ctr++) 
		{
			if (enemy.x + enemy.size > mapCollidable[ctr].x && enemy.x < mapCollidable[ctr].x + 64 && enemy.y + enemy.size > mapCollidable[ctr].y && enemy.y < mapCollidable[ctr].y + 64) 
			{
				enemy.x = enemyOldPosition.x;
				enemy.y = enemyOldPosition.y;
			}
		}
	}
	
	if (area == 1) 
	{
		for (var ctr = 0; ctr < mapCollidableArea1.length; ctr++) 
		{
			if (player.x + player.xSize > mapCollidableArea1[ctr].x && player.x < mapCollidableArea1[ctr].x + 64 && player.y + player.ySize > mapCollidableArea1[ctr].y && player.y < mapCollidableArea1[ctr].y + 64) 
			{
				player.x = oldPosition.x;
				player.y = oldPosition.y;
			}
		}
		for (var ctr = 0; ctr < mapCollidableArea1.length; ctr++) 
		{
			if (enemy.x + enemy.size > mapCollidableArea1[ctr].x && enemy.x < mapCollidableArea1[ctr].x + 64 && enemy.y + enemy.size > mapCollidableArea1[ctr].y && enemy.y < mapCollidableArea1[ctr].y + 64) 
			{
				enemy.x = enemyOldPosition.x;
				enemy.y = enemyOldPosition.y;
			}
		}
	}

	if (area == 2) 
	{
		for (var ctr = 0; ctr < mapCollidableArea2.length; ctr++) 
		{
			if (player.x + player.xSize > mapCollidableArea2[ctr].x && player.x < mapCollidableArea2[ctr].x + 64 && player.y + player.ySize > mapCollidableArea2[ctr].y && player.y < mapCollidableArea2[ctr].y + 64) 
			{
				player.x = oldPosition.x;
				player.y = oldPosition.y;
			}
		}
		for (var ctr = 0; ctr < mapCollidableArea2.length; ctr++) 
		{
			if (enemy.x + enemy.size > mapCollidableArea2[ctr].x && enemy.x < mapCollidableArea2[ctr].x + 64 && enemy.y + enemy.size > mapCollidableArea2[ctr].y && enemy.y < mapCollidableArea2[ctr].y + 64) 
			{
				enemy.x = enemyOldPosition.x;
				enemy.y = enemyOldPosition.y;
			}
		}
	}

	for (var ctr = 0; ctr < warpZone0.length; ctr++) 
	{
		if (player.x + player.xSize - 8 > warpZone0[ctr].x && player.x < warpZone0[ctr].x + 56 && player.y + player.ySize > warpZone0[ctr].y && player.y < warpZone0[ctr].y + 32) 
		{
			if (area == 1)
			{
				area = 0;
				player.x = 1544;
				player.y = 32;
			}
			if (area == 2)
			{
				area = 0;
				player.x = 1544;
				player.y = 2880;
			}
		}
	}

	for (var ctr = 0; ctr < warpZone1.length; ctr++) 
	{
		if (player.x + player.xSize - 8 > warpZone1[ctr].x && player.x < warpZone1[ctr].x + 56 && player.y + player.ySize > warpZone1[ctr].y && player.y < warpZone1[ctr].y + 32) 
		{
			if (area == 0)
			{
				area = 1;
				player.x = 456;
				player.y = 832;
			}
		}
	}

	for (var ctr = 0; ctr < warpZone2.length; ctr++) 
	{
		if (player.x + player.xSize - 8 > warpZone2[ctr].x && player.x < warpZone2[ctr].x + 56 && player.y + player.ySize > warpZone2[ctr].y && player.y < warpZone2[ctr].y + 32) 
		{
			if (area == 0)
			{
				area = 2;
				player.x = 456;
				player.y = 32;
			}
		}
	}
	
	if (player.x + player.xSize > boomerang.x && player.x < boomerang.x + boomerang.size && player.y + player.ySize > boomerang.y && player.y < boomerang.y + boomerang.size && boomerang.timeThrown > 0.2)
	{
		boomerang.thrown = false;
		clearInterval(boomerangTime);
		boomerang.timeThrown = 0;
		console.log("Collide With Boomerang");
	}

	if (boomerang.x + boomerang.size > enemy.x + 20 && boomerang.x < enemy.x + 28 && boomerang.y + boomerang.size > enemy.y + 28 && boomerang.y < enemy.y + 50 && boomerang.thrown == true && enemy.stun == false)
	{
		aud_Monster.pause();
		boomerang.timeThrown = 1;
		enemy.stun = true;
		timeStunned = setInterval(stunTimer, 1000);
		console.log("Boomerang Hit Enemy");
	}

	if (player.x + weapon.dirX + weapon.xSize > enemy.x + 20 && player.x + weapon.dirX < enemy.x + 28 && player.y + weapon.dirY + weapon.ySize > enemy.y + 28 && player.y + weapon.dirY < enemy.y + 50 && weapon.attack == true)
	{
		aud_Monster.pause();
		enemy.dead = true;
		console.log("Weapon Hit Enemy");
	}

	if (player.x + weapon.dirX + weapon.xSize > tree.x && player.x + weapon.dirX < tree.x + 64 && player.y + weapon.dirY + weapon.ySize > tree.y && player.y + weapon.dirY < tree.y + 64 && weapon.attack == true)
	{
		if (!tree.used) 
		{
			inventory.push(logPickup);
			tree.used = true;
		}
		console.log("Axe Hit Tree");
	}


	oldPosition.x = player.x;
	oldPosition.y = player.y;
	enemyOldPosition.x = enemy.x;
	enemyOldPosition.y = enemy.y;
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

	if (weapon.attack == true)
	{
		weapon.currentFrame++;
		if (weapon.currentFrame == weapon.maxFrames)
		{
			weapon.frame++;
			weapon.currentFrame = 0;
			if (weapon.frame == 3)
			{
				weapon.frame = 0;
				weapon.attack = false;
			}
		}
	}
}

function openCraftMenu() {
	if (!mainMenuOpen) {
		craftInvOpen = !craftInvOpen;

		if (craftInvOpen) {
			elemCraft.style.visibility = "visible";
		}
		else {
		elemCraft.style.visibility = "hidden";
		}
	}
}

function openPauseMenu() {
	if (!mainMenuOpen) {
		pauseMenuOpen = !pauseMenuOpen;

		if (pauseMenuOpen)  {
			elemPause.style.visibility = "visible";
			canvasPause.font = "bold 36px Arial";
			canvasPause.textAlign = "center";
			canvasPause.fillStyle = "black";
			
			canvasPause.fillText("PAUSED", (elemPause.width/2), 40);

			btnSave.x = (elemPause.width/2) - 96;
			btnSave.y = (elemPause.height/2) - 128;
			btnLoad.x = (elemPause.width/2) - 96;
			btnLoad.y = (elemPause.height/2) - 32;
			btnExit.x = (elemPause.width/2) - 96;
			btnExit.y = (elemPause.height/2) + 64;
			
			canvasPause.drawImage(btnSave.image, btnSave.x, btnSave.y, btnWidth, btnHeight);
			canvasPause.drawImage(btnLoad.image, btnLoad.x, btnLoad.y, btnWidth, btnHeight);
			canvasPause.drawImage(btnExit.image, btnExit.x, btnExit.y, btnWidth, btnHeight);
		
			canvasPause.fillText("SAVE", btnSave.x + (btnWidth / 2), btnSave.y + 45);
			canvasPause.fillText("LOAD", btnLoad.x + (btnWidth / 2), btnLoad.y + 45);
			canvasPause.fillText("EXIT", btnExit.x + (btnWidth / 2), btnExit.y + 45);
		}
		
		else {
			elemPause.style.visibility = "hidden";
		}
		
	}
}

function openRestartMenu() {
	
	restartMenuOpen = true;
	elemRestart.style.visibility = "visible";
	canvasRestart.textAlign = "center";
	canvasRestart.fillStyle = "black";
	
	if (lang == "EN") {		
		canvasRestart.drawImage(btnYes.image, btnYes.x, btnYes.y, btnWidth, btnHeight);
		canvasRestart.drawImage(btnNo.image, btnNo.x, btnNo.y, btnWidth, btnHeight);
		
		canvasRestart.font = "bold 30px Arial";
		canvasRestart.fillText("You Died!!! ", (elemRestart.width/2), 40);
		canvasRestart.fillText("Would You Like To Restart?", (elemRestart.width/2), 68);
		
		canvasRestart.font = "bold 36px Arial";
		canvasRestart.fillText("YES", btnYes.x + (btnWidth / 2), btnYes.y + 45);
		canvasRestart.fillText("NO", btnNo.x + (btnWidth / 2), btnNo.y + 45);
		
	}
	else if (lang == "FR")
		document.getElementById("endGame").innerHTML = "Tu es mort...";
	
	document.getElementById("endGame").style.visibility = "visible";
}

function clickItem(event) {
	
	var mousePos = { 
		x: event.pageX,
		y: event.pageY
	}
	
	if (isIntersect(mousePos, elemInventory)) {
		mousePos.x -= elemInventory.offsetLeft;
		mousePos.y -= elemInventory.offsetTop;
		
		if (craftInvOpen) {
			for (var ctr = 0; ctr < inventory.length; ctr++) {
				if (isIntersect(mousePos, {offsetLeft: inventory[ctr].x, offsetTop: inventory[ctr].y, width: inventory[ctr].width, height: inventory[ctr].height})) {
					craftInv.push(inventory[ctr]);
					inventory.splice(ctr,1);
					
					if (craftInv.length >= 2)
						craftItem(craftInv[0], craftInv[1]);
					
					break;
				}
			}
		}
		
		else {
			if (inventory.length >= 1) {
				if (isIntersect(mousePos, {offsetLeft: inventory[inventory.indexOf(foodPickup)].x, offsetTop: inventory[inventory.indexOf(foodPickup)].y, width: inventory[inventory.indexOf(foodPickup)].width, height: inventory[inventory.indexOf(foodPickup)].height})) {
					if (playerHealth < 3) {
						playerHealth++;
						inventory.splice(inventory.indexOf(foodPickup), 1);
					}
				}
			}
		}
	}
	
	else if (isIntersect(mousePos, elemCraft)) {
		mousePos.x -= elemCraft.offsetLeft;
		mousePos.y -= elemCraft.offsetTop;
		
		if (craftInvOpen) {
			for (var ctr = 0; ctr < craftInv.length; ctr++) {
				if (isIntersect(mousePos, {offsetLeft: craftInv[ctr].x, offsetTop: craftInv[ctr].y, width: craftInv[ctr].width, height: craftInv[ctr].height})) {
					if (ctr <= 1) {
						inventory.push(craftInv[ctr]);
						craftInv.splice(ctr,1);
						craftItem(null, null);
					}
					else if (ctr >= 2) {
						inventory.push(craftInv[ctr]);
						craftInv.splice(0, craftInv.length);
					}
					break;
				}
			}
		}
	}
}

function isIntersect(point, elem) {
	if (point.x > elem.offsetLeft && point.x < elem.offsetLeft + elem.width && point.y > elem.offsetTop && point.y < elem.offsetTop + elem.height) {
		
		return true;
	}
	else
		return false;
}

function craftItem(item1, item2) {
	if (item1 == stickPickup && item2 == rockPickup) {
		craftInv.push(axePickup);
	}
	
	else 
		craftInv.pop();
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
		case 69: // E
			openCraftMenu();
			break;
		case 70: // F
			interactWith();
			break;
		case 32: // Space Bar
			meleeAttack();
			break;
		case 81: // Q
			openPauseMenu();
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

function playerDead() {
	aud_Monster.pause();
	aud_Death.play();
	aud_Monster.loop = false;
	aud_Music.pause();
	clearInterval(updateInterval);
	clearInterval(endTimer);
	openRestartMenu();
}

function endGameTimer() 
{
	if (!pauseMenuOpen) {
		var timeMinutes = Math.floor((endTime - currentTime)/60);
		var timeSeconds = (endTime - currentTime) - timeMinutes * 60;
		
		if (currentTime <= endTime) 
		{
			if (lang == "EN")
				document.getElementById("timer").innerHTML = "Time Left: " + timeMinutes + " : " + timeSeconds;
			else if (lang == "FR")
				document.getElementById("timer").innerHTML = "Temps Restant: " + timeMinutes + " : " + timeSeconds;
			
			currentTime++;
		}
		else if (currentTime > endTime) 
			gameOver();
	}	
}

function gameOver() 
{
	clearInterval(updateInterval);
	clearInterval(endTimer);
	aud_Music.pause();	
	
	if (enemy.dead == true) {
		aud_Win.play();
		if (lang == "EN")
			document.getElementById("endGame").innerHTML = "You Defeated The Enemy! You Win!";
		else if (lang == "FR")
			document.getElementById("endGame").innerHTML = "Vous avez Construit le Pont! Vous Gagnez!";
		
		document.getElementById("endGame").style.visibility = "visible";
	}
	else {
		aud_Monster.pause();
		aud_Lose.play();
		if (lang == "EN")
			document.getElementById("endGame").innerHTML = "Game Over! You Lose!";
		else if (lang == "FR")
			document.getElementById("endGame").innerHTML = "Jeu Terminé! Tu as Perdu!";
		
		document.getElementById("endGame").style.visibility = "visible";
	}
}

function render() 
{
	surface.clearRect(0,0,mapSizeX,mapSizeY);
	canvasCraft.clearRect(0,0, elemCraft.width, elemCraft.height);
	canvasInventory.clearRect(0,0, elemInventory.width, elemInventory.height);
	canvasHealth.clearRect(0,0, elemHealth.width, elemHealth.height);
	
	surface.setTransform(1,0,0,1,0,0);
	surface.translate(-player.x + canvas.width/2-24, -player.y + canvas.height/2-24);

	if (area == 0) {
		for (var row = 0; row < ROWS; row++) {
			for ( var col = 0; col < COLS; col++)
				surface.drawImage(map[row][col].img,map[row][col].x,map[row][col].y, 64, 64);
		}
		
		surface.drawImage(sign.image, sign.x, sign.y);
	}

	else if (area == 1) {
		for (var row = 0; row < ROWSAREA1; row++) {
			for ( var col = 0; col < COLSAREA1; col++)
				surface.drawImage(mapArea1[row][col].img,mapArea1[row][col].x,mapArea1[row][col].y, 64, 64);
		}
		
		if (!stickPickup.used)
			surface.drawImage(stickPickup.image, stickPickup.x, stickPickup.y);
	}
	
	else if (area == 2) {
		for (var row = 0; row < ROWSAREA2; row++) {
			for ( var col = 0; col < COLSAREA2; col++)
				surface.drawImage(mapArea2[row][col].img,mapArea2[row][col].x,mapArea2[row][col].y, 64, 64);
		}
		
		if (!rockPickup.used)
			surface.drawImage(rockPickup.image, rockPickup.x, rockPickup.y);
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
				
	if (!inventory.includes(foodPickup) || craftInv.includes(foodPickup))
		surface.drawImage(foodPickup.image, foodPickup.x, foodPickup.y);
		
	if (!tree.used)
		surface.drawImage(tree.image, tree.x, tree.y);

	surface.drawImage(player.image, player.frame*48, player.dir*64, 48, 64, player.x, player.y, player.xSize, player.ySize);
	
	if (boomerang.thrown == true)
		surface.drawImage(boomerang.image, boomerang.frame*68, 0, 68, 68, boomerang.x, boomerang.y, boomerang.size, boomerang.size);

	if (!enemy.dead == true)
		surface.drawImage(enemy.image, enemy.x, enemy.y);

	if (weapon.attack == true) {
		if (player.dir == 0 || player.dir == 2)
			surface.drawImage(weapon.image, weapon.frame*128, weapon.vert*64, 128, 64, player.x + weapon.dirX, player.y + weapon.dirY, 128, 64)
		
		else if (player.dir == 1 || player.dir == 3)
			surface.drawImage(weapon.image, weapon.hor*64, weapon.frame*128, 64, 128, player.x + weapon.dirX, player.y + weapon.dirY, 64, 128)
	}
	
	for (var ctr = 0; ctr < playerHealth; ctr++)
		canvasHealth.drawImage(heart.image,(ctr * 64), 0, 64, 64);
	
}