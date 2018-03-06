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
	
	if (player.x + player.xSize > boomerang.x && player.x < boomerang.x + boomerang.size && player.y + player.ySize > boomerang.y && player.y < boomerang.y + boomerang.size && boomerang.timeThrown > 0.2)
	{
		boomerang.thrown = false;
		clearInterval(boomerangTime);
		boomerang.timeThrown = 0;
		console.log("Collide With Boomerang");
	}
	if (boomerang.x + boomerang.size > enemy.x + 20 && boomerang.x < enemy.x + 28 && boomerang.y + boomerang.size > enemy.y + 28 && boomerang.y < enemy.y + 50 && boomerang.thrown == true && enemy.stun == false)
	{
		boomerang.timeThrown = 1;
		enemy.stun = true;
		timeStunned = setInterval(stunTimer, 1000);
		console.log("Boomerang Hit Enemy");
	}
}