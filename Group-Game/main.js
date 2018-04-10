var imgBackground = {}
imgBackground.image = new Image();
imgBackground.image.src = "img/mainMenu.png";

var btnWidth = 192;
var btnHeight = 64;
var barWidth = 256;


var btnPlay = {x: 175, y: 250}
btnPlay.image = new Image();
btnPlay.image.src = "img/btnBlank.png";

var btnControls = {x: (canvas.width - 192 - btnPlay.x), y: btnPlay.y}
btnControls.image = new Image();
btnControls.image.src = "img/btnBlank.png";

var btnExit = {x: btnControls.x, y: (canvas.height + 16 - btnPlay.y)}
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


var boxCtrls = {x: (canvas.width/2) - 150, y: (canvas.height/2) - 275}
boxCtrls.image = new Image();
boxCtrls.image.src = "img/boxCtrls.png";


var btnPauseControls = {x: elemPause.width/2 - btnWidth/2, y: 64}
btnPauseControls.image = new Image();
btnPauseControls.image.src = "img/btnBlank.png";

var btnPauseOptions = {x: elemPause.width/2 - btnWidth/2, y: 160}
btnPauseOptions.image = new Image();
btnPauseOptions.image.src = "img/btnBlank.png";

var btnPauseExit = {x: elemPause.width/2 - btnWidth/2, y: 256}
btnPauseExit.image = new Image();
btnPauseExit.image.src = "img/btnBlank.png";


var volSFX = 1.0;
var volMusic = 1.0;
var lang = "EN";

var mainMenuOpen = true;
var optMenuOpen = false;
var restartMenuOpen = false;
var pauseMenuOpen = false;
var controlsMenuOpen = false;

canvas.addEventListener("click", clickBtn);
elemRestart.addEventListener("click", clickBtn);
elemPause.addEventListener("click", clickBtn);

