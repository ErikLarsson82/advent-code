require('fs').readFile('./puzzle-input.txt', 'utf-8', (err, data) => {
	
	/*
	const heightMap = data.trim().split('\n').map(row => {
		return row.split('').map(x => parseInt(x))
	})
	*/

	const heightMap = [
		'2199943210',
		'3987894921',
		'9856789892',
		'8767896789',
		'9899965678',
	].map(row => row.split('').map(height => parseInt(height))
	
	function neighbours(x, y) {
		return [
			heightMap[x-1] && heightMap[x-1][y],
			heightMap[x+1] && heightMap[x+1][y],
			heightMap[x] && heightMap[x][y-1],
			heightMap[x] && heightMap[x][y+1],
		]
	}

	function isLowPoint(x, y) {
		const neigh = neighbours(x, y)
		const height = heightMap[x][y]
		const output = neigh.filter(x => {
			return x !== undefined && x <= height
		}).length === 0

		return output
	}

	function traverseBasin(found, x, y) {
		const neigh = neighbours(x, y)
		neigh.filter(n => {
			return found.includes(n)
		})
	}

	let riskLevels = []
	heightMap.forEach((row, xIdx) => {
		row.forEach((num, yIdx) => {
			if (isLowPoint(xIdx, yIdx)) {
				riskLevels.push(parseInt(num) + 1)
			}
		})
	})
	console.log('Risk Levels', riskLevels)
	const sum = riskLevels.reduce((acc, curr) => acc + curr, 0)
	console.log('Sum', sum)
})