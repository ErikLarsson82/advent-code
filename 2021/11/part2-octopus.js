
const puzzleInput = [
	'5433566276',
	'6376253438',
	'8458636316',
	'6253254525',
	'7211137138',
	'1411526532',
	'5788761424',
	'8677841514',
	'1622331631',
	'5876712227'
]

/*
const example = [
	'5483143223',
	'2745854711',
	'5264556173',
	'6141336146',
	'6357385478',
	'4167524645',
	'2176841721',
	'6882881134',
	'4846848554',
	'5283751526',
]
*/

/*
const example2 = [
	'11111',
	'19991',
	'19191',
	'19991',
	'11111'
]
*/

const width = 10
const height = 10
let grid = new Array(width).fill().map(() => new Array(height).fill(null))

function forEachInGrid(_grid, f) {
	_grid.forEach((something, xIdx) => {
		something.forEach((item, yIdx) => {
			f(item, { x: xIdx, y: yIdx })
		})
	})
}

function mapGrid(f) {
	return grid.map(something => {
		return something.map(item => {
			return f(item)
		})
	})
}

function neighbours(x, y) {
	return [
		{ x: x-1, y: y-1 },
		{ x,      y: y-1 },
		{ x: x+1, y: y-1 },
		{ x: x-1, y },
		// { x, y },
		{ x: x+1, y },
		{ x: x-1, y: y+1 },
		{ x,      y: y+1 },
		{ x: x+1, y: y+1 }
	]
}

function getValue({ x, y }) {
	return grid[x] && grid[x][y]
}

function countFlashers() {
	let flashes = 0
	forEachInGrid(grid, num => {
		if (num === 'FLASH') {
			flashes++
		}
	})
	return flashes
}

function findFlasher(grid) {
	let flasher = -1
	forEachInGrid(grid, (num, location) => {
		if (num === 'FLASH') {
			flasher = location
		}
	})
	return flasher
}

puzzleInput.forEach((row, yIdx) => {
	row.split('').forEach((char, xIdx) => {
		grid[xIdx][yIdx] = char
	})
})


grid = mapGrid(x => x !== null && parseInt(x) || null)

/*
console.log(grid[0][0] === 5)
console.log(grid[1][0] === 4)
console.log(grid[0][1] === 2)
console.log(grid[9][9] === 6)
printNeighbours(neighbours(0, 0).map(getValue))
printNeighbours(neighbours(9, 9).map(getValue))
printNeighbours(neighbours(8, 8).map(getValue))
*/

function printNeighbours(arr) {
	let str = ''
	const [topLeft, topMiddle, topRight, centerLeft, centerRight, bottomLeft, bottomMiddle, bottomRight] = arr.map(x => x === undefined ? '-' : x.toString())
	str = topLeft + topMiddle + topRight + '\n' + centerLeft + ' ' + centerRight + '\n' + bottomLeft + bottomMiddle + bottomRight
	console.log(str + '\n')
}

function detectFlash() {
	let sum = 0
	forEachInGrid(grid, x => {
		if (x === 0) {
			sum++
		}
	})
	return sum === 100
}

function printGrid() {
	let str = ''
	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[i].length; j++) {
			if (grid[j][i] === 'FLASH') {
				str += '*'
			} else if (grid[j][i] === 'SPENT') {
				str += '.'
			} else {
				str += grid[j][i]
			}
		}
		if (i < grid.length-1) str += '\n'
	}
	return str
}

function simulate() {
	let flashes = 0
	let stopper = 0
	grid = mapGrid(num => {
		if (typeof num === 'number') {
			return num + 1
		} else {
			return num
		}
	})
	grid = mapGrid(num => num > 9 ? 'FLASH' : num)
	
	let flasher = findFlasher(grid)
	while (flasher !== -1 && stopper < 1000) {
		flashes++
		stopper++
		neighbours(flasher.x, flasher.y).forEach(item => {
			if (grid[item.x] && grid[item.x][item.y] && typeof grid[item.x][item.y] === 'number') {
				grid[item.x][item.y] += 1
			}
		})
		grid = mapGrid(num => num > 9 ? 'FLASH' : num)
		grid[flasher.x][flasher.y] = 'SPENT'
		flasher = findFlasher(grid)
	}
	grid = mapGrid(num => {
		if (num === 'SPENT') {
			return 0
		} else {
			return num
		}
	})

	return flashes
}

console.log('Initial state')
console.log(printGrid())
console.log('')

let sumFlashes = 0

for (let k = 0; k <= 500-1; k++) {
	
	sumFlashes += simulate()	
	
	if (detectFlash()) {
		console.log('Flash detected at iteration', k+1)
	}
	
	/*
	if (k + 1 === 195) {
		console.log(`Grid after iteration ${k+1} - sum flashes so far ${sumFlashes}`)
		console.log(printGrid())
		console.log('')
	}
	*/
}
