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
	"animationOperator": 1
};

var game = {
	"object": { 
		"player": player
	}
};

document.onkeydown = function(e) {
	e = e || window.event;

	switch (e.key) {
		case 'ArrowLeft':
			player.direction = e.key;
			player.isMoving = true;
			break;
		case 'ArrowRight':
			player.direction = e.key;
			player.isMoving = true;
			break;
		case 'ArrowUp':
			player.direction = e.key;
			player.isMoving = true;
			break;
		case 'ArrowDown':
			player.direction = e.key;
			player.isMoving = true;
			break;
		default:
			clearInterval(gameRefresh);
			return;
	}
}
