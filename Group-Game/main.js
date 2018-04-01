var imgBackground = {}
imgBackground.image = new Image();
imgBackground.image.src = "img/mainMenu.png";

var btnWidth = 192;
var btnHeight = 64;
var barWidth = 256;

var btnPlay = {x: 175, y: 250}
btnPlay.image = new Image();
btnPlay.image.src = "img/btnBlank.png";

var btnLoad = {x: (canvas.width - 192 - btnPlay.x), y: btnPlay.y}
btnLoad.image = new Image();
btnLoad.image.src = "img/btnBlank.png";

var btnSave = {x: (canvas.width - 192 - btnPlay.x), y: btnPlay.y}
btnSave.image = new Image();
btnSave.image.src = "img/btnBlank.png";

var btnExit = {x: btnLoad.x, y: (canvas.height + 16 - btnPlay.y)}
btnExit.image = new Image();
btnExit.image.src = "img/btnBlank.png";

var btnOptions = {x: btnPlay.x, y: (canvas.height + 16 - btnPlay.y)}
btnOptions.image = new Image();
btnOptions.image.src = "img/btnBlank.png";


var barSFX = {x: (canvas.width - 256)/2, y: 100}
barSFX.image = new Image();
barSFX.image.src = "img/bar.png";

var fillSFX = {x: barSFX.x, y: barSFX.y}
fillSFX.image = new Image();
fillSFX.image.src = "img/barFill.png";

var barMusic = {x: barSFX.x, y: barSFX.y + 80}
barMusic.image = new Image();
barMusic.image.src = "img/bar.png";

var fillMusic = {x: barMusic.x, y: barMusic.y}
fillMusic.image = new Image();
fillMusic.image.src = "img/barFill.png";


var btnSFXDown = {x: barSFX.x - btnWidth - 16, y: barSFX.y}
btnSFXDown.image = new Image();
btnSFXDown.image.src = "img/btnBlank.png";

var btnSFXUp = {x: barSFX.x + barWidth + 16, y: btnSFXDown.y}
btnSFXUp.image = new Image();
btnSFXUp.image.src = "img/btnBlank.png";

var btnMusicDown = {x: barMusic.x - btnWidth - 16, y: btnSFXDown.y + 80}
btnMusicDown.image = new Image();
btnMusicDown.image.src = "img/btnBlank.png";

var btnMusicUp = {x: barMusic.x + barWidth + 16, y: btnMusicDown.y}
btnMusicUp.image = new Image();
btnMusicUp.image.src = "img/btnBlank.png";


var btnEN = {x: ((canvas.width - 192)/2) - 100, y: btnMusicDown.y + 96}
btnEN.image = new Image();
btnEN.image.src = "img/btnBlank.png";

var btnFR = {x: btnEN.x + 200, y: btnEN.y}
btnFR.image = new Image();
btnFR.image.src = "img/btnBlank.png";

var btnBack = {x: (canvas.width - 192)/2, y: btnEN.y + 112}
btnBack.image = new Image();
btnBack.image.src = "img/btnBlank.png";


var btnYes = {x: (elemRestart.width/2) - 192 - 16, y: (elemRestart.height/2) + 8}
btnYes.image = new Image();
btnYes.image.src = "img/btnBlank.png";

var btnNo = {x: (elemRestart.width/2) + 16, y: (elemRestart.height/2) + 8}
btnNo.image = new Image();
btnNo.image.src = "img/btnBlank.png";

var volSFX = 1.0;
var volMusic = 1.0;
var lang = "EN";

var mainMenuOpen = true;
var optMenuOpen = false;
var restartMenuOpen = false;
var pauseMenuOpen = false;

canvas.addEventListener("click", clickBtn);
elemRestart.addEventListener("click", clickBtn);
elemPause.addEventListener("click", clickBtn);

