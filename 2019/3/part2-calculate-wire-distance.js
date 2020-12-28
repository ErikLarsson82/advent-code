const fs = require('fs')

fs.readFile('./wire-schematic.json', 'utf-8', calculateWireLengths)

function calculateWireLengths(err, res) {
	if (err) {
		console.log('error reading file wire-schematic.json', err)
		return
	}

	const circuitBoard = JSON.parse(res)

	console.log( circuitBoard.filter(isIntersection).filter(hasBoth).map(combine).reduce(smallest, Infinity) )
}


function isIntersection(x) {
	return x && x.nr > 1
}

function manhattan({ x, y }) {
	return Math.abs(x) + Math.abs(y)
}

function smallest(acc, curr) {
	return curr < acc ? curr : acc
}

function hasBoth({ w0, w1 }) {
	return w0 && w1
}

function combine({ w0, w1}) {
	return w0 + w1
}