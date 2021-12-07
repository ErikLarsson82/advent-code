require('fs').readFile('./puzzle-input.txt', 'utf-8', (err, data) => {

	// const crabs = [16,1,2,0,4,2,7,1,2,14]

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
				fuel += expoFuel(spot - crab)
			}

			if (crab > spot) {
				fuel += expoFuel(crab - spot)
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

function expoFuel(fuel) {
	if (fuel === 0) return 0
	if (fuel === 1) return 1
	return fuel + expoFuel(fuel - 1)
}

console.log('expoFuel(0) === 0', expoFuel(0))
console.log('expoFuel(1) === 1', expoFuel(1))
console.log('expoFuel(2) === 3', expoFuel(2))
console.log('expoFuel(3) === 6', expoFuel(3))
console.log('expoFuel(4) === 10', expoFuel(4))