

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

	//player.isBounded = false;
}

function setPlayerVector(newDirection) {
	var newPathBlocked = enforceBounds(newDirection, 1);
	var currentPathBlocked = enforceBounds(player.direction, 1);
	console.log('newpath '+newDirection+' blocked? '+newPathBlocked+' curpath '+player.direction+' blocked? '+currentPathBlocked);
	if (newPathBlocked && ! player.isMoving) {
		newDirection = player.direction;
	}
	player.direction = newDirection;
	if (! newPathBlocked || ! currentPathBlocked)
		player.isMoving = true;
}
