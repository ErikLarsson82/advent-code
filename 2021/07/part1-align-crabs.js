require('fs').readFile('./puzzle-input.txt', 'utf-8', (err, data) => {

	const exampleCrabs = [16,1,2,0,4,2,7,1,2,14]

	const crabs = data.trim().split(',').map(x=>parseInt(x))

	const least = Math.min(...crabs)
	const most = Math.max(...crabs)

	const fuelRequired = []

	for (let i = least; i <= most; i++) {
		fuelRequired[i] = alignCrabs(i)
	}

	function alignCrabs(spot) {
		let fuel = 0
		const movers = [...crabs]
		movers.forEach(crab => {
			if (spot === crab) return

			if (spot > crab) {
				fuel += spot - crab
			}

			if (crab > spot) {
				fuel += crab - spot
			}
		})
		return fuel
	}

	const mostInexpensiveSpot = fuelRequired.reduce((acc, curr, index) => {
		if (curr < acc.value) {
			return { index, value: curr }
		}
		return acc
	}, { index: null, value: Infinity })

	console.log(least, most, fuelRequired, mostInexpensiveSpot)
})