function clickBtn(event) {
	var mousePos = getMousePos(canvas, event);

	if (mainMenuOpen) {
		if (isIntersectMenu(mousePos, btnPlay)) {
			startGame();
		}
		
		else if (isIntersectMenu(mousePos, btnLoad)) {
			
		}
		
		else if (isIntersectMenu(mousePos, btnOptions)) {
			optMenuOpen = true;
			mainMenuOpen = false;
		}
		
		else if (isIntersectMenu(mousePos, btnExit)) {
			console.log("close");
			window.close();
		}
	}
	
	else if (optMenuOpen){
		if (isIntersectMenu(mousePos, btnSFXDown)) {
			volSFX -= 0.1;
			console.log(volSFX);
			if (volSFX < 0)
				volSFX = 0;
			updateSFX();
		}
		
		else if (isIntersectMenu(mousePos, btnSFXUp)) {
			volSFX += 0.1;
			if (volSFX >= 1.0)
				volSFX = 1.0;
			updateSFX();
		}
		
		else if (isIntersectMenu(mousePos, btnMusicDown)) {
			volMusic -= 0.1;
			if (volMusic < 0)
				volMusic = 0;
			updateMusic();
		}
		
		else if (isIntersectMenu(mousePos, btnMusicUp)) {
			volMusic += 0.1;
			if (volMusic > 1.0)
				volMusic = 1.0;
			updateMusic();
		}
		
		else if (isIntersectMenu(mousePos, btnEN)) {
			lang = "EN";
		}
		
		else if (isIntersectMenu(mousePos, btnFR)) {
			lang = "FR";
		}
		
		else if (isIntersectMenu(mousePos, btnBack)) {
			optMenuOpen = false;
			mainMenuOpen = true;
		}
	}
	
	else if (restartMenuOpen) {
		mousePos = getMousePos(elemRestart, event);
		if (isIntersectMenu(mousePos, btnYes))
			location.reload();
		
		else if (isIntersectMenu(mousePos, btnNo))
			window.close();
	}
	
	else if (pauseMenuOpen) {
		mousePos = getMousePos(elemPause, event);
		if (isIntersectMenu(mousePos, btnSave)) {
			var user;
			user = prompt("Please enter your name:","");
			if (user != "" && user != null)
				saveGame("username", user, 30);
		}
		
		else if (isIntersectMenu(mousePos, btnLoad)) {
			var test = loadGame("username");
			alert(test);
		}
		
		else if (isIntersectMenu(mousePos, btnExit))
			window.close();	
	}	
}

