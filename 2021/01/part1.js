
require('fs').readFile('./puzzle-input.txt', 'utf-8', (err, data) => {
	const puzzleInput = prepare(data)
	const depthIncreases = puzzleInput.map(isIncrease).filter(x => x).length
	console.log('depth increases for puzzle input', depthIncreases)
})

function prepare(rawString) {
	return rawString.trim().split('\n').map(x => parseInt(x))
}

let prev = null

/* Non pure function that keeps track of the previous value */
function isIncrease(value) {
	if (prev === null) {
		prev = value
		return null	
	}

	const increase = value > prev

	prev = value

	return increase
}

/*
if (isIncrease(5) !== null) console.log('Error')
if (isIncrease(10) !== true) console.log('Error')
if (isIncrease(6) !== false) console.log('Error')
if (isIncrease(11) !== true) console.log('Error')
if (isIncrease(12) !== true) console.log('Error')
*/
