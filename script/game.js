let canvas;
let gameActive = true;
let character = new Image();
let ctx;

/**
 * Initialize the game.
 */
function init() {
    canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');
		character.src = './img/pepe/pepe_walk/W-21.png';

	setTimeout (function(){
		ctx.drawImage(character, 20, 20, 50, 120);
	
	}, 3000);
	


function resetAnimationFrameId() {
    if (requestAnimationFrameId !== 0) {
        cancelAnimationFrame(requestAnimationFrameId);
    }
    requestAnimationFrameId = 0;
}

function addInterval(interval) {
    intervals.push(interval);
}

function stopAllIntervals() {
    resetAnimationFrameId();
    intervals.forEach((intervalId) => {
        clearInterval(intervalId);
    });
    intervals = [];
}


}