function saveGame(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function loadGame(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function startGame() {
	mainMenuOpen = false;
	endTimer = setInterval(endGameTimer, 1000);
	document.getElementById("inventory").style.visibility = "visible";
	document.getElementById("health").style.visibility = "visible";
	document.getElementById("timer").style.visibility = "visible";
}

function updateSFX() {
	sfx_Death.volume = 0.5 * volSFX;
	sfx_Enemy_Mushroom.volume = 0.5 * volSFX;
	sfx_Boomerang.volume = 0.5 * volSFX;
	sfx_Swing_1.volume = 0.5 * volSFX;
	sfx_Swing_2.volume = 0.5 * volSFX;
	sfx_Swing_3.volume = 0.5 * volSFX;
	sfx_Swing_Hit.volume = 0.5 * volSFX;
	sfx_Hurt.volume = 0.5 * volSFX;
	sfx_Eat.volume = 0.5 * volSFX;
	sfx_Craft.volume = 0.5 * volSFX;
	
	sfx_Hurt.play();
}

function updateMusic() {
	mus_Game.volume = 0.25 * volMusic;
	mus_Win.volume = 0.25 * volMusic;
	mus_Lose.volume = 0.25 * volMusic;
	mus_Menu.volume = 0.25 * volMusic;
	
}

function renderMenu () {
	surface.font = "bold 36px Arial";
	surface.textAlign = "center";
	surface.fillStyle = "black";
	
	if (mainMenuOpen) {
		surface.clearRect(0,0,canvas.width,canvas.height);
		surface.setTransform(1,0,0,1,0,0);
		
		surface.drawImage(imgBackground.image, 0, 0, 800, 600);
		surface.drawImage(btnPlay.image, btnPlay.x, btnPlay.y, btnWidth, btnHeight);
		surface.drawImage(btnLoad.image, btnLoad.x, btnLoad.y, btnWidth, btnHeight);
		surface.drawImage(btnOptions.image, btnOptions.x, btnOptions.y, btnWidth, btnHeight);
		surface.drawImage(btnExit.image, btnExit.x, btnExit.y, btnWidth, btnHeight)
		
		if (lang == "EN") {
			surface.fillText("PLAY", btnPlay.x + (btnWidth / 2), btnPlay.y + 45);
			surface.fillText("LOAD", btnLoad.x + (btnWidth / 2), btnLoad.y + 45);
			surface.fillText("OPTIONS", btnOptions.x + (btnWidth / 2), btnOptions.y + 45);
			surface.fillText("EXIT", btnExit.x + (btnWidth / 2), btnExit.y + 45);
		}
		
		else if (lang == "FR") {
			surface.fillText("JOUER", btnPlay.x + (btnWidth / 2), btnPlay.y + 45);
			surface.fillText("CHARGER", btnLoad.x + (btnWidth / 2), btnLoad.y + 45);
			surface.fillText("OPTIONS", btnOptions.x + (btnWidth / 2), btnOptions.y + 45);
			surface.fillText("SORTIR", btnExit.x + (btnWidth / 2), btnExit.y + 45);
		}
		
	}
	
	else if (optMenuOpen) {
		surface.clearRect(0,0,canvas.width,canvas.height);
		surface.setTransform(1,0,0,1,0,0);
		
		surface.drawImage(imgBackground.image, 0, 0, 800, 600);
		
		surface.drawImage(fillSFX.image, fillSFX.x, fillSFX.y, barWidth * volSFX, btnHeight);
		surface.drawImage(fillMusic.image, fillMusic.x, fillMusic.y, barWidth * volMusic, btnHeight);
		
		surface.drawImage(barSFX.image, barSFX.x, barSFX.y, barWidth, btnHeight);
		surface.drawImage(barMusic.image, barMusic.x, barMusic.y, barWidth, btnHeight);

		surface.drawImage(btnSFXDown.image, btnSFXDown.x, btnSFXDown.y, btnWidth, btnHeight);
		surface.drawImage(btnSFXUp.image, btnSFXUp.x, btnSFXUp.y, btnWidth, btnHeight);

		surface.drawImage(btnMusicDown.image, btnMusicDown.x, btnMusicDown.y, btnWidth, btnHeight);
		surface.drawImage(btnMusicUp.image, btnMusicUp.x, btnMusicUp.y, btnWidth, btnHeight);

		surface.drawImage(btnEN.image, btnEN.x, btnEN.y, btnWidth, btnHeight);
		surface.drawImage(btnFR.image, btnFR.x, btnFR.y, btnWidth, btnHeight);
		
		surface.drawImage(btnBack.image, btnBack.x, btnBack.y, btnWidth, btnHeight);

		surface.fillText("SFX -", btnSFXDown.x + (btnWidth / 2), btnSFXDown.y + 45);
		surface.fillText("SFX +", btnSFXUp.x + (btnWidth / 2), btnSFXUp.y + 45);

		
		if (lang == "EN") {
			surface.fillText("FR", btnFR.x + (btnWidth / 2), btnFR.y + 45);
			surface.fillText("MUSIC -", btnMusicDown.x + (btnWidth / 2), btnMusicDown.y + 45);
			surface.fillText("MUSIC +", btnMusicUp.x + (btnWidth / 2), btnMusicUp.y + 45);
			surface.fillText("BACK", btnBack.x + (btnWidth / 2), btnBack.y + 45);
			
			surface.fillStyle = "red";
			surface.fillText("EN", btnEN.x + (btnWidth / 2), btnEN.y + 45);
		}
		
		else if (lang == "FR") {
			surface.fillText("EN", btnEN.x + (btnWidth / 2), btnEN.y + 45);
			
			surface.font = "bold 28px Arial";
			surface.fillText("MUSIQUE -", btnMusicDown.x + (btnWidth / 2), btnMusicDown.y + 45);
			surface.fillText("MUSIQUE +", btnMusicUp.x + (btnWidth / 2), btnMusicUp.y + 45);
			surface.fillText("RETOURNER", btnBack.x + (btnWidth / 2), btnBack.y + 45);
			
			surface.font = "bold 36px Arial";
			surface.fillStyle = "red";
			surface.fillText("FR", btnFR.x + (btnWidth / 2), btnFR.y + 45);
		}
		
	}
}

function isIntersectMenu(point, elem) {
	if (point.x > elem.x && point.x < elem.x + btnWidth && point.y > elem.y && point.y < elem.y + btnHeight)
		return true;
	else
		return false;
}
