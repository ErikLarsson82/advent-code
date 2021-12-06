
require('fs').readFile('./puzzle-input.txt', 'utf-8', (err, data) => {
	let lanternFish = data.trim().split(',').map(x=>parseInt(x))

	function tickDay() {
		const newLanternfish = []
		lanternFish.forEach((fish, idx) => {
			if (fish === 0) {
				newLanternfish.push(8)
				lanternFish[idx] = 6
			} else {
				lanternFish[idx] = fish - 1
			}
		})
		lanternFish = lanternFish.concat(newLanternfish)
	}

	const duration = 80

	for (var i = 0; i < duration; i++) {
		if (i % 10 === 0) {
			console.log('Running iteration', i)
		}
		tickDay()
	}
	console.log(`after ${duration} iterations`)
	console.log('amount', lanternFish.length)
})