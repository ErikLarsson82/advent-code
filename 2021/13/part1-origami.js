
require('fs').readFile('./puzzle-input.txt', 'utf-8', (err, data) => {

	/*
	const dotInstructions = [
		{ x: 6, y: 10 },
		{ x: 0, y: 14 },
		{ x: 9, y: 10 },
		{ x: 0, y: 3 },
		{ x: 10, y: 4 },
		{ x: 4, y: 11 },
		{ x: 6, y: 0 },
		{ x: 6, y: 12 },
		{ x: 4, y: 1 },
		{ x: 0, y: 13 },
		{ x: 10, y: 12 },
		{ x: 3, y: 4 },
		{ x: 3, y: 0 },
		{ x: 8, y: 4 },
		{ x: 1, y: 10 },
		{ x: 2, y: 14 },
		{ x: 8, y: 10 },
		{ x: 9, y: 0 }
	]
	*/

	const [instructions, foldData] = data.split('\n\n').map(x => x.trim())

	const dotInstructions = instructions.split('\n').map(str => {
		const [x, y] = str.split(',')
		return { x: parseInt(x), y: parseInt(y) }
	})

	const folds = foldData.split('\n').map(str => {
		const [direction, index] = str.split('=')
		return { direction, index: parseInt(index) }
	})

	let width = Math.max(...dotInstructions.map(({ x }) => x)) + 1
	let height = Math.max(...dotInstructions.map(({ y }) => y)) + 1

	console.log(width, height)

	let paper = new Array(width).fill().map(() => new Array(height).fill('.'))

	dotInstructions.forEach(({ x, y }) => {
		paper[x][y] = '#'
	})

	function printGrid() {
		let str = ''
		for (var y = 0; y < height; y++) {
			for (var x = 0; x < width; x++) {
				str += paper[x][y]
			}
			str += '\n'
		}
		return str
	}

	function fold(direction, line) {
		if (direction === 'fold along y') {
			const { base, overlap } = pairs(line, height)
			for (let x = 0; x < width; x++) {
				for (let y = 0; y < line; y++) {
					paper[x][y] = (paper[x][base[y]] === '#' || paper[x][overlap[y]] === '#') ? '#' : '.'
				}
				paper[x] = paper[x].slice(0, line)
			}
			height = line
		}
		if (direction === 'fold along x') {
			const { base, overlap } = pairs(line, width)
			for (let x = 0; x < line; x++) {
				for (let y = 0; y < height; y++) {
					paper[x][y] = (paper[base[x]][y] === '#' || paper[overlap[x]][y] === '#') ? '#' : '.'
				}
			}
			paper = paper.slice(0, line)
			width = line
		}
		/*
		x 0 y 8 -> x 0 y 6
		x 1 y 8 -> x 1 y 6 etc...

		x 0 y 9 -> x 0 y 5
		x 1 y 9 -> x 1 y 5 etc...
		*/
	}

	function pairs(index, length) {
		const base = new Array(index).fill().map((_, idx) => idx)
		const overlap = new Array(length-index-1).fill().map((_, idx) => idx + index + 1).reverse()
		return { base, overlap }
	}

	function count() {
		let c = 0
		for (let x = 0; x < width; x++) {
			for (let y = 0; y < height; y++) {
				if (paper[x][y] === '#') {
					c++
				}
			}
		}
		return c
	}

	// 7 15 -> 0, 1, 2, 3, 4 ,5 ,6
	//         8, 9,10,11,12,13,14
	// console.log(pairs(7, 15))

	// 3 10 -> 0, 1, 2
	//         4, 5, 6, 7, 8, 9
	// console.log(pairs(3, 10))

	// console.log(printGrid())
	// console.log(count())

	folds.forEach(({ direction, index }) => fold(direction, index))
	
	console.log(printGrid())
	console.log('count', count())

	/*
	console.log(printGrid())
	console.log(count())

	fold('fold along y', 7)

	console.log(printGrid())
	console.log(count())

	fold('fold along x', 5)

	console.log(printGrid())
	console.log(count())
	*/
})