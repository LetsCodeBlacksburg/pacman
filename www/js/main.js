function main() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawPlayer();
}

function drawPlayer() {
	var loc = getPlayerLoc();
	drawPlayerBody(loc);
	//drawPlayerMouth(loc);
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

	enforceBounds(loc);

	return loc;
}

function enforceBounds(loc) {
	var radius = player.radius;
	var leftBound = 0 + radius;
	var lowerBound = leftBound;
	var rightBound = canvas.width - radius;
	var upperBound = canvas.height - radius;

  if (loc[0] <= leftBound)  { 
		loc[0] = leftBound; 
		if (player.direction == 'ArrowLeft') player.isMoving = false;
	}
	if (loc[0] >= rightBound) { 
		loc[0] = rightBound; 
		if (player.direction == 'ArrowRight') player.isMoving = false;
	}
  if (loc[1] <= lowerBound) { 
		loc[1] = lowerBound; 
		if (player.direction == 'ArrowUp') player.isMoving = false;
	}
  if (loc[1] >= upperBound) { 
		loc[1] = upperBound; 
		if (player.direction == 'ArrowDown') player.isMoving = false;
	}
}

function deg2rad(deg) { 
	return deg * Math.PI / 180;
}
