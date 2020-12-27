const fs = require('fs')
const { data } = require('../common')
const { pipe } = require('ramda')

fs.readFile('./puzzle-input.txt', 'utf-8', pipe(data, parseWires, crossWires))

// takes a string input and turs into an array of arrays with instructions
// "R8,U5,L5,D3\nU7,R6,D4,L4" -> [['R8','U5','L5','D3'],['U7','R6','D4','L4']]
function parseWires(data) {
	return data.trim()
      .split('\n')
      .map(x => x.trim())
      .map(wireString => wireString.split(','))
}

const circuitBoard = []

const directions = {
	R: { x: 1, y: 0 },
	L: { x: -1, y: 0 },
	U: { x: 0, y: -1 },
	D: { x: 0, y: 1 }
}

function crossWires(wires) {

	let target

	wires.forEach((wire, wireIdx) => {
		console.log('Running wire', wireIdx)
		target = reset()
		let wireLength = 1

		wire.forEach((instruction, instructionIdx, instructionArray) => {
			console.log('Running instruction', instruction, instructionIdx + " / " + instructionArray.length)
			const direction = instruction[0]
			const steps = parseInt(instruction.substring(1))

			for (var i = 0; i < steps; i++) {
				const { x, y } = directions[direction] 
				target.x += x
				target.y += y
				
				increment({ ...target, ["w" + wireIdx]: wireLength })

				wireLength++
			}
		})
	})

	console.log(circuitBoard)

	let str = ""
	for (var yP = -20; yP < 20; yP++) {
		for (var xP = -20; xP < 20; xP++) {
			if (xP === 0 && yP === 0) {
				str += "O"
			} else {
				const pos = circuitBoard.find(({x, y}) => x === xP && y === yP)
				if (pos === undefined) {
					str += "."
				} else {
					str += pos.nr
				}
			}
		}
		str += "\n"
	}
	console.log(str)

	fs.writeFile('./wire-schematic.json', JSON.stringify(circuitBoard), (err, res) => {
		console.log('wire-schematic.json saving status:', err, res)
	})

	const closest = circuitBoard.filter(isIntersection).map(manhattan).reduce(smallest, Infinity)
	console.log('\n\n2020 / 3 / Part 1\nClosest manhattan distance:', closest)
}

function reset() {
	return { x: 0, y: 0 }
}


function increment(target) {
	const xT = target.x
	const yT = target.y
	const w0 = target.w0
	const w1 = target.w1
	const pos = circuitBoard.find(({x, y}) => x === xT && y === yT)

	if (pos === undefined) {
		circuitBoard.push({ x: xT, y: yT, nr: 1, w0, w1 })
	} else {
		pos.nr++

		if (!pos.w0)
			pos.w0 = w0

		if (!pos.w1)
			pos.w1 = w1
	}
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