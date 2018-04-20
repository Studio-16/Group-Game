var boss_Flower = {speed:.2, x:1700, y:1700, dx:0, dy:0, angle:0, distance:0, xSpeed:0, ySpeed:0, frame:0, dir:1, currentFrame:0, maxFrames:60, health: 3, attackable: true, stun:false, dead:false, stunTime:0, open: true, idle:false, oldPosX:0, oldPosY:0, size:96}
boss_Flower.image = new Image();
boss_Flower.image.src = "img/boss_Flower_Open.png";

var boss_Flower_Seed_1 = {x:1500, y:1500, angle:0, size:32}
boss_Flower_Seed_1.image = new Image();
boss_Flower_Seed_1.image.src = "img/boss_Flower_Seed.png";

var boss_Flower_Seed_2 = {x:1500, y:1500, angle:90, size:32}
boss_Flower_Seed_2.image = new Image();
boss_Flower_Seed_2.image.src = "img/boss_Flower_Seed.png";

var boss_Flower_Seed_3 = {x:1500, y:1500, angle:180, size:32}
boss_Flower_Seed_3.image = new Image();
boss_Flower_Seed_3.image.src = "img/boss_Flower_Seed.png";

var timeOpen;
var timeAttack;

timeOpen = setInterval(openFlower, 7000);


function openFlower()
{
	boss_Flower.open = !boss_Flower.open;
	
	if (boss_Flower.open) 
		boss_Flower.image.src = "img/boss_Flower_Open.png";
	
	else
		boss_Flower.image.src = "img/boss_Flower_Closed.png";
}

function boss_Movement()
{
	boss_Flower.dx = player.x - boss_Flower.x;
	boss_Flower.dy = player.y - boss_Flower.y;
	boss_Flower.distance = Math.sqrt(boss_Flower.dx*boss_Flower.dx + boss_Flower.dy*boss_Flower.dy);
	boss_Flower.angle = Math.atan2(boss_Flower.dy, boss_Flower.dx)* 180/Math.PI;
	boss_Flower.xSpeed = boss_Flower.speed * (boss_Flower.dx / boss_Flower.distance);
	boss_Flower.ySpeed = boss_Flower.speed * (boss_Flower.dy / boss_Flower.distance);
	if (boss_Flower.distance < 500 && boss_Flower.stun == false && boss_Flower.dead == false)
	{
		if (Math.abs(boss_Flower.xSpeed) > Math.abs(boss_Flower.ySpeed) && boss_Flower.xSpeed > 0)
		{
			boss_Flower.dir = 1;
		}
		else if (Math.abs(boss_Flower.xSpeed) > Math.abs(boss_Flower.ySpeed) && boss_Flower.xSpeed < 0)
		{
			boss_Flower.dir = 3;
		}
		else if (Math.abs(boss_Flower.xSpeed) < Math.abs(boss_Flower.ySpeed) && boss_Flower.ySpeed > 0)
		{
			boss_Flower.dir = 2;
		}
		else if (Math.abs(boss_Flower.xSpeed) < Math.abs(boss_Flower.ySpeed) && boss_Flower.ySpeed < 0)
		{
			boss_Flower.dir = 0;
		}		
		boss_Flower.idle = false;
		boss_Flower.x += boss_Flower.xSpeed;
		boss_Flower.y += boss_Flower.ySpeed;
	}
	
	seed_Movement();
}