function clickBtn(event) {
	var mousePos = getMousePos(canvas, event);

	if (mainMenuOpen) {
		if (isIntersectMenu(mousePos, btnPlay)) {
			startGame();
		}
		
		else if (isIntersectMenu(mousePos, btnControls)) {
			controlsMenuOpen = true;
			mainMenuOpen = false;
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
			if (pauseMenuOpen) {
				optMenuOpen = false;
				pauseMenuOpen = false;
			}
			
			else {
				optMenuOpen = false;
				mainMenuOpen = true;
			}
		}
	}
	
	else if (restartMenuOpen) {
		mousePos = getMousePos(elemRestart, event);
		
		if (isIntersectMenu(mousePos, btnYes))
			location.reload();
		
		else if (isIntersectMenu(mousePos, btnNo))
			window.close();
	}
	
	else if (controlsMenuOpen) {
		if (isIntersectMenu(mousePos, btnBack)) {
			if (pauseMenuOpen) {
				controlsMenuOpen = false;
				pauseMenuOpen = false;
			}
			
			else {
				optMenuOpen = false;
				controlsMenuOpen = false;
				mainMenuOpen = true;
			}
		}
	}
	
	else if (pauseMenuOpen) {
		mousePos = getMousePos(elemPause, event);
		
		if (isIntersectMenu(mousePos, btnPauseControls)) {
			controlsMenuOpen = true;
			elemPause.style.visibility = "hidden";
		}
		
		else if (isIntersectMenu(mousePos, btnPauseOptions)) {
			optMenuOpen = true;
			elemPause.style.visibility = "hidden";
		}
		
		else if (isIntersectMenu(mousePos, btnPauseExit))
			window.close();	
	}	
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
	surface.clearRect(0,0,canvas.width,canvas.height);
	surface.setTransform(1,0,0,1,0,0);
		
	surface.drawImage(imgBackground.image, 0, 0, 800, 600);
	
	if (mainMenuOpen) {
		surface.drawImage(btnPlay.image, btnPlay.x, btnPlay.y, btnWidth, btnHeight);
		surface.drawImage(btnControls.image, btnControls.x, btnControls.y, btnWidth, btnHeight);
		surface.drawImage(btnOptions.image, btnOptions.x, btnOptions.y, btnWidth, btnHeight);
		surface.drawImage(btnExit.image, btnExit.x, btnExit.y, btnWidth, btnHeight)
		
		if (lang == "EN") {
			surface.fillText("PLAY", btnPlay.x + (btnWidth / 2), btnPlay.y + 45);
			surface.font = "bold 32px Arial";
			surface.fillText("CONTROLS", btnControls.x + (btnWidth / 2), btnControls.y + 45);
			surface.font = "bold 36px Arial";
			surface.fillText("OPTIONS", btnOptions.x + (btnWidth / 2), btnOptions.y + 45);
			surface.fillText("EXIT", btnExit.x + (btnWidth / 2), btnExit.y + 45);
		}
		
		else if (lang == "FR") {
			surface.fillText("JOUER", btnPlay.x + (btnWidth / 2), btnPlay.y + 45);
			surface.font = "bold 28px Arial";
			surface.fillText("CONTRÔLES", btnControls.x + (btnWidth / 2), btnControls.y + 45);
			surface.font = "bold 36px Arial";
			surface.fillText("OPTIONS", btnOptions.x + (btnWidth / 2), btnOptions.y + 45);
			surface.fillText("SORTIR", btnExit.x + (btnWidth / 2), btnExit.y + 45);
		}
		
	}
	else if (optMenuOpen) {		
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
	else if (controlsMenuOpen) {
		surface.drawImage(boxCtrls.image, boxCtrls.x, boxCtrls.y, 300, 350);
		surface.drawImage(btnBack.image, btnBack.x, btnBack.y, btnWidth, btnHeight);
		
		if (lang == "EN") {
			surface.fillText("CONTROLS", canvas.width/2 , boxCtrls.y + 64)
			
			surface.font = "bold 20px Arial";
			surface.fillText("MOVEMENT : W A S D", canvas.width/2 , boxCtrls.y + 128);
			surface.fillText("INTERACT : F", canvas.width/2 , boxCtrls.y + 160);
			surface.fillText("CRAFT : E", canvas.width/2 , boxCtrls.y + 192);
			surface.fillText("ATTACK : SPACE", canvas.width/2 , boxCtrls.y + 224);
			surface.fillText("BOOMERANG : LEFT CLICK", canvas.width/2 , boxCtrls.y + 256);
			surface.fillText("PAUSE : Q", canvas.width/2 , boxCtrls.y + 288);
			
			surface.font = "bold 36px Arial";
			surface.fillText("BACK", btnBack.x + (btnWidth/2), btnBack.y + 45);
		}
		
		else if (lang == "FR") {
			surface.fillText("CONTRÔLES", canvas.width/2 , boxCtrls.y + 64)
			
			surface.font = "bold 20px Arial";
			surface.fillText("MOUVEMENT : W A S D", canvas.width/2 , boxCtrls.y + 128);
			surface.fillText("INTERAGIR : F", canvas.width/2 , boxCtrls.y + 160);
			surface.fillText("CRÉER : E", canvas.width/2 , boxCtrls.y + 192);
			surface.fillText("ATTAQUER : SPACE", canvas.width/2 , boxCtrls.y + 224);
			surface.fillText("BOOMERANG : LEFT CLICK", canvas.width/2 , boxCtrls.y + 256);
			surface.fillText("PAUSER : Q", canvas.width/2 , boxCtrls.y + 288);
			
			surface.font = "bold 28px Arial";
			surface.fillText("RETOURNER", btnBack.x + (btnWidth / 2), btnBack.y + 45);
			
			
		}
		
	}
}


function isIntersectMenu(point, elem) {
	if (point.x > elem.x && point.x < elem.x + btnWidth && point.y > elem.y && point.y < elem.y + btnHeight)
		return true;
	else
		return false;
}
