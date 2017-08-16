function drawPlayer() {
	var loc = getPlayerLoc();
	drawPlayerBody(loc);
}

function checkPlayerCollision(objLoc, objRadius) {
	var loc = player.location;
	var rad = player.radius;
	var playerWidthBounds =  [loc[0] - rad, loc[0] + rad];
	var playerHeightBounds = [loc[1] - rad, loc[1] + rad];

	if ( (objLoc[0] + objRadius >= playerWidthBounds[0] && 
			  objLoc[0] + objRadius <= playerWidthBounds[1]
			 ) 
				&&
			 (objLoc[1] + objRadius >= playerHeightBounds[0] &&  
			 	objLoc[1] + objRadius <= playerHeightBounds[1]
			 )
	) {
		return true;
	} else { return false; }
}

function drawPlayerBody(loc) {
	animatePlayerMouth();

	ctx.beginPath();
	var centerX = loc[0];
	var centerY = loc[1];
	ctx.moveTo(centerX, centerY);

	var mouthArc = getMouthArc();
	var arcStart = mouthArc[0];
	var arcStop = mouthArc[1];

	var counterclockwise = false;
	ctx.arc(centerX, centerY, player.radius, arcStart, arcStop, counterclockwise);
	ctx.fillStyle = 'yellow';
	ctx.fill();
	ctx.closePath();
}

function getMouthArc() {
	var dir = player.direction;
	var degree = 0;

	var none = [degree, deg2rad(360)];

	if (! dir) return none;

	if (dir == 'ArrowLeft')  { degree = 180; }
	if (dir == 'ArrowRight') { degree = 360; }
	if (dir == 'ArrowUp')    { degree = 270; }
	if (dir == 'ArrowDown')  { degree = 90; }

	var mouthSize = 30 * player.animationFrame;

	var startDegree = degree + mouthSize/2;
	var stopDegree = degree - mouthSize/2;

	if (startDegree == stopDegree) stopDegree += 360;

	return [ deg2rad(startDegree), deg2rad(stopDegree) ];
}

function animatePlayerMouth() {
	if (! player.isMoving) return;
	player.animationFrame += player.animationOperator;
	if (player.animationFrame > 3) player.animationOperator = -1;
	if (player.animationFrame < 1) player.animationOperator = 1;
}

function getPlayerLoc() {
	var loc = player.location;
	var dir = player.direction;
	var movement = 2;

	if (dir == 'ArrowLeft')  { loc[0] -= movement; }
	if (dir == 'ArrowRight') { loc[0] += movement; }
	if (dir == 'ArrowUp')    { loc[1] -= movement; }
	if (dir == 'ArrowDown')  { loc[1] += movement; }

	enforceBounds(player.direction);

	return loc;
}

function enforceBounds(direction) {
	var loc = player.location;
	var radius = player.radius;
	var leftBound = 0 + radius;
	var lowerBound = leftBound;
	var rightBound = canvas.width - radius;
	var upperBound = canvas.height - radius;

	switch(direction) {
		case('ArrowUp'):
			if (loc[1] <= lowerBound) {
				loc[1] = lowerBound;
				player.isMoving = false; 
				player.isBounded = true;
				return true;
			}
			break;
		case('ArrowDown'):
			if (loc[1] >= upperBound) {
				loc[1] = upperBound;
				player.isMoving = false; 
				player.isBounded = true;
				return true;
			}
			break;
		case('ArrowLeft'):
			if (loc[0] <= leftBound) {
				loc[0] = leftBound;
				player.isMoving = false; 
				player.isBounded = true;
				return true;
			}
			break;
		case('ArrowRight'):
			if (loc[0] >= rightBound) { 
				loc[0] = rightBound;
				player.isMoving = false; 
				player.isBounded = true;
				return true;
			}
			break;
		default:
			return false;
	}
}
