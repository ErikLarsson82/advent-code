
const alphabetimal = 'abcdefghijklmnopqrstuvxyz'.split('').concat('abcdefghijklmnopqrstuvxyz'.toUpperCase().split(''))

require('fs').readFile('./puzzle-input.txt', 'utf-8', (err, data) => {
	
	const heightMap = data.trim().split('\n').map(row => {
		return row.split('').map(x => parseInt(x))
	})
	
	/*
	const heightMap = [
		'2199943210',
		'3987894921',
		'9856789892',
		'8767896789',
		'9899965678',
	].map(row => row.split('').map(
		height => parseInt(height)
	))
	*/
	
	function neighbours(y, x) {
		return [
			heightMap[y-1] && heightMap[y-1][x],
			heightMap[y+1] && heightMap[y+1][x],
			heightMap[y][x-1],
			heightMap[y][x+1],
		]
	}

	function isLowPoint(y, x) {
		const neigh = neighbours(y, x)
		const height = heightMap[y][x]
		const output = neigh.filter(x => {
			return x !== undefined && x <= height
		}).length === 0

		return output
	}

	const notNull = x => x !== null

	function traverseBasin(found, height, y, x) {
		if (found.find(obj => obj.x === x && obj.y === y)) {
			return found
		}
		const compare = heightMap[y] && heightMap[y][x]
		if (compare >= height && compare !== 9) {
			found = found.concat({ x, y })
			height = compare
			found = traverseBasin(found, height + 1, y-1, x)
			found = traverseBasin(found, height + 1, y+1, x)
			found = traverseBasin(found, height + 1, y, x-1)			
			found = traverseBasin(found, height + 1, y, x+1)			
		}
		return found
	}

	let riskLevels = []
	let basins = []
	heightMap.forEach((row, yIdx) => {
		row.forEach((num, xIdx) => {
			if (isLowPoint(yIdx, xIdx)) {
				riskLevels.push(parseInt(num) + 1)
				const basin = traverseBasin([], parseInt(num), yIdx, xIdx)
				console.log('adding basin', yIdx, xIdx, basin)
				basins.push(basin)				
			}
		})
	})

	let str = ''
	for (var y = 0; y < heightMap.length; y++) {
		for (var x = 0; x < heightMap[0].length; x++) {
			if (heightMap[y][x] === 9) {
				str += '9'
			} else if (isLowPoint(y, x)) {
				const basin = basins.find(b => b.find(p => p.x === x && p.y === y))
				if (basin && basin.length < alphabetimal.length) {
					str += alphabetimal[basin.length]
				} else {
					str += '+'					
				}
			} else {
				str += heightMap[y][x]
			}
		}
		str += '\n'
	}
	console.log(str)

	console.log('Risk Levels', riskLevels)
	const sum = riskLevels.reduce((acc, curr) => acc + curr, 0)
	console.log('Sum', sum)
	console.log('Basins', basins.map(x=>x.length))
	console.log('Multiply largest', 
		basins.map(x=>x.length).sort((a, b) => a < b ? 1 : -1).slice(0, 3).reduce((acc, curr) => acc * curr)
	)
})