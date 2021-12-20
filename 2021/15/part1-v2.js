require('fs').readFile('./puzzle-input.txt', 'utf-8', (err, data) => {

	const strings = data.trim().split('\n')

	const width = strings[0].length
	const height = strings.length

	const grid = new Array(width).fill().map(x => {
		return new Array(height).fill().map(y => {
			return null
		})
	})

	strings.forEach((row, y) => {
		return row.split('').forEach((item, x) => {
			grid[x][y] = {
				cost: parseInt(item),
				best: null,
			}
		})
	})

	function format(str) {
		if (!str) return '.'
		return `|${str}|`
	}

	function printGrid() {
		let str = ''
		for (var y = 0; y < height; y++) {
			for (var x = 0; x < width; x++) {
				const best = grid[x][y].best
				const sum = best && best.sum
				str += format(sum)
			}
			str += '\n\n'
		}
		return str
	}

	grid[0][0] = {
		cost: 1,
		best: {
			path: [],
			sum: 1
		}
	}

	function apply(direction, _coordinate) {
		return {
			x: _coordinate.x + coordinate[direction].x,
			y: _coordinate.y + coordinate[direction].y
		}
	}

	const coordinate = {
		north: { x: 0, y: -1 },
		south: { x: 0, y: 1 },
		west: { x: -1, y: 0 },
		east: { x: 1, y: 0 },
	}

	function findNull() {
		for (let x = 0; x < width; x++) {
			for (let y = 0; y < height; y++) {
				const origin = grid[x][y]
				for (let i = 0; i < 3; i++) {
					const direction = ['north', 'east', 'south', 'west'][i]
					const test = apply(direction, { x, y })
					const target = grid[test.x] && grid[test.x][test.y]
					if (target && target.best) {				
						// compare my result with the current stored
						//console.log('there is a best, compare')
						if (origin.best.sum + target.cost < target.best.sum) {
							//console.log('i improved it')
								grid[test.x][test.y] = {
								cost: target.cost,
								best: {
									sum: origin.best.sum + target.cost,
									path: origin.best.path.concat({ x, y })
								}
							}
							return false
						} else {
							//console.log('what i found was better')
						}					
					} else if (target) {
						// there is a thing here but no best
						// console.log('a thing here but no best', test.x, test.y)
						grid[test.x][test.y] = {
							cost: target.cost,
							best: {
								sum: origin.best.sum + target.cost,
								path: origin.best.path.concat({ x, y })
							}
						}
						return false
					} else {
						// ignore
						// console.log('ignore', direction)
						// return
					}				
				}
			}
		}
		return true
	}

	let done = false
	while (!done) {
		done = findNull()
		// console.clear()
	}

	console.log(printGrid())	
	console.log(grid[width-1][height-1].best.path)
})