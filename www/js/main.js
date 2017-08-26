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

	var space = player.radius * 2;
	for (var x = 0; x + space < canvas.width; x += space) {
		for (var y = 0; y + space < canvas.height; y += space) {
			ctx.beginPath();
			ctx.rect(x,y, space, space);
			ctx.strokeStyle = "white";
			ctx.stroke();
			ctx.closePath();
		}
	}

	//var img = document.getElementById("level");
	//ctx.drawImage(img,0,0);
	
	//ctx.beginPath();
	//ctx.rect(21,21,150,150);
	//ctx.strokeStyle = "red";
	//ctx.stroke();
	//ctx.closePath();

	//ctx.beginPath();
	//ctx.rect(193,21,50,150);
	//ctx.strokeStyle = "red";
	//ctx.stroke();
	//ctx.closePath();

	//ctx.beginPath();
	//ctx.rect(21,193,150,150);
	//ctx.strokeStyle = "red";
	//ctx.stroke();
	//ctx.closePath();

	//ctx.beginPath();
	//ctx.rect(193,193,50,150);
	//ctx.strokeStyle = "red";
	//ctx.stroke();
	//ctx.closePath();
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
