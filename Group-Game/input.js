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
