var cv = document.getElementById('canvas');
var ctx = cv.getContext('2d');
var canvas = ctx.canvas;


var dots = {
	"small": {
		"radius": 2,
		"location": (function() {
			var locs = [];
 /*     for (var x = 0; x < canvas.width; x+=10) {*/
				//for (var y = 0; y < canvas.height; y+=10) {
					//locs.push([x,y]);
				//}
			/*}*/
			return locs;
		})()
	}
}

document.onkeydown = function(e) {
	e = e || window.event;

	switch (e.code) {
		case 'ArrowLeft':
			setPlayerVector(e.key);
			break;
		case 'ArrowRight':
			setPlayerVector(e.key);
			break;
		case 'ArrowUp':
			setPlayerVector(e.key);
			break;
		case 'ArrowDown':
			setPlayerVector(e.key);
			break;
		case 'Space':
			clearInterval(gameRefresh);
			break;
		default:
			return;
	}

}

function setPlayerVector(newDirection) {

	var newPathBlocked = enforceBounds(newDirection, 1);
	var currentPathBlocked = enforceBounds(player.direction, 1);

	if (newPathBlocked && ! player.isMoving) {
		newDirection = player.direction;
	}
	player.direction = newDirection;
	if (! newPathBlocked || ! currentPathBlocked)
		player.isMoving = true;
}

function loc2Quad(loc, newDirection) {

	var space = player.radius;
	var xCenter = loc[0] - space/2;
	var yCenter = loc[1] - space/2;

	var xNew = xCenter; var yNew = yCenter;

	switch (newDirection) {
		case 'ArrowLeft':
			xNew -= space/2;
			xNew = Math.round( xNew / space ) * space;
			break;
		case 'ArrowRight':
			xNew += space/2;
			xNew = Math.round( xNew / space ) * space;
			break;
		case 'ArrowUp':
			yNew -= space/2;
			yNew = Math.round( yNew / space ) * space;
			break;
		case 'ArrowDown':
			yNew += space/2;
			yNew = Math.round( yNew / space ) * space;
			break;
		default:
			break;
	}

 /* xQuad = parseInt(xNew/space);*/
	/*yQuad = parseInt(yNew/space);*/

	var x = parseInt( xNew / space );
	var y = parseInt( yNew / space );

	var xNewTest = Math.round(xNew / space);
	var yNewTest = Math.round(yNew / space);

	ctx.beginPath();
	ctx.rect(xNewTest * space, yNewTest * space, space, space);
	ctx.fillStyle = "white";
	ctx.fill();
	ctx.closePath();

 /* ctx.beginPath();*/
	//ctx.rect(x * space, y * space, space, space);
	//ctx.fillStyle = "white";
	//ctx.fill();
	/*ctx.closePath();*/

	console.log('xNewTest: ' + xNewTest + ' ' + yNewTest + ' ' + openQuadrants[xNewTest+","+yNewTest]);

	
	if (openQuadrants[xNewTest+","+yNewTest]) {
		console.log('next quadrant is open');
		return false;
	} else {
		return true;
	}
}

var openQuadrants = {};

for (var x = 1; x <= 12; x++) openQuadrants[x+",4"] = 1;
for (var x = 15; x <= 26; x++) openQuadrants[x+",4"] = 1;
for (var arr = [1, 6, 12, 15, 21, 26], i = 0; i < arr.length; i++ ) {
	openQuadrants[arr[i]+",5"] = 1;
	openQuadrants[arr[i]+",6"] = 1;
	openQuadrants[arr[i]+",7"] = 1;
}
for (var x = 1; x <= 26; x++) openQuadrants[x+",8"] = 1;
for (var arr = [1, 6, 9, 18, 21, 26], i = 0; i < arr.length; i++ ) {
	openQuadrants[arr[i]+",9"] = 1;
	openQuadrants[arr[i]+",10"] = 1;
}
for (var x = 1; x <= 6; x++) openQuadrants[x+",11"] = 1;
for (var x = 9; x <= 12; x++) openQuadrants[x+",11"] = 1;
for (var x = 15; x <= 18; x++) openQuadrants[x+",11"] = 1;
for (var x = 21; x <= 26; x++) openQuadrants[x+",11"] = 1;
for (var arr = [6, 12, 15, 21], i = 0; i < arr.length; i++ ) {
	openQuadrants[arr[i]+",12"] = 1;
	openQuadrants[arr[i]+",13"] = 1;
}
for (var arr = [6, 21], i = 0; i < arr.length; i++ ) 
	openQuadrants[arr[i]+",14"] = 1;
for (var x = 9; x <= 18; x++) openQuadrants[x+",14"] = 1;
for (var arr = [6, 9, 18, 21], i = 0; i < arr.length; i++ ) {
	openQuadrants[arr[i]+",15"] = 1;
	openQuadrants[arr[i]+",16"] = 1;
}

for (var x = 0; x <= 9; x++) openQuadrants[x+",17"] = 1;
for (var x = 18; x <= 27; x++) openQuadrants[x+",17"] = 1;

for (var arr = [6, 9, 18, 21], i = 0; i < arr.length; i++ ) {
	openQuadrants[arr[i]+",18"] = 1;
	openQuadrants[arr[i]+",19"] = 1;
}
for (var x = 9; x <= 18; x++) openQuadrants[x+",20"] = 1;
for (var arr = [6, 21], i = 0; i < arr.length; i++ ) 
	openQuadrants[arr[i]+",20"] = 1;
for (var arr = [6, 9, 18, 21], i = 0; i < arr.length; i++ ) {
	openQuadrants[arr[i]+",21"] = 1;
	openQuadrants[arr[i]+",22"] = 1;
}
for (var x = 1; x <= 12; x++) openQuadrants[x+",23"] = 1;
for (var x = 15; x <= 26; x++) openQuadrants[x+",23"] = 1;
for (var arr = [1, 6, 12, 15, 21, 26], i = 0; i < arr.length; i++ ) {
	openQuadrants[arr[i]+",24"] = 1;
	openQuadrants[arr[i]+",25"] = 1;
}
for (var x = 1; x <= 3; x++) openQuadrants[x+",26"] = 1;
for (var x = 6; x <= 21; x++) openQuadrants[x+",26"] = 1;
for (var x = 24; x <= 26; x++) openQuadrants[x+",26"] = 1;
for (var arr = [3, 6, 9, 18, 21, 24], i = 0; i < arr.length; i++ ) {
	openQuadrants[arr[i]+",27"] = 1;
	openQuadrants[arr[i]+",28"] = 1;
}
