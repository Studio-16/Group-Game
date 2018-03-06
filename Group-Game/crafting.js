function craftItem(item1, item2) {
	if ((item1 == foodPickup && item2 == stickPickup) || (item1 == stickPickup && item2 == foodPickup)) {
		craftInv.push(axePickup);
	}
	
	else 
		craftInv.pop();
}


