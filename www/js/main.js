var game = {
	"object": { 
		"player": player,
		"dot":    dots,
	}
};

function main() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBackground();

	drawDots();
	drawPlayer();
}
var gameRefresh = setInterval(main, 33);

function drawBackground() {

	var img = document.getElementById("level");
	ctx.drawImage(img,0,0);

	drawGameGrid();
}

function drawGameGrid(debug) {

	ctx.strokeStyle = "grey";

	var space = player.radius;

	for (var x = 0; x + space <= canvas.width; x += space) {
		for (var y = 0; y + space <= canvas.height; y += space) {
			ctx.beginPath();
			ctx.rect(x,y, space, space);
			ctx.stroke();
			ctx.closePath();
		}
	}

	ctx.fillStyle = "red";

 for (var quad in openQuadrants) {
		var loc = quad.split(",");

		ctx.beginPath();
		ctx.globalAlpha = 0.5;
		ctx.rect(loc[0] * space, loc[1] * space, space, space);
		ctx.fill();
		ctx.globalAlpha = 1;
		ctx.closePath();
	}

	ctx.fillStyle = "green";
	ctx.beginPath();
	ctx.globalAlpha = 0.5;
	ctx.rect(13.5 * space, 26 * space, space, space);
	ctx.fill();
	ctx.globalAlpha = 1;
	ctx.closePath();
}

function drawDots() {
	var smallDots = dots.small;
	var remaining = [];
	for (var i = 0; i < smallDots.location.length; i++) {
		var loc = smallDots.location[i];

		if ( checkPlayerCollision(loc, smallDots.radius) ) continue;

		remaining.push(loc);

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
	smallDots.location = remaining;
}

function deg2rad(deg) { 
	return deg * Math.PI / 180;
}
