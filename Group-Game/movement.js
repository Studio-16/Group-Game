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
	if (enemy.distance < 400) {
		aud_Monster.play();
		enemy.x += enemy.speedX;
		enemy.y += enemy.speedY;
	}
	else 
		aud_Monster.pause();
}

function checkCollision()
{
	if (player.x + player.xSize > foodPickup.x && player.x < foodPickup.x + 64 && player.y + player.ySize > foodPickup.y && player.y < foodPickup.y + 64)
	{
		if (!inventory.includes(foodPickup)) 
			if (!craftInv.includes(stickPickup))
				inventory.push(foodPickup);
	}

	if (player.x + player.xSize > treePickup.x && player.x < treePickup.x + 64 && player.y + player.ySize > treePickup.y && player.y < treePickup.y + 64)
	{
		if (!treePickup.used) {
				inventory.push(stickPickup);
				treePickup.used = true;
			}
	}		
	
	if (player.x + player.xSize > enemy.x + 20 && player.x < enemy.x + 28 && player.y + player.ySize > enemy.y + 28 && player.y < enemy.y + 50)
	{
		aud_Monster.pause();
		aud_Death.play();
		aud_Monster.loop = false;
		aud_Music.pause();
		clearInterval(updateInterval);
		clearInterval(endTimer);
		document.getElementById("endGame").style.color = "red";
		document.getElementById("endGame").innerHTML = "You Died...";
	}
	for (var ctr = 0; ctr < mapCollidable.length; ctr++) 
	{
		if (player.x + player.xSize > mapCollidable[ctr].x && player.x < mapCollidable[ctr].x + 64 && player.y + player.ySize > mapCollidable[ctr].y && player.y < mapCollidable[ctr].y + 64) 
		{
			player.x = oldPosition.x;
			player.y = oldPosition.y;
		}
	}	
	oldPosition.x = player.x;
	oldPosition.y = player.y;
}