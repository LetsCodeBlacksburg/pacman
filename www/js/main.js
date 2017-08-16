function main() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawDots();
	drawPlayer();
}

function drawDots() {
	var smallDots = dots.small;
	for (var i = 0; i < smallDots.location.length; i++) {
		var loc = smallDots.location[i];

		if ( checkPlayerCollision(loc, smallDots.radius) )
			return smallDots.location.splice(i,1);

		ctx.beginPath();
		var centerX = loc[0];
		var centerY = loc[1];
		ctx.moveTo(centerX, centerY);

		var arcStart = 0;
		var arcStop = deg2rad(360);

		var counterclockwise = false;
		ctx.arc(centerX, centerY, smallDots.radius, arcStart, arcStop, counterclockwise);
		ctx.fillStyle = 'white';
		ctx.fill();
		ctx.closePath();
	}
}

function deg2rad(deg) { 
	return deg * Math.PI / 180;
}