function seed_Movement() {
	
	boss_Flower_Seed_1.x = (boss_Flower.x + 48) + (96 * Math.cos(boss_Flower_Seed_1.angle));
	boss_Flower_Seed_1.y = (boss_Flower.y + 48) + (96 * Math.sin(boss_Flower_Seed_1.angle));
	boss_Flower_Seed_1.angle += 0.005;
	
	boss_Flower_Seed_2.x = (boss_Flower.x + 48) + (96 * Math.cos(boss_Flower_Seed_2.angle));
	boss_Flower_Seed_2.y = (boss_Flower.y + 48) + (96 * Math.sin(boss_Flower_Seed_2.angle));
	boss_Flower_Seed_2.angle += 0.005;
	
	boss_Flower_Seed_3.x = (boss_Flower.x + 48) + (96 * Math.cos(boss_Flower_Seed_3.angle));
	boss_Flower_Seed_3.y = (boss_Flower.y + 48) + (96 * Math.sin(boss_Flower_Seed_3.angle));
	boss_Flower_Seed_3.angle += 0.005;
	
}

function boss_Collision() {
	
	if (player.x + player.xSize > boss_Flower.x + 40 && player.x < boss_Flower.x + 48 && player.y + player.ySize > boss_Flower.y + 20 && player.y < boss_Flower.y + 80 && boss_Flower.dead == false)
	{	
		playerHealth--;
		player.x += boss_Flower.xSpeed*400;
		player.y += boss_Flower.ySpeed*400;	
	}
	
	else if (player.x + player.xSize > boss_Flower_Seed_1.x + 20 && player.x < boss_Flower_Seed_1.x + 20 && player.y + player.ySize > boss_Flower_Seed_1.y + 20 && player.y < boss_Flower_Seed_1.y + 20)
	{	
		playerHealth--;
		player.x += boss_Flower.xSpeed*400;
		player.y += boss_Flower.ySpeed*400;	
	}
	
	else if (player.x + player.xSize > boss_Flower_Seed_2.x + 20 && player.x < boss_Flower_Seed_2.x + 20 && player.y + player.ySize > boss_Flower_Seed_2.y + 20 && player.y < boss_Flower_Seed_2.y + 20)
	{	
		playerHealth--;
		player.x += boss_Flower.xSpeed*400;
		player.y += boss_Flower.ySpeed*400;	
	}
	
	else if (player.x + player.xSize > boss_Flower_Seed_3.x + 20 && player.x < boss_Flower_Seed_3.x + 20 && player.y + player.ySize > boss_Flower_Seed_3.y + 20 && player.y < boss_Flower_Seed_3.y + 20)
	{	
		playerHealth--;
		player.x += boss_Flower.xSpeed*400;
		player.y += boss_Flower.ySpeed*400;	
	}
	
	if (boomerang.x + boomerang.size > boss_Flower.x + 40 && boomerang.x < boss_Flower.x + 48 && boomerang.y + boomerang.size > boss_Flower.y + 20 && boomerang.y < boss_Flower.y + 80 && boomerang.thrown == true && boss_Flower.stun == false && boss_Flower.open == true)
	{
		//aud_Monster.pause();
		boomerang.timeThrown = 1;
		boss_Flower.stun = true;
		timeStunned = setInterval(stunTimer, 1000);
		console.log("Boomerang Hit Boss");
	}

	if (player.x + weapon.dirX + weapon.xSize > boss_Flower.x + 40 && player.x + weapon.dirX < boss_Flower.x + 48 && player.y + weapon.dirY + weapon.ySize > boss_Flower.y + 20 && player.y + weapon.dirY < boss_Flower.y + 80 && weapon.attack == true && boss_Flower.open == true && boss_Flower.attackable == true)
	{
		boss_Flower.health--;
		boss_Flower.attackable = false;
		timeAttack = setTimeout(function() {boss_Flower.attackable = true;}, 500);
		
		if (boss_Flower.health <= 0)
			boss_Flower.dead = true;
		
	}
}

function boss_Animate()
{
	if (boss_Flower.idle == false)
	{
		boss_Flower.currentFrame++;
		if (boss_Flower.currentFrame == boss_Flower.maxFrames)
		{
			boss_Flower.frame++;
			boss_Flower.currentFrame = 0;
			if (boss_Flower.frame == 3)
				boss_Flower.frame = 0;
		}
	}
}
