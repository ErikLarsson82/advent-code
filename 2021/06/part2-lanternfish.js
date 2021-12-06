
require('fs').readFile('./puzzle-input.txt', 'utf-8', (err, data) => {
	const lanternFish = data.trim().split(',').map(x=>parseInt(x))
	
	const status = {
		0: lanternFish.filter(x => x === 0).length,
		1: lanternFish.filter(x => x === 1).length,
		2: lanternFish.filter(x => x === 2).length,
		3: lanternFish.filter(x => x === 3).length,
		4: lanternFish.filter(x => x === 4).length,
		5: lanternFish.filter(x => x === 5).length,
		6: lanternFish.filter(x => x === 6).length,
		7: lanternFish.filter(x => x === 7).length,
		8: lanternFish.filter(x => x === 8).length,
	}

	function tickDay() {
		let newborns = status[0]
		status[0] = status[1]
		status[1] = status[2]
		status[2] = status[3]
		status[3] = status[4]
		status[4] = status[5]
		status[5] = status[6]
		status[6] = status[7] + newborns
		status[7] = status[8]
		status[8] = newborns
	}

	const duration = 256

	printStatus()
	for (var i = 0; i < duration; i++) {
		console.log('\n')
		if (i % 10 === 0) {
			console.log('Running iteration', i)
		}		
		tickDay()
		printStatus()
	}
	console.log(`after ${duration} iterations`)
	console.log('amount', sum())

	function sum() {
		return status[0] + status[1] + status[2] + status[3] + status[4] + status[5] + status[6] + status[7] + status[8]
	}
	function printStatus() {
		for (s in status) {
			console.log(s, status[s])
		}
	}
})
