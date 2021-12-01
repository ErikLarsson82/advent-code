
require('fs').readFile('./puzzle-input.txt', 'utf-8', (err, data) => {
	const puzzleInput = prepare(data)
	const depthIncreases = puzzleInput.map(isIncrease).filter(x => x).length
	console.log('depth window increases for puzzle input (part2): ', depthIncreases)
})

function prepare(rawString) {
	return rawString.trim().split('\n').map(x => parseInt(x))
}

let prev = null

/* Non pure function that keeps track of the previous value */
function isIncrease(_value, index, array) {
	if (array[index + 1] === undefined || array[index + 2] === undefined) return null

	const value = _value + array[index + 1] + array[index + 2]

	if (prev === null) {
		prev = value
		return null	
	}

	const increase = value > prev

	prev = value

	return increase
}
