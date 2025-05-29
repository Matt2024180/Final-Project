const debugEl = document.getElementById('debug'),
			icon_width = 79,	// Width of the icons
			icon_height = 79,	// Height of one icon in the strip
			num_icons = 9,// Number of icons in the strip
			time_per_icon = 100,// Max-speed in ms for animating one icon down
			indexes = [0, 0, 0],// Holds icon indexes
			iconMap = ["banana", "seven", "cherry", "plum", "orange", "bell", "bar", "lemon", "melon"];// Mapping the indexes to the icons: starting from the banana in middle as the initial position and then upwards


const roll = (reel, offset = 0) => {
	const delta = (offset + 2) * num_icons + Math.round(Math.random() * num_icons); // Minimum of 2 + the reel offset rounds
		const style = getComputedStyle(reel),
					backgroundPositionY = parseFloat(style["background-position-y"]),// Current background position
					targetBackgroundPositionY = backgroundPositionY + delta * icon_height,// Target background position
					normTargetBackgroundPositionY = targetBackgroundPositionY%(num_icons * icon_height);// Normalized background position, for reset
		return new Promise((resolve, reject) => {// Return promise so we can wait for all reels to finish
		setTimeout(() => { 	// Delay animation with timeout, for some reason a delay in the animation property causes stutter

			reel.style.transition = `background-position-y ${(8 + 1 * delta) * time_per_icon}ms cubic-bezier(.41,-0.01,.63,1.09)`;// Set transition properties ==> https://cubic-bezier.com/#.41,-0.01,.63,1.09
			reel.style.backgroundPositionY = `${backgroundPositionY + delta * icon_height}px`;// Set background position
		}, offset * 150);
			
		
		setTimeout(() => { // After animation
			reel.style.transition = `none`;// Reset position, so that it doesn't get higher without limit
			reel.style.backgroundPositionY = `${normTargetBackgroundPositionY}px`;
			resolve(delta%num_icons);// Resolve this promise

		}, (8 + 1 * delta) * time_per_icon + offset * 150);
	});
};


function rollAll() {
	debugEl.textContent = 'rolling...';
	const reelsList = document.querySelectorAll('.slots > .reel');

  Promise
		.all( [...reelsList].map((reel, i) => roll(reel, i)) )// Activate each reel, must convert NodeList to Array for this with spread operator
		.then((deltas) => {// When all reels done animating (all promises solve)
			deltas.forEach((delta, i) => indexes[i] = (indexes[i] + delta)%num_icons);// add up indexes
			debugEl.textContent = indexes.map((i) => iconMap[i]).join(' - ');
			if (indexes[0] == indexes[1] || indexes[1] == indexes[2]) {// Check win conditions
		    console.log('WIN WIN WIN');
			}
			setTimeout(rollAll, 3000);// Again
		});
};
setTimeout(rollAll, 1000);// Kickoff
