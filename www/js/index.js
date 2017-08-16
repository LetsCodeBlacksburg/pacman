var gameRefresh = setInterval(main, 33);


var cv = document.getElementById('canvas');
var ctx = cv.getContext('2d');
var canvas = ctx.canvas;

var player = {
	"radius": 10,
	"direction": undefined,
	"isMoving": false,
	"location": [canvas.width/2, canvas.height/2],
	"animationFrame": 0,
	"isBounded": false,
	"animationOperator": 1
};

var dots = {
	"small": {
		"radius": 2,
		"location": [ 
			[168, 150], [168, 160], [168, 170], [168, 180], [168, 190] 
		]
	}
}

var game = {
	"object": { 
		"player": player,
		"dot":    dots,
	}
};

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

	player.isBounded = false;
}

function setPlayerVector(direction) {
	if (enforceBounds(direction) && player.isBounded) {
		direction = player.direction;
	}
	player.direction = direction;
	player.isMoving = true;
}
