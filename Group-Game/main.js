var imgBackground = {}
imgBackground.image = new Image();
imgBackground.image.src = "img/mainMenu.png";

var btnPlay = {x: 175, y: 250, width: 192, height: 64}
btnPlay.image = new Image();
btnPlay.image.src = "img/btnPlay.png";

var btnLoad = {x: (canvas.width - 192 - btnPlay.x), y: btnPlay.y,  width: 192, height: 64}
btnLoad.image = new Image();
btnLoad.image.src = "img/btnLoad.png";

var btnExit = {x: btnLoad.x, y: (canvas.height + 16 - btnPlay.y),  width: 192, height: 64}
btnExit.image = new Image();
btnExit.image.src = "img/btnExit.png";

var btnOptions = {x: btnPlay.x, y: (canvas.height + 16 - btnPlay.y),  width: 192, height: 64}
btnOptions.image = new Image();
btnOptions.image.src = "img/btnOptions.png";

var mainMenuOpen = true;

canvas.addEventListener("click", clickBtn);

function clickBtn(event) {
	var mousePos = getMousePos(canvas, event);
	if (isIntersectMenu(mousePos, btnPlay)) {
		startGame();
	}
	
	else if (isIntersectMenu(mousePos, btnLoad)) {
		
	}
	
	else if (isIntersectMenu(mousePos, btnOptions)) {
		
	}
	
	else if (isIntersectMenu(mousePos, btnExit)) {
		console.log("close");
	}
	
}

function startGame() {
	mainMenuOpen = false;
	endTimer = setInterval(endGameTimer, 1000);
	document.getElementById("inventory").style.visibility = "visible";
	document.getElementById("health").style.visibility = "visible";
	document.getElementById("timer").style.visibility = "visible";
}

function isIntersectMenu(point, elem) {
	if (point.x > elem.x && point.x < elem.x + elem.width && point.y > elem.y && point.y < elem.y + elem.height)
		return true;
	else
		return false;
}
