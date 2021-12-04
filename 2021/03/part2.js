
require('fs').readFile('./puzzle-input.txt', 'utf-8', (err, data) => {
	
	const readouts = data.trim().split('\n')

	const gammaRateStr = rate(pickHighest, readouts)
	const gammaRateDecimal = parseInt(gammaRateStr, 2)
	const epsilonRateStr = rate(pickLowest, readouts)
	const epsilonRateDecimal = parseInt(epsilonRateStr, 2)

	console.log('gamma', gammaRateStr, gammaRateDecimal)
	console.log('epsilon', epsilonRateStr, epsilonRateDecimal)

	const powerConsumption = gammaRateDecimal * epsilonRateDecimal
	console.log('power', powerConsumption)

	const oxygenGeneratorRatingArray = reduce(readouts, pickHighest)
	const oxygenGeneratorRateDecimal = parseInt(oxygenGeneratorRatingArray[0], 2)
	console.log('oxygen generator rating', oxygenGeneratorRateDecimal)

	const co2ScrubberRatingArray = reduce(readouts, pickLowest)
	const co2RateDecimal = parseInt(co2ScrubberRatingArray[0], 2)
	console.log('co2 scrubber rating', co2RateDecimal)

	const lifeSupportRating = oxygenGeneratorRateDecimal * co2RateDecimal
	console.log('life support rating', lifeSupportRating)
})

function reduce(_data, f) {
	let data = _data
	let index = 0
	while (data.length > 1) {
		const bitCriteria = f(count(index, data))
		data = data.filter(str => str[index] === bitCriteria)
		index++		
	}
	return data
}

function count(index, data) {
	let ones = 0
	let zeroes = 0

	data.map(binaryStr => binaryStr.split(''))
		.map(arr => arr[index])
		.forEach(digitChar => {
			if (digitChar === '1') {
				ones++
			} else {
				zeroes++
			}
		})
	return { ones, zeroes }
}

function pickHighest({ ones, zeroes }) {
	if (ones >= zeroes) {
		return '1'
	} else {
		return '0'
	}
}

function pickLowest({ ones, zeroes }) {
	if (ones < zeroes) {
		return '1'
	} else {
		return '0'
	}
}

function rate(f, data) {
	return new Array(12)
	.fill()
	.map((_, index) => count(index, data))
	.map(f)
	.join('')
}
