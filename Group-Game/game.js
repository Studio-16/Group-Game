var canvas = document.querySelector("canvas");
var surface = canvas.getContext("2d");

var player = {x:canvas.width/2-32, y:canvas.height/2-32};
player.image = new Image();
player.image.src = "img/playerR.png"
var playerSpeed = 1;

var rock = {x:64, y:64};
rock.image = new Image();
rock.image.src = "img/rock.png";

var leftPressed = false;
var rightPressed = false;
var upPressed = false;
var downPressed = false;

var imgStr = ["transparent", "wall_1", "wall"];
var images = [];

var map =
[
	[1,1,1,1,1,1,1,1,1,1,1],
	[1,0,0,0,1,0,0,0,0,0,1],
	[1,0,1,0,1,0,1,0,1,0,1],
	[1,0,1,0,0,0,1,0,1,0,1],
	[1,0,1,0,1,1,1,0,1,0,1],
	[1,0,1,0,1,0,0,0,1,1,1],
	[1,0,1,0,1,1,1,1,1,0,1],
	[1,0,1,0,0,0,0,0,1,0,1],
	[1,0,1,1,0,1,1,1,1,0,1],
	[1,0,0,0,0,0,0,0,0,0,1],
	[1,1,1,1,1,1,1,1,1,1,1]
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
			map[row][col] = tile;		
		}
	}
	updateInterval = setInterval(update, 1000/fps);
}

function movePlayer()
{
	
	if (leftPressed && player.x > 32)
	    player.x -= playerSpeed;
	if (rightPressed && player.x < canvas.width - 32)
	    player.x += playerSpeed;
	if (upPressed && player.y > 32)
		player.y -= playerSpeed;
	if (downPressed && player.y < canvas.height - 32)
   		player.y += playerSpeed;
}

function checkCollision()
{
	if (!( player.y > rock.y+64 || player.y+64 < rock.y || player.x > rock.x+64 || player.x+64 < rock.x ))
		console.log("collision");
}

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
	surface.clearRect(0,0,canvas.width,canvas.height);

	for (var row = 0; row < ROWS; row++)
	{
		for ( var col = 0; col < COLS; col++)
		{
			surface.drawImage(map[row][col].img,map[row][col].x,map[row][col].y, 64, 64);
		}
	}
	surface.drawImage(player.image, player.x, player.y, 64, 64);
	surface.drawImage(rock.image, rock.x, rock.y, 64, 64);
}